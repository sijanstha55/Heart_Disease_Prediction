from flask import Flask, request,jsonify,make_response, send_from_directory
from flask_restx import Api, Resource, fields
import pandas as pd
from flask_cors import CORS,cross_origin
#from tensorflow import keras
import pickle
#import numpy as np

app=Flask(__name__,static_folder='heart_frontend/build',static_url_path='')
CORS(app)
#flask_app.wsgi_app=ProxyFix(flask_app.wsgi_app)
api=Api(app=app,
        version="1.0",
        title="Heart Disease Prediction")

name_space=api.namespace('prediction',description="Prediction Api")
model=api.model('Parameters',
                        {'thal':fields.Integer(required=True),
                        'slope':fields.Integer(required=True),
                        'cp':fields.Integer(required=True),
                        'oldpeak':fields.Float(required=True),
                        'exang':fields.Integer(required=True),
                        'ca':fields.Integer(required=True),
                        'thalach':fields.Integer(required=True),
                        'chol':fields.Integer(required=True),

                        })
file_name = "./xgb_model_heart.pkl"
predictor=pickle.load(open(file_name,'rb'))
#predictor=keras.models.load_model('heart_model')
@name_space.route("/")
class MainClass(Resource):
   
    def options(self):
        response=make_response()
        response.headers.add("Access-Control-Allow-Origin","*")
        response.headers.add("Access-Control-Allow-Headers","*")
        response.headers.add('Access-Control-Allow-Methods',"*")

        return response
    

    @api.expect(model)
    def post(self):
        try:
            inputValues=request.json
            cols_to_use=['age','sex','cp','trestbps', 'chol','fbs','restecg', 'thalach', 'exang', 'oldpeak', 'slope', 'ca', 'thal']
            
            data=[inputValues[x] for x in cols_to_use]
            data=pd.DataFrame([data],columns=cols_to_use)
            prediction=predictor.predict(data)
            
            types={0:'No',1:'Yes'}
            response=jsonify({
                "statusCode":200,
                "status":"Prediction made",
                "result":prediction[0]
            })
            response.headers.add('Access-Control-Allow-Origin','*')
            return response

        except Exception as error:
            return jsonify({
                "statusCode":500,
                "status":"Prediction Could not be made",
                "error":str(error)
            })
@app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')

if __name__=="__main__":
    app.run()