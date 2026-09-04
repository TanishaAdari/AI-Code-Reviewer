from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
from dotenv import load_dotenv
from google import genai
from google.genai import types
from prompt import SYSTEM_PROMPT
import os

# Load Environment Variables

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise RuntimeError("GEMINI_API_KEY not found in .env file")

# Gemini Client

client = genai.Client(api_key=api_key)

# FastAPI App

app = FastAPI(
    title="CodeSense AI API",
    description="Professional AI Code Review API powered by Google Gemini",
    version="2.0.0"
)

app.mount("/static", StaticFiles(directory="frontend"), name="static")
@app.get("/")
def home():
    return FileResponse("frontend/index.html")

# Enable CORS

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request Model

class CodeRequest(BaseModel):
    language: str
    code: str

# Review Route

@app.post("/review")
def review(data: CodeRequest):
    """Generate an AI code review."""

    prompt = f"""{SYSTEM_PROMPT}

    Programming Language:
    {data.language}

    Source Code:
    {data.code}
    """

    try:

        response = client.models.generate_content(
            model="gemini-3.6-flash",
            contents=prompt,
            config=types.GenerateContentConfig(
                temperature=0.2,
                max_output_tokens=4096
            )
        )

        review_text = (response.text or "").strip()

        if not review_text:
            raise HTTPException(
                status_code=500,
                detail="Gemini returned an empty response."
            )

        return {
            "success": True,
            "language": data.language,
            "review": review_text
        }

    except HTTPException:
        raise

    except Exception as e:
        print("GEMINI ERROR:", repr(e))

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )