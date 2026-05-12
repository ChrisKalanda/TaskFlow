import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import engine, Base
from .routers import auth, tasks

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="TaskFlow API",
    description="API REST pour le gestionnaire de tâches TaskFlow",
    version="1.0.0",
)

origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(tasks.router)


@app.get("/")
def root():
    return {"message": "TaskFlow API is running", "docs": "/docs"}
