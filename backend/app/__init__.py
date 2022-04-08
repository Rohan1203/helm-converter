from flask import Flask
from .api.routes import api
from flask_cors import CORS
import pyfiglet
import os

app = Flask(__name__)
CORS(app)
app.register_blueprint(api)

# result = pyfiglet.figlet_format("Helm Chart Converter")
# print(result)

if __name__ == "__main__":    
    app.run(host="0.0.0.0", port=5000)

'''
to start:
pip install virtualenv
python -m virtualenv
virtualenv <name>

1. activate virtual-environment:
    - . venv/bin/activate
2. export the app:
    -  export FLASK_APP="app"
3. run the app:
    - by gunicorn: 
        - gunicorn -w 4 --reload -b localhost:5000 "app:app"
    - by flask: 
        - flask run
'''