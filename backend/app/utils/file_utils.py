from uuid import uuid4


def generate_unique_filename(filename:str)->str:
    unique_id=uuid4().hex[:8]
    
    return f"{unique_id}_{filename}"