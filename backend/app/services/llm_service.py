import os

from google import genai
from dotenv import load_dotenv

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


def generate_answer(
    question: str,
    context: str
):
    prompt = f"""
You are a helpful assistant.

Answer the user's question using ONLY
the provided context.

If the answer is not in the context,
say:

"I could not find that information in the PDF."

Context:
{context}

Question:
{question}
"""

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,
    )

    return response.text