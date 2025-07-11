# Note - naming the file as __init__.py is necessary as python looks for this file in a "folder" and knows that it is a package and
# can import things from there

# importing required libraries and classes
from flask import Flask
# database ORM
from flask_sqlalchemy import SQLAlchemy
# for handling data migration and model changes
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
# used for serializing/deserializing data
from flask_marshmallow import Marshmallow
from dotenv import load_dotenv
import os
from flask_cors import CORS

# importing enviroment variables from env file
load_dotenv()

# initializing extensions- creating extension instances
db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()
bcrypt = Bcrypt()
ma = Marshmallow()

# app factory function
def create_app():
    app = Flask(__name__)

    app.config['SECRET_KEY'] = os.getenv("SECRET_KEY")
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DATABASE_URL")
    # turns off feature to track changes in the models 
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['JWT_SECRET_KEY'] = os.getenv("JWT_SECRET_KEY")
    
    app.config['JWT_TOKEN_LOCATION'] = ['cookies']
    app.config['JWT_ACCESS_COOKIE_PATH'] = '/'
    app.config['JWT_ACCESS_COOKIE_NAME'] = 'access_token'
    app.config['JWT_COOKIE_SECURE'] = False  # True in production
    app.config['JWT_COOKIE_HTTPONLY'] = True
    app.config['JWT_COOKIE_SAMESITE'] = 'Lax'

    # initializing extensions with the app
    db.init_app(app)
    migrate.init_app(app, db)
    bcrypt.init_app(app)
    jwt.init_app(app)
    ma.init_app(app)

    # Basic security headers, will be send with each response
    # flask response hook- runs after view returns the response but before its sent to browser
    @app.after_request
    def apply_security_headers(response):
        # prevents from clickjacking- site cant be embedded in iframe
        response.headers['X-Frame-Options'] = 'DENY'
        # prevents from mime-sniffing, tells the browser to not guess the content type
        response.headers['X-Content-Type-Options'] = 'nosniff'
        # XSS protection- only load content from source 
        response.headers['Content-Security-Policy'] = "default-src 'self'"
        return response
    
    
    # enabling CORS
    frontend_address = os.getenv("FRONTEND_URL", "http://localhost:3000")
    CORS(app, origins=[frontend_address], supports_credentials=True)

    # importing blueprint object called api from routes.py and registering it with the flask app - somewhat similar to react components,
    # keeps the code modular and scalable
    # in simple words, now we can define routes as @api.routes in routes file otherwise we would have to define every route
    # @app.routes, where app object is initialized.
    from .routes import api
    app.register_blueprint(api)

    return app