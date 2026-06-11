from pydantic import BaseModel

class ChatRequest(BaseModel):
    question:str
    pdf_id:str
    
    
class ChatResponse(BaseModel):
    answer:str