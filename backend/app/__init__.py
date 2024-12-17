from flask import Flask
from flask_cors import CORS
from .routes import init_routes

def create_app():
    app = Flask(__name__)
    CORS(app)  # Enable CORS for all routes
    
    # Initialize routes
    init_routes(app)
    
    return app