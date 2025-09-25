from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import uvicorn
# from gemini_service import generate_poem
from gemini_service import generate_poem


app = FastAPI(title="AbiPoet API", version="1.0.0")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PoemRequest(BaseModel):
    keywords: str
    genre: str
    lineCount: Optional[int] = None

@app.get("/")
async def root():
    return {"message": "AbiPoet FastAPI is running"}

@app.post("/generate-poem")
async def generate_poem_endpoint(request: PoemRequest):
    try:
        poem = await generate_poem(
            keywords=request.keywords,
            genre=request.genre,
            line_count=request.lineCount
        )
        return {"poem": poem}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8002)