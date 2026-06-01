from pathlib import Path
from fastapi import FastAPI,File,UploadFile
from fastapi.middleware.cors import CORSMiddleware
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
    file_path=UPLOAD_DIR/file.filename
    
    with open(file_path,"wb") as buffer:
        buffer.write(await file.read())
    
    
    return {
        "filename":file.filename,
        "status":"Uploaded"
    }

