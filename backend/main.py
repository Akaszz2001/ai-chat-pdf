from pathlib import Path
from fastapi import FastAPI,File,UploadFile
from fastapi.middleware.cors import CORSMiddleware
from app.utils.file_utils import generate_unique_filename
from app.services.pdf_service import extract_text_from_pdf
from app.services.chunk_service import chunkSplitter
from app.services.vector_service import store_chunks
from app.schemas.chat import (ChatRequest,ChatResponse)

from app.services.rag_service import ask_pdf
app=FastAPI()

UPLOAD_DIR=Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
        allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')

async def root():
    return {"message":"AI pdf chat backend running"}


@app.post("/upload")
async def upload_pdf(file:UploadFile=File(...)):
    unique_filename=generate_unique_filename(file.filename)
    file_path=UPLOAD_DIR/unique_filename
    
    with open(file_path,"wb") as buffer:
        buffer.write(await file.read())
    
    
    text=extract_text_from_pdf(str(file_path))
    print(text[:5000])
    
    chunks=chunkSplitter(text)
    
    store_chunks(chunks=chunks,pdf_id=unique_filename)
        

    return {
    "original_filename": file.filename,
    "stored_filename": unique_filename,
    "status": "uploaded"
}


@app.post('/chat',response_model=ChatResponse)
async def chat(request:ChatRequest):
    answer=ask_pdf(
        request.question,
        request.pdf_id
    )
    
    return ChatResponse(answer=answer)