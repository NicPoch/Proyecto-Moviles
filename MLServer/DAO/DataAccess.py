from abc import ABC, abstractmethod
class DataAccess(ABC):
    """Gets the model data from the corresponding database"""
    @abstractmethod
    def getModel(self):
        pass
    """Post the data used for a prediction this will further help on the ML engineering cycle"""
    @abstractmethod
    def postData(self,data:dict)->dict:
        pass
    """Post the review from a doctor regarding true difficulty or risk"""
    @abstractmethod
    def updateReview(self,data:dict)->dict:
        pass        