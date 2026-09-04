# CodeSense AI

## Overview

CodeSense AI is an AI-powered code review application that analyzes source code, identifies bugs, detects potential security issues, provides optimization suggestions, and generates improved code using Google's Gemini API.

The application allows developers to review code across multiple programming languages through a simple and responsive web interface.

---

## Features

- AI-powered code analysis
- Bug detection and reporting
- Code optimization suggestions
- Security issue analysis
- Overall code quality score
- AI-generated improved code
- Copy improved code to clipboard
- Download review reports
- Review history using Local Storage
- Dark and Light mode
- Responsive user interface

---

## Technologies Used

### Frontend

- HTML5
- CSS3
- JavaScript

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
CodeSense-AI/
│
├── static/
│   ├── style.css
│   └── script.js
│
├── templates/
│   └── index.html
│
├── main.py
├── requirements.txt
├── .env
├── README.md
└── .gitignore
```

---

## Installation

### Clone the repository

```bash
git clone https://github.com/yourusername/CodeSense-AI.git
```

### Navigate to the project directory

```bash
cd CodeSense-AI
```

### Create a virtual environment

Windows

```bash
python -m venv venv
venv\Scripts\activate
```

Linux/macOS

```bash
python3 -m venv venv
source venv/bin/activate
```

### Install dependencies

```bash
pip install -r requirements.txt
```

### Configure environment variables

Create a `.env` file in the project directory.

```env
GOOGLE_API_KEY=YOUR_GEMINI_API_KEY
```

### Run the application

```bash
uvicorn main:app --reload
```

Open the application in your browser:

```
http://127.0.0.1:8000
```

---

## Usage

1. Select the programming language.
2. Paste the source code into the editor.
3. Click **Analyze Code**.
4. Review the generated analysis, which includes:
   - Overall Score
   - Bugs Found
   - Suggestions
   - Security Report
   - Improved Code
5. Copy or download the generated report if required.

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

## Screenshots

### Home Page

*Add screenshot here.*

### Analysis Result

*Add screenshot here.*

---

## Future Enhancements

- Syntax highlighting for improved code
- PDF report export
- User authentication
- Cloud-based review history
- Support for additional AI models
- Line-by-line code explanation
- Real-time code analysis

---

## Live Demo

**Application**

```
Add your deployed application URL here
```

---

## GitHub Repository

```
Add your GitHub repository URL here
```

---

## Author

**Tanisha Adari**

---

## License

This project was developed as part of a Build Sprint assignment for educational and evaluation purposes.