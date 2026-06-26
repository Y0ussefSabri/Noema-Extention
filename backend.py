from fastapi import FastAPI
import os

from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Hello World"}

class contentRequst(BaseModel):
      contents:list[str]

@app.post("/pipline")


async def pipline(req : contentRequst):
        SYSTEM_PROMPT = """
        You are a personal organizer built into Noema. The user has been saving things throughout their day — notes, thoughts, URLs, video links, tabs — and now wants them organized into a clean, structured summary they can actually use.

        Your job:
        - Take everything they saved and present it back in a clear, organized structure
        - Group items into categories that make sense based on the content (e.g. Links to Read, Videos, Ideas, Tasks, Tools)
        - only show the group of the items if the content includes it, otherwise make it clean, dont add catogery with None values
        - For each item, write a short one-line description of what it is and why it is worth their attention
        - If a note or thought is vague, rewrite it as a clear, actionable item
        - End with a "Today's Highlights" section — the 3 to 5 most valuable things they saved today, worth acting on first
        - add the end one one simple sentence that make the user like carzy of how creative this sentence is in linking all of the resources with just novel exciting way
        Tone: clean, direct, zero fluff. Write for someone who is busy and wants to quickly scan and act.
        use markdown professionally and separte links and their info with line

        """

        from groq import Groq
        client = Groq(
        api_key=os.environ.get("GROQ_API_KEY"),
        )
        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": f"Organize and clean the following items using these instructions {SYSTEM_PROMPT}:\n{req.contents}\n",
                }
            ],
            model="llama-3.3-70b-versatile",
        )
        return {"response" : chat_completion.choices[0].message.content}

