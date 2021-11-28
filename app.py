from flask import Flask, send_from_directory
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS  # comment this on deployment
from api.Malaria import Malaria
from api.Glaucoma import Glaucoma
from api.Pneumonia import Pneumonia
from api.Skin import Skin

app = Flask(__name__, static_url_path='', static_folder='datta-able-react-lite-v1.0\public')
app.config['UPLOAD_FOLDER'] = ''
app.secret_key = 'super secret key'
app.config['SESSION_TYPE'] = 'filesystem'

#sess.init_app(app)

app.debug = True
app.run()

CORS(app)  # comment this on deployment
api = Api(app)


@app.route("/", defaults={'path': ''})
def serve(path):
    return send_from_directory(app.static_folder, 'index.html')




api.add_resource(Malaria, '/api/malaria')
api.add_resource(Glaucoma, '/api/glaucoma')
api.add_resource(Pneumonia, '/api/pneumonia')
api.add_resource(Skin, '/api/skin')