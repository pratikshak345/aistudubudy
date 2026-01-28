# AI Study Buddy 📚🤖

AI Study Buddy is a full-stack web application that helps students **understand topics**, **summarize notes**, and **generate quizzes** using AI.

The project is built with a **React + Vite frontend** and a **Flask backend**, integrated with a **free AI inference API (Groq – LLaMA 3.1)**.

---

## 🚀 Features

- 📖 **Explain Topics** – Get clear, student-friendly explanations
- 📝 **Summarize Notes** – Convert long notes into concise bullet points
- 🧠 **Generate Quizzes** – Practice with AI-generated MCQs
- ⚡ **Fast AI Responses** using Groq (LLaMA-3.1)
- 🔒 Secure API key handling using environment variables

---

## 🛠️ Tech Stack

### Frontend
- React (TypeScript)
- Vite
- Tailwind CSS
- Axios

### Backend
- Python
- Flask
- Flask-CORS
- Groq AI SDK
- python-dotenv

---

## 📁 Project Structure

project-root/
│
├── backend/
│ ├── app.py
│ ├── requirements.txt
│ ├── .env
│ └── venv/
│
├── src/
│ ├── pages/
│ ├── components/
│ └── App.tsx
│
├── .gitignore
├── README.md
└── package.json


---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/ai-study-buddy.git
cd ai-study-buddy

2️⃣ Backend Setup (Flask)
cd backend
python -m venv venv
venv\Scripts\activate   # Windows
pip install -r requirements.txt


Create a .env file:
GROQ_API_KEY=your_groq_api_key_here

Run backend:

python app.py

Backend runs on:

http://127.0.0.1:5000

3️⃣ Frontend Setup (React)
npm install
npm run dev


Frontend runs on:

http://localhost:5173

🔌 API Endpoints
Method	Endpoint	Description
GET	/api/health	Backend health check
POST	/api/explain	Explain a topic
POST	/api/summarize	Summarize notes
POST	/api/quiz	Generate quiz
🔐 Environment Variables
Variable	Description
GROQ_API_KEY	Free AI inference API key

⚠️ Never commit .env files

🎯 Use Case

This project is ideal for:

College mini-projects

AI/ML demonstrations

Resume & portfolio projects

Learning full-stack development with AI APIs

📌 Future Improvements

Add loading & retry states

Improve quiz UI with options & answers

Add history & saved responses

Deploy backend using Render / Railway

👨‍💻 Author

Developed by Pratiksha Kamble
Student | Full-Stack Developer | AI Enthusiast