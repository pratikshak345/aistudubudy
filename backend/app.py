from dotenv import load_dotenv
import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from groq import Groq

load_dotenv()

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])

# Simple in-memory user store (demo purposes only)
users = {}

# Groq client
client = Groq(api_key=os.getenv("GROQ_API_KEY"))


@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"})


@app.route("/api/register", methods=["POST"])
def register():
    """
    Very basic demo registration.
    NOTE: This is not production-ready authentication.
    """
    data = request.get_json() or {}
    name = data.get("name", "").strip()
    email = data.get("email", "").strip().lower()
    password = data.get("password", "").strip()

    if not email or not password:
        return jsonify({"success": False, "message": "Email and password are required."}), 400

    if email in users:
        return jsonify({"success": False, "message": "User already exists. Please login."}), 400

    users[email] = {"name": name or email.split("@")[0], "password": password}

    return jsonify(
        {
            "success": True,
            "message": "Registration successful.",
            "user": {"name": users[email]["name"], "email": email},
        }
    )


@app.route("/api/login", methods=["POST"])
def login():
    """
    Very basic demo login.
    NOTE: This is not production-ready authentication.
    """
    data = request.get_json() or {}
    email = data.get("email", "").strip().lower()
    password = data.get("password", "").strip()

    if not email or not password:
        return jsonify({"success": False, "message": "Email and password are required."}), 400

    user = users.get(email)
    if not user or user.get("password") != password:
        return jsonify({"success": False, "message": "Invalid email or password."}), 401

    # For demo: return a fake token
    return jsonify(
        {
            "success": True,
            "message": "Login successful.",
            "user": {"name": user["name"], "email": email},
            "token": "demo-token",
        }
    )


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


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
