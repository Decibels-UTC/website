# How to run the react app
- npm install install dependancies before building the app
# How to run de django backend 
- pipenv shell
- pip install -r requirements.txt
  - add --break-system-packages if the command above doesn't work
- cd backend
- python3 manage.py makemigrations
- python3 manage.py migrate
- python3 manage.py runserver

- don't forget to fill the .env with valid variables
