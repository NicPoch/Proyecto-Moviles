class ModelTemp(object):
    def __init__(self):
        super().__init__()
        print("Model temp created")
    def load(self):
        print("Model loading")
    def predict(self):
        return (0.5,0.5)