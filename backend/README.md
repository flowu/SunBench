generate reqs file:
pip freeze > requirements.txt

install venv:
python3 -m venv venv
Start venv:
source venv/bin/activate
Set Python interpreter:
alias python3='venv/bin/python3'
Stop venv:
deactivate
Delete venv:
rm -rf venv

Run the backend app:
python3 src/main.py