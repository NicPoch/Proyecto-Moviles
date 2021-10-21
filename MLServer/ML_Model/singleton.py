from ML_Model.model import ModelTemp

class SingletonModel:
    _instance=None
    model=ModelTemp()
    def __new__(cls):
        if cls._instance is None:
            print("SINGLETON MODEL CREATING")
            cls._instance=super(SingletonModel,cls).__new__(cls)
    @classmethod
    def loadModel(self,pickle):
        if self._instance is not None:
            try:
                self._instance.model.load()
            except:
                raise Exception("error loading model")
        else:
            raise Exception("There is no instance")
    @classmethod
    def makeInference(self,input):
        if self._instance is not None:
            try:
                output = self._instance.model.predict()   
                out = {'risk': output[0],'difficulty':output[1]}
                return out
            except:
                raise Exception("Error inference")