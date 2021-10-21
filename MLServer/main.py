#Librerías
from flask import Flask, render_template,request

from Controllers.controller import Controller
from DAO.LocalAccess import LocalAccess

app=Flask(__name__)

controller=Controller(DA=LocalAccess('example'))
controller.loadModel()

@app.route("/")
def index():
    return render_template("main.html")

@app.route("/model",methods=["POST"])
def sendPrediction():
    try:
        return controller.makePrediction(request.get_json())
    except Exception as e:
        return {"Error":str(e)}

@app.route("/update",methods=["POST"])
def postReview():
    try:
        return controller.updateData(data=request.get_json())
    except Exception as e:
        return {"error":str(e)}

if __name__=="__main__":
    app.debug=True
    app.run(port=3200,host="0.0.0.0")