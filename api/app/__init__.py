from flask import Flask

from .config import configure_cors

app = Flask(__name__)

configure_cors(app)

from app import routes

