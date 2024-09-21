from flask import Blueprint, jsonify
from app import db

tasks_blueprint = Blueprint('tasks', __name__)

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    description = db.Column(db.String(200), nullable=True)
    streak = db.Column(db.Integer, default=0)
    completed = db.Column(db.Boolean, default=False)

@tasks_blueprint.route('/tasks', methods=['GET'])
def get_tasks():
    tasks = Task.query.all()
    tasks_list = [
        {
            "id": task.id,
            "name": task.name,
            "description": task.description,
            "streak": task.streak,
            "completed": task.completed
        }
        for task in tasks
    ]
    return jsonify(tasks_list)
