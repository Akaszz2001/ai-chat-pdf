from sentence_transformers import SentenceTransformer
import chromadb

model=SentenceTransformer("all-MiniLM-L6-v2")

client=chromadb.PersistentClient(path="chroma_db")
collection=client.get_or_create_collection(name="pdf_chunks")

def generate_embedding(text:str):
    return model.encode(text).tolist()

def store_chunks(chunks,pdf_id):
    for index,chunk in enumerate(chunks):
        embedding=generate_embedding(chunk)
        
        collection.add(
            ids=[f"{pdf_id}_{index}"],
            embeddings=[embedding],
            documents=[chunk],
            metadatas=[
                {
                    "pdf_id":pdf_id,
                    "chunk_index":index
                }
            ]
            
        )
        
def search_chunks(query: str,pdf_id:str, n_results: int = 3):
    query_embedding = generate_embedding(query)

    results = collection.query(
        query_embeddings=[query_embedding],
        where={
            "pdf_id":pdf_id
        }
    )

    print("\nQuery:", query)

    for i, doc in enumerate(results["documents"][0]):
        print(f"\nResult {i+1}")
        print("Distance:", results["distances"][0][i])
        print(doc[:300])

    return results