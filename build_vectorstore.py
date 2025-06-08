from langchain.embeddings import HuggingFaceEmbeddings
from langchain.vectorstores import FAISS
from langchain.text_splitter import CharacterTextSplitter
from langchain.document_loaders import TextLoader

loader = TextLoader("C:/Users/HP/OneDrive/Desktop/IUBoT1.4/mydata.txt")
documents = loader.load()

splitter = CharacterTextSplitter(chunk_size=500, chunk_overlap=50)
docs = splitter.split_documents(documents)

embedding = HuggingFaceEmbeddings()
db = FAISS.from_documents(docs, embedding)
db.save_local("vectorstore")
