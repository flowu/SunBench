from database import connect_to_db, insert_data
from flask import Flask, jsonify, request
from flask_caching import Cache
import logging
import requests
from flask_cors import CORS
import os


# Basic logging setup that logs to a file
logging.basicConfig(filename='app.log', filemode='a', level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')

app = Flask(__name__)
CORS(app)
# Configure the cache to use simple in-memory caching
cache = Cache(app, config={'CACHE_TYPE': 'simple'})

def get_current_weather(api_key: str, lat: float, lon: float) -> dict:
    """Fetch weather data from OpenWeatherMap."""
    url = f'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={api_key}&units=metric'
    #url1 = f'https://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric'
    response = requests.get(url)
    response.raise_for_status()
    return response.json()

def get_forecast(api_key: str, lat: float, lon: float) -> dict:
    url = f'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={api_key}&units=metric'
    response = requests.get(url)
    response.raise_for_status()
    return response.json()

def convert_forecast_data(raw_data):
    # Simplify the data structure for the frontend
    simplified_data = []
    for item in raw_data['list']:
        forecast = {
            'time': item['dt_txt'],
            'temperature': item['main']['temp'],
            'description': item['weather'][0]['main'],
            'icon': item['weather'][0]['icon']
        }
        simplified_data.append(forecast)
    return simplified_data

@app.route('/save-vacation-date', methods=['POST'])
def save_vacation_date():
    try:
        data = request.json
        user = data['user']
        date = data['date']  # Ensure this date is in 'YYYY-MM-DD' format for PostgreSQL

        conn = connect_to_db()
        print("hej")
        if conn:
            insert_data(conn, (user, date))
            conn.close()
            return jsonify({'message': 'Vacation date saved successfully'}), 200
    except Exception as e:
        app.logger.error(f"Failed to save vacation date: {e}")
        return jsonify({'error': str(e)}), 500


@app.route('/forecast')
@cache.cached(timeout=10)  # cache this endpoint for 10 seconds
def forecast_route():
    API_KEY = os.getenv('WEATHER_API_KEY')  # Replace with your actual OpenWeatherMap API key
    CITY = 'Gothenburg'
    LAT = 57.70836111
    LON = 11.96736111

    if LAT is None or LON is None:
        return jsonify({'error': 'Missing latitude or longitude parameter'}), 400

    try:
        raw_forecast_data = get_forecast(API_KEY, LAT, LON)
        forecast_data = convert_forecast_data(raw_forecast_data)
        return jsonify(forecast_data)
    except requests.HTTPError as e:
        return jsonify({'error': 'Failed to fetch forecast data', 'message': str(e)}), e.response.status_code

@app.route('/weather')
@cache.cached(timeout=10)  # cache this endpoint for 10 seconds
def weather_route():
    API_KEY = os.getenv('WEATHER_API_KEY')  # Replace with your actual OpenWeatherMap API key
    API_KEY = "bfe4042f3a2c7ad7bc8efcb9fc07793a"
    CITY = 'Gothenburg'  # Change this to any city you like
    LAT = 57.70836111
    LON = 11.96736111

    try:
        # Extract temperature, weather description, etc.
        (weather_data) = get_current_weather(API_KEY, LAT, LON)
        logging.debug(f"Weather data: {weather_data}")
        temperature_precise = weather_data['main']['temp']
        temperature = format(temperature_precise, '.0f')
        description = weather_data['weather'][0]['main']

        weather_response = {
            'city': 'HiQ Gothenburg (outdoor)',
            'temperature': f"{temperature} °C",
            'description': description
        }

        # Properly format the log message as a string
        logging.debug(f"Weather response: {weather_response}")

        return jsonify(weather_response)
    except requests.HTTPError as e:
        logging.error(f"Failed to fetch weather data: {e}")
        return jsonify({'error': 'Failed to fetch weather data', 'message': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
