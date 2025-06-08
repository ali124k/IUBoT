from fastapi import FastAPI, Request
from pydantic import BaseModel
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.vectorstores import FAISS
from langchain.llms import Together
from langchain.chains import RetrievalQA
from dotenv import load_dotenv
import os

load_dotenv()
app = FastAPI()

class Query(BaseModel):
    question: str

embedding = HuggingFaceEmbeddings()
db = FAISS.load_local("vectorstore", embedding, allow_dangerous_deserialization=True)

llm = Together(
    model="meta-llama-3-8b-instruct",
    temperature=0.5,
    max_tokens=512,
    together_api_key=os.getenv("TOGETHER_API_KEY"),
)

qa = RetrievalQA.from_chain_type(llm=llm, retriever=db.as_retriever())

@app.post("/")
async def ask(query: Query):
    return {"answer": qa.run(query.question)}