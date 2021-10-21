from DAO.DataAccess import DataAccess

MODEL={'example':'example_model_access'}
DATA=[]

class LocalAccess(DataAccess):

    model_name=None
    def __init__(self,model_name):
        print("Local Access DA")
        self.model_name=model_name
    def getModel(self):
        return MODEL[self.model_name]
    def postData(self, data: dict) -> dict:
        DATA.append(data)
        print(f'Added: {data}')
        return data
    def updateReview(self, data: dict) -> dict:
        for i in range(len(DATA)):
            if(DATA[i]['data_id']==data['data_id']):
                DATA[i]['review']=data['review']
                print(f'update: {DATA[i]}')
                return DATA[i]
        return {}