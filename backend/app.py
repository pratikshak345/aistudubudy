from dotenv import load_dotenv
import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from groq import Groq

load_dotenv()

app = Flask(__name__)
CORS(app, origins=[
    "http://localhost:5173",
    "https://aistudubudy.netlify.app"
])


# Groq client
client = Groq(api_key=os.getenv("GROQ_API_KEY"))


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


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
