# Heart_Disease_Prediction

This system contains two parts: Frontend (React) and Backend (Flask-Python). Both of these are deployed separately in Heroku but it is possible to do it together. 

# Backend Flask-Python
Flask is used as backend and in the project folder you can run the following command to do run it:

heroku login <br />
heroku git:remote -a <YOUR BACKEND PROJECT NAME> <br />
git add . <br />
git commit -m 'Backend App' <br />
git push heroku master <br />
 
# Frontend React
The deployment is similar in case of frontend part too except you need a different project name. Inside the folder 'heart_frontend' run the following commands.

heroku login <br />
heroku git:remote -a <YOUR FRONTEND PROJECT NAME> <br />
git add . <br />
git commit -m 'Frontend App' <br />
git push heroku master <br />
