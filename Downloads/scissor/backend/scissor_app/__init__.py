from fastapi import FastAPI, HTTPException, APIRouter
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import DeclarativeMeta, declarative_base
from sqlalchemy.orm import sessionmaker
from .database import SessionLocal
from config import SECRET_KEY, DATABASE_URI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Scissor", description="URL link shortener at it's best. Brief is key!")

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://scissor-theta.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"]
)

engine = create_engine(DATABASE_URI)

SessionLocal = sessionmaker(autocommit = False, autoflush = False, bind = engine)
Base: DeclarativeMeta = declarative_base()


from scissor_app import routes
app.include_router(routes.scissor_router)