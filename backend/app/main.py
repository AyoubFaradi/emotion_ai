import time
from fastapi import FastAPI
from app.api.auth_routes import router as auth_router
from app.api.routes import router
from app.database.db import engine
from app.database import models
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.exc import OperationalError
from sqlalchemy import text

def wait_for_db(max_retries=30, delay=2):
    """Attend que MySQL soit prêt avant de créer les tables"""
    for i in range(max_retries):
        try:
            with engine.connect() as conn:
                conn.execute(text("SELECT 1"))
            print("✓ Base de données connectée")
            return True
        except OperationalError:
            if i < max_retries - 1:
                print(f"⏳ Attente MySQL... ({i+1}/{max_retries})")
                time.sleep(delay)
            else:
                print("✗ Impossible de se connecter à MySQL")
                raise
    return False

# Attendre MySQL puis créer les tables
wait_for_db()
models.Base.metadata.create_all(bind=engine)
print("✓ Tables créées")

app = FastAPI(title="Emotion AI API")

app.include_router(auth_router)
app.include_router(router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
        "http://frontend:80"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"status": "API Emotion AI running"}
