from flask import Flask, jsonify, request
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)

CORS(app, supports_credentials=True, origins=["http://localhost:5173"])

def get_db_connection():
    connection = mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        database="todo_app"
    )
    return connection

@app.route('/tasks', methods=['GET'])
def get_tasks():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)

    cursor.execute("SELECT * FROM tasks")
    tasks = cursor.fetchall()
    cursor.close()
    connection.close()

    return jsonify({"tasks": tasks})

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    connection = get_db_connection()
    if connection is None:
        return jsonify({'success': False, 'message': 'Database connection error'}), 500

    cursor = connection.cursor(dictionary=True)
    query = "SELECT * FROM users WHERE email = %s AND password = %s"
    cursor.execute(query, (email, password))
    user = cursor.fetchone()

    cursor.close()
    connection.close()

    if user:
        return jsonify({'success': True}), 200
    else:
        return jsonify({'success': False, 'message': 'Invalid email or password. Please try again.'}), 401

if __name__ == '__main__':
    app.run(debug=True)
