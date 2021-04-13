
======
Workfinder Test
======

## Running App

Setup dev instance manually, running the following commands:

Set up backend:

1. `pip install -r requirements.txt ` - run this command to install all backend project dependencies
2. `python manage.py makemigrations` - run migrations
3. `python manage.py migrate` - run migrations
4. `python manage.py runserver` - run server

Set up frontend:

1. `cd frontend/app/` - change directory to /app directory
2. `npm i` - run npm install to install all frontend project dependencies
3. `npm start` - run frontend development client

## Running App via Docker

or just run one command

1. `docker-compose up --build -d` - starts dev server
2. `http://localhost` - go to url provided ( MAKE SURE TO VISIT `frontend/app/src/settings/index.js` for make necessary adjustment to run without the port provision from browser)
