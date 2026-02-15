from dotenv import load_dotenv
import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from groq import Groq

load_dotenv()

app = Flask(__name__)

users = {}

CORS(
    app,
    resources={r"/api/*": {
        "origins": [
            "http://localhost:5173",
            "https://aistudubudy.netlify.app"
        ]
    }},
    supports_credentials=True
)




# Groq client
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

if not GROQ_API_KEY:
    raise RuntimeError("GROQ_API_KEY not found in environment variables")

client = Groq(api_key=GROQ_API_KEY)



@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"})


@app.route("/api/explain", methods=["POST"])
def explain():
    try:
        data = request.get_json()
        topic = data.get("topic", "")
        notes = data.get("notes", "")

        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {"role": "system", "content": "You are a helpful study assistant."},
                {
                    "role": "user",
                    "content": f"Explain the topic clearly.\n\nTopic: {topic}\nNotes: {notes}"
                }
            ]
        )

        return jsonify({
            "result": response.choices[0].message.content
        })

    except Exception as e:
        return jsonify({
            "result": f"AI Error: {str(e)}"
        }), 200


@app.route("/api/summarize", methods=["POST"])
def summarize():
    try:
        data = request.get_json()
        topic = data.get("topic", "")
        notes = data.get("notes", "")

        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {"role": "system", "content": "You summarize notes for students."},
                {
                    "role": "user",
                    "content": f"Summarize these notes into bullet points.\n\nTopic: {topic}\nNotes:\n{notes}"
                }
            ]
        )

        return jsonify({
            "result": response.choices[0].message.content
        })

    except Exception as e:
        return jsonify({
            "result": f"AI Error: {str(e)}"
        }), 200


@app.route("/api/quiz", methods=["POST"])
def quiz():
    try:
        data = request.get_json()
        topic = data.get("topic", "")

        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {"role": "system", "content": "You generate quizzes for learning."},
                {
                    "role": "user",
                    "content": f"Create a 3-question multiple choice quiz on the topic:\n{topic}"
                }
            ]
        )

        return jsonify({
            "result": response.choices[0].message.content
        })

    except Exception as e:
        return jsonify({
            "result": f"AI Error: {str(e)}"
        }), 200


@app.route("/api/register", methods=["POST"])
def register():
    data = request.get_json(silent=True) or {}
    name = data.get("name", "").strip()
    email = data.get("email", "").strip().lower()
    password = data.get("password", "").strip()

    if not email or not password:
        return jsonify({"success": False, "message": "Email and password required"}), 400

    if email in users:
        return jsonify({"success": False, "message": "User already exists"}), 400

    users[email] = {
        "name": name or email.split("@")[0],
        "password": password
    }

    return jsonify({
        "success": True,
        "message": "Registration successful"
    })


@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json() or {}
    email = data.get("email", "").strip().lower()
    password = data.get("password", "").strip()

    user = users.get(email)

    if not user or user["password"] != password:
        return jsonify({"success": False, "message": "Invalid credentials"}), 401

    return jsonify({
        "success": True,
        "message": "Login successful"
    })

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)

# Simple in-memory user storage (demo only)
