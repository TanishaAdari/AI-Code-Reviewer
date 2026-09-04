# CodeSense AI – AI Code Reviewer & Bug Fixing Agent

## Overview

CodeSense AI is an AI-powered web application that reviews source code using Google's Gemini API. It analyzes code across multiple programming languages, detects bugs, identifies potential security issues, provides optimization suggestions, and generates an improved version of the submitted code.

The application features a clean and responsive interface built with HTML, CSS, and JavaScript, while the backend is powered by FastAPI.

---

## Features

- AI-powered code analysis using Google Gemini
- Supports multiple programming languages
- Detects bugs and logical issues
- Performs security analysis
- Provides code optimization suggestions
- Generates AI-improved code
- Displays an overall code quality score
- Copy improved code to clipboard
- Download review reports as text files
- Stores previous reviews using Browser Local Storage
- Light and Dark mode support
- Responsive user interface

---

## Technologies Used

### Frontend

- HTML5
- CSS3
- JavaScript
- Font Awesome

### Backend

- Python
- FastAPI
- Uvicorn

### AI Integration

- Google Gemini API

### Storage

- Browser Local Storage

---

## Project Structure

```text
AI-Code-Reviewer/
│
├── backend/
│   ├── frontend/
│   │   ├── index.html
│   │   ├── style.css
│   │   └── script.js
│   │
│   ├── __pycache__/
│   ├── .env
│   ├── main.py
│   ├── prompt.py
│   └── requirements.txt
│
├── .env.example
├── .gitignore
└── README.md
```

---

## Installation

### Clone the repository

```bash
git clone https://github.com/TanishaAdari/AI-Code-Reviewer.git
```

### Navigate to the project directory

```bash
cd AI-Code-Reviewer
```

### Create a virtual environment

**Windows**

```bash
python -m venv venv
venv\Scripts\activate
```

**Linux / macOS**

```bash
python3 -m venv venv
source venv/bin/activate
```

### Install dependencies

```bash
pip install -r backend/requirements.txt
```

### Configure Environment Variables

Create a `.env` file inside the **backend** folder.

Example:

```env
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

### Run the Application

```bash
cd backend
uvicorn main:app --reload
```

Open your browser and visit:

```
http://127.0.0.1:8000
```

---

## Usage

1. Select a programming language.
2. Paste the source code into the editor.
3. Click **Analyze Code**.
4. The application sends the code to the FastAPI backend.
5. The backend communicates with Google's Gemini API.
6. The AI analyzes the code and returns:
   - Overall Score
   - Bugs Found
   - Optimization Suggestions
   - Security Report
   - Improved Code
7. Review, copy, or download the generated report.

---

## Supported Programming Languages

- Python
- Java
- JavaScript
- C
- C++
- C#
- Go
- PHP
- Rust
- Swift
- Kotlin

---

## Application Workflow

```text
User
   │
   ▼
Frontend (HTML/CSS/JavaScript)
   │
   ▼
FastAPI Backend
   │
   ▼
Google Gemini API
   │
   ▼
AI Code Analysis
   │
   ▼
Frontend displays:
• Overall Score
• Bugs
• Suggestions
• Security Report
• Improved Code
```

## Future Enhancements

- Syntax highlighting for generated code
- Line-by-line bug explanation
- PDF report generation
- Docker support
- Database-backed review history
- User authentication
- CI/CD integration
- Support for additional AI models
- Advanced static code analysis

---

## Live Demo

**Application**

```
https://ai-code-reviewer-qxos.onrender.com
```

---

## GitHub Repository

```
https://github.com/TanishaAdari/AI-Code-Reviewer
```

---

## Author

**Tanisha Adari**

---

## License

This project was developed as part of a Build Sprint assignment for educational and evaluation purposes.
