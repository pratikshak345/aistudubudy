from dotenv import load_dotenv
import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from groq import Groq

load_dotenv()

app = Flask(__name__)

# ✅ Allow both local + deployed frontend
CORS(app, origins=[
    "http://localhost:5173",
    "https://*.netlify.app"
])

# Simple in-memory user store (demo purposes only)
users = {}

# ✅ Safe API key check
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
if not GROQ_API_KEY:
    raise RuntimeError("GROQ_API_KEY not found in environment variables")

client = Groq(api_key=GROQ_API_KEY)


@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"})


@app.route("/api/register", methods=["POST"])
def register():
    data = request.get_json() or {}
    name = data.get("name", "").strip()
    email = data.get("email", "").strip().lower()
    password = data.get("password", "").strip()

    if not email or not password:
        return jsonify({"success": False, "message": "Email and password are required."}), 400

    if email in users:
        return jsonify({"success": False, "message": "User already exists. Please login."}), 400

    users[email] = {"name": name or email.split("@")[0], "password": password}

    return jsonify({
        "success": True,
        "message": "Registration successful.",
        "user": {"name": users[email]["name"], "email": email}
    })


@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json() or {}
    email = data.get("email", "").strip().lower()
    password = data.get("password", "").strip()

    if not email or not password:
        return jsonify({"success": False, "message": "Email and password are required."}), 400

    user = users.get(email)
    if not user or user.get("password") != password:
        return jsonify({"success": False, "message": "Invalid email or password."}), 401

    return jsonify({
        "success": True,
        "message": "Login successful.",
        "user": {"name": user["name"], "email": email},
        "token": "demo-token"
    })


@app.route("/api/explain", methods=["POST"])
def explain():
    try:
        data = request.get_json() or {}
        topic = data.get("topic", "")
        notes = data.get("notes", "")

        prompt = f"""You are an AI study assistant.

Explain the topic in a clear, structured, and visually readable format
so that students find it attractive and easy to read.

Follow this exact structure and formatting:

TITLE (make it short and clear)

DEFINITION
- 2–3 lines only

DETAILED EXPLANATION
- Write in short paragraphs
- Use simple language
- Avoid long blocks of text

KEY POINTS
- Use bullet points
- Each point should be one line

REAL-WORLD EXAMPLE
- Explain in 3–4 lines

ADVANTAGES
- Bullet points

DISADVANTAGES
- Bullet points

SUMMARY
- 3–4 concise lines

Formatting Rules:
- Use clear headings in CAPITAL LETTERS
- Leave a blank line between sections
- Do not write random paragraphs
- Do not add emojis
- Keep content clean and readable

Topic: {topic}
{f'Additional Notes: {notes}' if notes else ''}
"""

        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {"role": "system", "content": "You are a helpful study assistant that formats explanations clearly."},
                {"role": "user", "content": prompt}
            ]
        )

        return jsonify({"result": response.choices[0].message.content})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/summarize", methods=["POST"])
def summarize():
    try:
        data = request.get_json() or {}
        topic = data.get("topic", "")
        notes = data.get("notes", "")

        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {"role": "system", "content": "You summarize notes for students."},
                {"role": "user", "content": f"Summarize these notes into bullet points.\n\nTopic: {topic}\nNotes:\n{notes}"}
            ]
        )

        return jsonify({"result": response.choices[0].message.content})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/quiz", methods=["POST"])
def quiz():
    try:
        data = request.get_json() or {}
        topic = data.get("topic", "")

        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {"role": "system", "content": "You generate quizzes for learning."},
                {"role": "user", "content": f"Create a 3-question multiple choice quiz on the topic:\n{topic}"}
            ]
        )

        return jsonify({"result": response.choices[0].message.content})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ✅ REQUIRED FOR RENDER

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
