from pymongo import MongoClient
from dotenv import load_dotenv
import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from groq import Groq

# Load environment variables
load_dotenv()

app = Flask(__name__)

# -----------------------------
# MongoDB Connection
# -----------------------------
MONGO_URI = os.getenv("MONGO_URI")

if not MONGO_URI:
    raise RuntimeError("MONGO_URI not found in environment variables")

mongo_client = MongoClient(MONGO_URI)
db = mongo_client["aistudubudy"]
users_collection = db["users"]
history_collection = db["history"]

# -----------------------------
# CORS Configuration
# -----------------------------
CORS(
    app,
    resources={
        r"/api/*": {
            "origins": [
                "http://localhost:5173",
                "https://aistudubudy.netlify.app"
            ]
        }
    },
    supports_credentials=True
)

# -----------------------------
# Groq AI Client
# -----------------------------
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

if not GROQ_API_KEY:
    raise RuntimeError("GROQ_API_KEY not found in environment variables")

groq_client = Groq(api_key=GROQ_API_KEY)


# -----------------------------
# Health Check
# -----------------------------
@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"})


# -----------------------------
# Explain API
# -----------------------------
@app.route("/api/explain", methods=["POST"])
def explain():
    try:
        data = request.get_json() or {}
        topic = data.get("topic", "")
        notes = data.get("notes", "")

        response = groq_client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {"role": "system", "content": "You are a helpful study assistant."},
                {
                    "role": "user",
                    "content": f"Explain the topic clearly.\n\nTopic: {topic}\nNotes: {notes}"
                }
            ]
        )

        result = response.choices[0].message.content

        # ⭐ Save to history
        history_collection.insert_one({
            "topic": topic,
            "notes": notes,
            "mode": "explain",
            "result": result
        })

        return jsonify({"result": result})

    except Exception as e:
        return jsonify({"result": f"AI Error: {str(e)}"}), 500
# -----------------------------
# Summarize API
# -----------------------------
@app.route("/api/summarize", methods=["POST"])
def summarize():
    try:
        data = request.get_json() or {}
        topic = data.get("topic", "")
        notes = data.get("notes", "")

        response = groq_client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {"role": "system", "content": "You summarize notes for students."},
                {
                    "role": "user",
                    "content": f"Summarize these notes into bullet points.\n\nTopic: {topic}\nNotes:\n{notes}"
                }
            ]
        )

        result = response.choices[0].message.content

        history_collection.insert_one({
            "topic": topic,
            "notes": notes,
            "mode": "summarize",
            "result": result
        })

        return jsonify({"result": result})

    except Exception as e:
        return jsonify({"result": f"AI Error: {str(e)}"}), 500
# -----------------------------
# Quiz API
# -----------------------------
@app.route("/api/quiz", methods=["POST"])
def quiz():
    try:
        data = request.get_json() or {}
        topic = data.get("topic", "")

        response = groq_client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {"role": "system", "content": "You generate quizzes for learning."},
                {
                    "role": "user",
                    "content": f"Create a 3-question multiple choice quiz on the topic:\n{topic}"
                }
            ]
        )

        result = response.choices[0].message.content

        history_collection.insert_one({
            "topic": topic,
            "mode": "quiz",
            "result": result
        })

        return jsonify({"result": result})

    except Exception as e:
        return jsonify({"result": f"AI Error: {str(e)}"}), 500
# -----------------------------
# Register API
# -----------------------------
@app.route("/api/register", methods=["POST"])
def register():
    data = request.get_json() or {}

    name = data.get("name", "").strip()
    email = data.get("email", "").strip().lower()
    password = data.get("password", "").strip()

    if not email or not password:
        return jsonify({"success": False, "message": "Email and password required"}), 400

    existing_user = users_collection.find_one({"email": email})

    if existing_user:
        return jsonify({"success": False, "message": "User already exists"}), 400

    users_collection.insert_one({
        "name": name,
        "email": email,
        "password": password
    })

    return jsonify({"success": True, "message": "Registration successful"})


# -----------------------------
# Login API
# -----------------------------
@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json() or {}

    email = data.get("email", "").strip().lower()
    password = data.get("password", "").strip()

    user = users_collection.find_one({
        "email": email,
        "password": password
    })

    if not user:
        return jsonify({"success": False, "message": "Invalid credentials"}), 401

    return jsonify({"success": True, "message": "Login successful"})

@app.route("/api/history", methods=["GET"])
def get_history():

    history = list(
        history_collection
        .find({}, {"_id": 0})
        .sort("_id", -1)
        .limit(10)
    )

    return jsonify(history)

# -----------------------------
# Run App
# -----------------------------
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)