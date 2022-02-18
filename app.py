from flask import Flask, request,jsonify,make_response
from flask_restx import Api, Resource, fields
#from werkzeug.middleware.proxy_fix import ProxyFix
from flask_cors import CORS
from tensorflow import keras
#import json
#import tensorflow as tf
#from werkzeug.utils import cached_property
#import time
import numpy as np
#from flask_restplus import Api, Resource, fields
flask_app=Flask(__name__,static_folder='heart_frontend/build',static_url_path='')
CORS(flask_app)
#flask_app.wsgi_app=ProxyFix(flask_app.wsgi_app)
app=Api(app=flask_app,
        version="1.0",
        title="Heart Disease Prediction")

name_space=app.namespace('prediction',description="Prediction Api")
model=app.model('Parameters',
                        {'thal':fields.Integer(required=True),
                        'slope':fields.Integer(required=True),
                        'cp':fields.Integer(required=True),
                        'oldpeak':fields.Float(required=True),
                        'exang':fields.Integer(required=True),
                        'ca':fields.Integer(required=True),
                        'thalach':fields.Integer(required=True),
                        'chol':fields.Integer(required=True),

                        })
predictor=keras.models.load_model('heart_model')
@name_space.route("/")
class MainClass(Resource):

    def options(self):
        response=make_response()
        response.headers.add("Access-Control-Allow-Origin","*")
        response.headers.add("Access-Control-Allow-Headers","*")
        response.headers.add('Access-Control-Allow-Methods',"*")

        return response

    @app.expect(model)
    def post(self):
        try:
            inputValues=request.json
            cols_to_use=['cp', 'chol', 'thalach', 'exang', 'oldpeak', 'slope', 'ca', 'thal',
       'feature1']
            
            data=[inputValues[x] for x in cols_to_use]
            print(data)
            prediction=predictor.predict(np.array([data]))
            
            types={0:'No',1:'Yes'}
            response=jsonify({
                "statusCode":200,
                "status":"Prediction made",
                "result":types[round(prediction[0][0])]
            })
            response.headers.add('Access-Control-Allow-Origin','*')
            return response

        except Exception as error:
            return jsonify({
                "statusCode":500,
                "status":"Prediction Could not be made",
                "error":str(error)
            })



if __name__=="__main__":
    app.run(host='0.0.0.0')