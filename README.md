# Welcome to CSV File Upload

Hi! I'm working on chunking large CSV file uploads and implementing drag and drop functionality. I am using data sample from UK hotel building energy consumption.  


## TechStack 🛠
- ReactJs
- Material UI
- Django
- PostgreSQL
- Celery
- Docker
- Nginx


## Running App

Setup project manually by running the following commands:

Set up backend:

 1. Install all backend project dependencies
	 >`pip install -r requirements.txt ` 
 
2.  Run migrations
	 >`python manage.py makemigrations`
	 >` python manage.py migrate`
	 
3.  Start server
	>`python manage.py runserver` - 

Set up frontend:
1. Change directory to /app directory
	> `cd frontend/app/` 
	
2. Run npm install to install all frontend project dependencies
	> `npm i` 
	
3. run frontend development client
	>`npm start` 


NB: **or you could just run one command with docker  😎**

## Running App via Docker

> Side note, I am still working on a bug from the docker deployment side -- uploading large files is still an issue i am trying to fix.


 1. Builds and starts dev server container detached
	> `docker-compose up --build -d`

2. Go to url
	>`http://localhost`  


	> make sure to visit **frontend/app/src/settings/index.js** to make the necessary adjustment to run without the port provision from browser


