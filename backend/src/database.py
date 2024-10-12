import psycopg2

def connect_to_db():
    try:
        conn = psycopg2.connect(
            dbname="vacation_database",
            user="admin",
            password="admin",
            host="localhost",
            port="5432"
        )
        print("Connected to the database")
        return conn
    except psycopg2.Error as e:
        print("Error connecting to the database:", e)
        return None
    
# Function to create a new table
def create_table(conn):
    with conn.cursor() as cursor:
        try:
            create_table_query = '''
                CREATE TABLE IF NOT EXISTS user_settings (
                    id SERIAL PRIMARY KEY,
                    user VARCHAR(100),
                    date DATE
                )
            '''
            cursor.execute(create_table_query)
            conn.commit()
            print("Table created successfully")
        except psycopg2.Error as e:
            conn.rollback()
            print("Error creating table:", e)

# Function to insert data into the table
def insert_data(conn, data):
    try:
        cursor = conn.cursor()
        # Define the SQL statement to insert data into the table
        insert_query = '''
            INSERT INTO user_settings (user, date)
            VALUES (%s, %s)
        '''
        # Execute the SQL statement
        cursor.execute(insert_query, (data[0], data[1]))
        # Commit the transaction
        conn.commit()
        print("Data inserted successfully")
    except psycopg2.Error as e:
        conn.rollback()
        print("Error inserting data:", e)
    finally:
        cursor.close()

# Connect to the database
conn = connect_to_db()
if conn is not None:
    # Create a new table
    create_table(conn)
    # Close the database connection
    conn.close()
