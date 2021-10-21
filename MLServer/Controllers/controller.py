from DAO.DataAccess import DataAccess
from ML_Model.singleton import SingletonModel

class Controller():
    model=SingletonModel()
    """Initializes the controller and assigns the DA"""
    def __init__(self,DA:DataAccess):
        self.dataAccess=DA
    """Loads the model"""
    def loadModel(self):
        try:
            model_data=self.dataAccess.getModel()
            SingletonModel.loadModel(model_data)
        except Exception as e:
            raise e
    """Updates a review """
    def updateData(self,data):
        if("data_id" not in data.keys()):
            raise Exception("doesn´t have a data_id")
        if("review" not in data.keys()):
            raise Exception("doesn´t have a review")
        try:
            return self.dataAccess.updateReview(data)
        except Exception as e:
            raise e
    """Makes a prediction using the Pytorch Model"""
    def makePrediction(self,data):
        if("data_id" not in data.keys()):
            raise Exception("doesn´t have a data_id")
        prediction=SingletonModel.makeInference(data)
        data["prediction"]=prediction
        return self.dataAccess.postData(data)


