from app.services.rag_service import (
    ask_pdf
)

answer = ask_pdf(
    "What technologies does Akash know?",
    "30b9aabb_COVER LETTER-AKASH-ETERNAL.pdf"
)

print(answer)