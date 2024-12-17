from flask import Blueprint
from .pipeline import pipeline_bp
from .repository import repository_bp
from .codeql import codeql_bp
from .notification import notification_bp

api = Blueprint('api', __name__)

# Register all route blueprints
def init_routes(app):
    app.register_blueprint(pipeline_bp, url_prefix='/pipelines')
    app.register_blueprint(repository_bp, url_prefix='/repositories')
    app.register_blueprint(codeql_bp, url_prefix='/codeql')
    app.register_blueprint(notification_bp, url_prefix='/notifications')