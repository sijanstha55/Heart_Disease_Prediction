# Heart_Disease_Prediction

This system contains two parts: Frontend (React) and Backend (Flask-Python). Both of these are deployed separately in Heroku but it is possible to do it together. 

Flask is used as backend and in the project folder you can run the following command to do run it:

heroku login
heroku git:remote -a <YOUR PROJECT NAME>
git add .
git commit -m 'Backend App'
git push heroku master
