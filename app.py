from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/projects')
def projects():
    projects_list = [
        {
            "name": "Nebulae Ecosystem (with GitHub Copilot)",
            "description": "Designed and developed multiple AI-powered daily-life applications. Worked across backend logic and frontend interfaces.",
        },
        {
            "name": "Nook (AI Organizer Application)",
            "description": "Built an AI-based productivity application from concept to implementation.",
        },
    ]
    return render_template('projects.html', projects=projects_list)

@app.route('/achievements')
def achievements():
    achievements_list = [
        {
            "id": "ConUHacks X",
            "victory": True,
            "done": True,
            "date": "2026",
            "participants": "1150+",
            "teammates": "",
            "description": "2nd place",
        },
        {
            "id": "@hacks",
            "victory": True,
            "done": True,
            "date": "2026",
            "participants": "600+",
            "teammates": "",
            "description": "3rd place (Beginner)",
        },
        {
            "id": "HackDécouverte",
            "victory": True,
            "done": True,
            "date": "2025",
            "participants": "500+",
            "teammates": "",
            "description": "Gemini API award",
        },
        {
            "id": "Dialogue",
            "victory": True,
            "done": True,
            "date": "2026",
            "participants": "40+",
            "teammates": "",
            "description": "Award",
        },
        {
            "id": "Certificate in AI Accelerator Program",
            "victory": None,
            "done": True,
            "date": "",
            "participants": "",
            "teammates": "",
            "description": "Built an AI model from scratch to predict future corporate bankruptcy risk as part of an extracurricular program.",
        },
    ]
    return render_template('achievements.html', achievements=achievements_list)

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/contact/submit', methods=['POST'])
def contact_submit():
    # Optional: validate name, email, message here or send email via a service
    _ = request.form.get('name'), request.form.get('email'), request.form.get('message')
    return redirect(url_for('contact', sent=1))

if __name__ == '__main__':
    app.run(debug=True)
