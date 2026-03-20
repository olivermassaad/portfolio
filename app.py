import os
import smtplib
from email.message import EmailMessage
from email.utils import parseaddr

from flask import Flask, abort, redirect, render_template, request, url_for


def load_local_env(env_path=".env"):
    """Load KEY=VALUE pairs from a local .env file if present."""
    if not os.path.exists(env_path):
        return

    try:
        with open(env_path, encoding="utf-8") as env_file:
            for raw_line in env_file:
                line = raw_line.strip()
                if not line or line.startswith("#") or "=" not in line:
                    continue

                key, value = line.split("=", 1)
                key = key.strip()
                value = value.strip().strip('"').strip("'")
                if key and key not in os.environ:
                    os.environ[key] = value
    except OSError:
        # App still runs even if .env cannot be read.
        pass


load_local_env()

app = Flask(__name__)

PROJECTS = [
    {
        "name": "Nebula Ecosystem",
        "description": "Designed and developed multiple AI-powered daily-life applications, working across backend logic and frontend interfaces.",
    },
    {
        "name": "Nook",
        "description": "Built an AI-based productivity application from concept to implementation.",
    },
    {
        "name": "Lazy Dawg",
        "description": "Built a 24/7 YouTube radio station in 2023 with an animated pixel-art visual style, inspired by the always-on lofi format.",
    },
    {
        "name": "LAB_01",
        "description": "Worked on the LAB_01 game development team (2023-2024) as design manager and marketer; built eerie Half-Life-inspired environments in Twinmotion and helped produce a teaser.",
    },
    {
        "name": "SAJO Miami Office VR Simulation",
        "description": "Recreated SAJO's Miami office as a high-realism Twinmotion environment for VR walkthroughs (Oculus Quest 2), including custom textures, maps, and exterior reconstruction with Google Maps references and custom 3D models.",
    },
    {
        "name": "SAJO Miami Office Prototype",
        "description": "Delivered a first-pass Miami office simulation in Unity 3D before migrating the final experience to Twinmotion.",
    },
    {
        "name": "SAJO Montreal Office VR Simulation",
        "description": "Developed a full Twinmotion-based virtual office simulation for SAJO's Montreal office to support immersive stakeholder walkthroughs.",
    },
    {
        "name": "Harden Laval Rooftop LiDAR + Matterport Scan",
        "description": "Performed on-site rooftop capture work for Harden Laval using LiDAR and Matterport scanning workflows to support planning and modeling.",
    },
    {
        "name": "AstraIPT",
        "description": "Contributed to layout, logic, and backend architecture for AstraIPT, a website for SAJO's Technology and Innovation department.",
    },
    {
        "name": "Maeve Catalog Roblox Campaign Assets",
        "description": "Created 3D models, environments, and animations for ad-style Roblox content featuring characters wearing Maeve Catalog outfits.",
    },
    {
        "name": "Forge",
        "description": "Designed and developed a social platform concept focused on self-improvement content, goal tracking, workouts, and community accountability.",
    },
]

