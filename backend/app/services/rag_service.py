from app.services.vector_service import (
    search_chunks
)

from app.services.llm_service import (
    generate_answer
)


def ask_pdf(question: str,pdf_id: str):
    results = search_chunks(
        question,
        pdf_id,
        n_results=3
    )

    documents = results["documents"][0]

    context = "\n\n".join(
        documents
    )

    answer = generate_answer(
        question,
        context
    )

    return answer