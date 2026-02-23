from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/projects')
def projects():
    return render_template('projects.html')

@app.route('/achievements')
def achievements():
    achievements = [
        {
            "id": "ConUHacks X",
            "victory": True,
            "done": True,
            "date": "1/01/2000",
            "participants": 1,
            "teammates": "Jongmin Lee, Evan Luo, Tariq Menla",
            "description": "description here"
        },
        {
            "id": "HackDécouverte",
            "victory": True,
            "done": True,
            "date": "1/01/2000",
            "participants": 1,
            "teammates": "Jongmin Lee, Evan Luo, Tariq Menla",
            "description": "description here"
        },
        {
            "id": "Science On Tourne!",
            "victory": False,
            "done": True,
            "date": "1/01/2000",
            "participants": 1,
            "teammates": "Jongmin Lee, Evan Luo, Tariq Menla",
            "description": "description here"
        },
        {
            "id": "Dialogue Employees Hackathon",
            "victory": False,
            "done": True,
            "date": "1/01/2000",
            "participants": 1,
            "teammates": "Jongmin Lee, Evan Luo, Tariq Menla",
            "description": "description here"
        },
        {
            "id": "UdeM Hacks",
            "victory": None,
            "done": False,
            "date": "1/01/2000",
            "participants": 1,
            "teammates": "Jongmin Lee, Evan Luo, Tariq Menla",
            "description": "description here"
        },
        {
            "id": "McGill Aerohacks",
            "victory": None,
            "done": False,
            "date": "1/01/2000",
            "participants": 1,
            "teammates": "Jongmin Lee, Evan Luo, Tariq Menla",
            "description": "description here"
        },
        {
            "id": "VanierHacks!",
            "victory": None,
            "done": False,
            "date": "1/01/2000",
            "participants": 1,
            "teammates": "Jongmin Lee, Evan Luo, Tariq Menla",
            "description": "description here"
        },
        {
            "id": "JacHacks",
            "victory": None,
            "done": False,
            "date": "1/01/2000",
            "participants": 1,
            "teammates": "Jongmin Lee, Evan Luo, Tariq Menla",
            "description": "description here"
        },
        {
            "id": "MariHacks",
            "victory": True,
            "done": False,
            "date": "1/01/2000",
            "participants": 1,
            "teammates": "Jongmin Lee, Evan Luo, Tariq Menla",
            "description": "description here"
        }
    ]
    return render_template('achievements.html', achievements=achievements)

@app.route('/contact')
def contact():
    return render_template('contact.html')

if __name__ == '__main__':
    app.run(debug=True)