ACHIEVEMENTS = [
    {
        "slug": "conuhacks-x-2026",
        "title": "ConUHacks X",
        "victory": True,
        "status": "Winner",
        "date": "2026",
        "location": "Concordia University",
        "team": "",
        "description": "2nd place (Dialogue Challenge).",
        "details": [
            "Built and pitched a project for the Dialogue Challenge track.",
            "Collaborated in a high-intensity environment with tight deadlines.",
        ],
        "external_url": "https://devpost.com/software/dr-bob",
    },
    {
        "slug": "athacks-2026",
        "title": "AtHacks",
        "victory": True,
        "status": "Winner",
        "date": "2026",
        "location": "Concordia University",
        "team": "",
        "description": "3rd place (Beginner Stack).",
        "details": [
            "Delivered a complete beginner-stack submission from idea to demo.",
            "Earned podium placement against 600+ participants.",
        ],
        "external_url": "https://ctfd.athackctf.com/teams/88",
    },
    {
        "slug": "dialogue-2026",
        "title": "Dialogue",
        "victory": True,
        "status": "Winner",
        "date": "2026",
        "location": "Dialogue HQ",
        "team": "",
        "description": "Award recipient.",
        "details": [
            "Presented a healthcare-focused concept to the judging panel.",
            "Recognized for quality of execution and presentation.",
        ],
    },
    {
        "slug": "aerohacks-2026",
        "title": "AeroHacks",
        "victory": True,
        "status": "Winner",
        "date": "2026",
        "location": "McGill University",
        "team": "",
        "description": "Award recipient.",
        "details": [
            "Built an aviation-themed hackathon project with team collaboration.",
            "Recognized for the final submission and demo quality.",
        ],
        "external_url": "https://devpost.com/software/the-ganders",
    },
    {
        "slug": "science-on-tourne-2025",
        "title": "Science On Tourne!",
        "victory": False,
        "status": "Participant",
        "date": "2025",
        "location": "Montreal",
        "team": "",
        "description": "Participated with a concept ranked 4th place.",
        "details": [
            "Competed as part of The SnapDragons team.",
            "Concept received 4th place recognition.",
        ],
    },
    {
        "slug": "hackdecouverte-2025",
        "title": "HackDecouverte",
        "victory": True,
        "status": "Winner",
        "date": "2025",
        "location": "Concordia University",
        "team": "",
        "description": "Best Use of Gemini API.",
        "details": [
            "Won the API-specific category with a practical AI integration.",
            "Built and delivered a polished hackathon demo.",
        ],
        "external_url": "https://github.com/theganders/budgetx",
    },
    {
        "slug": "pinkeye-band-member-2025",
        "title": "PinkEye (Former Band Member)",
        "victory": None,
        "status": "Member",
        "date": "2025",
        "location": "Montreal",
        "team": "",
        "description": "Former member and keyboardist of the band.",
        "details": [
            "Contributed as the keyboardist during the band's active period.",
            "No stage performance under this membership period.",
        ],
    },
    {
        "slug": "shine-the-light-volunteer",
        "title": "Shine the Light on Woman Abuse & Violence Awareness Initiatives",
        "victory": False,
        "status": "Volunteer",
        "date": "2025",
        "location": "Montreal",
        "team": "",
        "description": "Volunteer contributor in awareness-focused community initiatives and violence prevention campaigns.",
        "details": [
            "Supported public-awareness efforts and outreach activities.",
            "Contributed to communication and event-level coordination.",
            "Assisted in violence-awareness and prevention initiatives.",
        ],
    },
    {
        "slug": "interview-sfeir-imbeau-2024",
        "title": "Interview: M. Sfeir & Mme Imbeau",
        "victory": False,
        "status": "Extracurricular",
        "date": "2024",
        "location": "Radio Web Stanislas",
        "team": "",
        "description": "Co-hosted an interview with diplomatic and community leadership guests.",
        "details": [
            "Contributed to research, hosting, and recording preparation.",
        ],
        "external_url": "https://www.plusieurscordesasavoix.com/interview-exclusif-de-m-sfeir-et-mme-imbeau/",
    },
    {
        "slug": "lab-01-dev-team-2024",
        "title": "LAB_01 Development Team",
        "victory": False,
        "status": "Participant",
        "date": "2024",
        "location": "Montreal",
        "team": "",
        "description": "Design manager and marketing contributor on the game development team.",
        "details": [
            "Built dark, eerie environments in Twinmotion inspired by Half-Life 2 aesthetics.",
            "Contributed to teaser development and project storytelling.",
        ],
    },
    {
        "slug": "ai-accelerator-certificate",
        "title": "AI Accelerator Program",
        "victory": None,
        "status": "Certificate",
        "date": "2024",
        "location": "Montreal",
        "team": "",
        "description": "Built an AI model from scratch to predict corporate bankruptcy risk.",
        "details": [
            "Completed the full AI accelerator curriculum.",
            "Trained and evaluated a predictive model end-to-end.",
        ],
    },
    {
        "slug": "interview-graphene-2023",
        "title": "Interview: Graphene & Dr. Serge Alziari",
        "victory": False,
        "status": "Extracurricular",
        "date": "2023",
        "location": "Radio Web Stanislas",
        "team": "",
        "description": "Co-produced and hosted a science interview episode on graphene research.",
        "details": [
            "Participated in interview preparation and on-air journalism segments.",
        ],
        "external_url": "https://www.plusieurscordesasavoix.com/le-graphene-une-matiere-miraculeuse-entrevue-exclusive-avec-le-biochimiste-serge-alziari/",
    },
    {
        "slug": "episode-fusion-nucleaire-2023",
        "title": "Episode: Fusion Nucleaire",
        "victory": False,
        "status": "Extracurricular",
        "date": "2023",
        "location": "Radio Web Stanislas",
        "team": "",
        "description": "Contributed to a science-focused media episode on nuclear fusion.",
        "details": [
            "Worked on content preparation and educational communication.",
        ],
        "external_url": "https://www.plusieurscordesasavoix.com/fusion-nucleaire-un-grand-pas-vers-le-futur/",
    },
    {
        "slug": "concours-castor-2022",
        "title": "Concours Castor",
        "victory": False,
        "status": "Participant",
        "date": "2022",
        "location": "Montreal",
        "team": "",
        "description": "Participant in an international high school math and coding competition.",
        "details": [
            "Competed against international participants from multiple institutions.",
        ],
    }
]


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/projects")
def projects():
    return render_template("projects.html", projects=PROJECTS)


