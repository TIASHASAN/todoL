import os

class Config:
    SQLALCHEMY_DATABASE_URI = 'mysql://username:password@localhost/todo_app'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.environ.get('SECRET_KEY', 'I_dont_know_if_it_works')