@app.route("/achievements")
def achievements():
    return render_template("achievements.html", achievements=ACHIEVEMENTS)


@app.route("/achievements/<slug>")
def achievement_detail(slug):
    achievement = next((item for item in ACHIEVEMENTS if item["slug"] == slug), None)
    if achievement is None:
        abort(404)
    return render_template("achievement_detail.html", achievement=achievement)


@app.route("/contact")
def contact():
    return render_template("contact.html")


@app.route("/contact/submit", methods=["POST"])
def contact_submit():
    name = (request.form.get("name") or "").strip()
    email = (request.form.get("email") or "").strip()
    message = (request.form.get("message") or "").strip()

    if not name or not email or not message:
        return redirect(url_for("contact", sent=0, error="missing_fields"))

    parsed_email = parseaddr(email)[1]
    if "@" not in parsed_email:
        return redirect(url_for("contact", sent=0, error="invalid_email"))

    smtp_host = os.getenv("SMTP_HOST", "smtp.gmail.com")
    smtp_port = int(os.getenv("SMTP_PORT", "465"))
    smtp_username = os.getenv("SMTP_USERNAME")
    smtp_password = os.getenv("SMTP_PASSWORD")
    contact_to = os.getenv("CONTACT_TO_EMAIL", "olimasad@gmail.com")
    from_email = os.getenv("CONTACT_FROM_EMAIL", smtp_username or "no-reply@example.com")

    safe_name = name.replace("\r", " ").replace("\n", " ")
    safe_email = parsed_email.replace("\r", "").replace("\n", "")

    if not smtp_username or not smtp_password:
        return redirect(url_for("contact", sent=0, error="smtp_not_configured"))

    msg = EmailMessage()
    msg["Subject"] = f"New portfolio message from {safe_name}"
    msg["From"] = from_email
    msg["To"] = contact_to
    msg["Reply-To"] = safe_email
    msg.set_content(
        "New message from your portfolio contact form.\n\n"
        f"Name: {safe_name}\n"
        f"Email: {safe_email}\n\n"
        f"Message:\n{message}\n"
    )

    try:
        with smtplib.SMTP_SSL(smtp_host, smtp_port) as server:
            server.login(smtp_username, smtp_password)
            server.send_message(msg)
    except Exception:
        return redirect(url_for("contact", sent=0, error="send_failed"))

    return redirect(url_for("contact", sent=1))


if __name__ == "__main__":
    app.run(debug=True)
