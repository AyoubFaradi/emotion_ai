import os
from urllib.parse import quote_plus
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker, declarative_base

# Configuration de la base de données depuis les variables d'environnement
DB_USER = os.getenv("DB_USER", "emotion_user")
DB_PASSWORD = os.getenv("DB_PASSWORD", "emotion123")
DB_HOST = os.getenv("DB_HOST", "localhost")
DB_PORT = os.getenv("DB_PORT", "3306")
DB_NAME = os.getenv("DB_NAME", "emotion_ai_db")

# Échapper le mot de passe pour l'URL (gère les caractères spéciaux)
DB_PASSWORD_ESCAPED = quote_plus(DB_PASSWORD)

# URL de connexion MySQL
DATABASE_URL = (
    f"mysql+pymysql://{DB_USER}:{DB_PASSWORD_ESCAPED}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
    f"?charset=utf8mb4"
)

# Configuration de l'engine SQLAlchemy
engine = create_engine(
    DATABASE_URL,
    echo=False,
    pool_pre_ping=True,  # Vérifie la connexion avant utilisation
    pool_recycle=3600,   # Recycle les connexions après 1 heure
    pool_size=5,         # Nombre de connexions dans le pool
    max_overflow=10,     # Nombre maximum de connexions supplémentaires
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()

def get_db():
    """Générateur de session de base de données avec gestion d'erreurs"""
    db = SessionLocal()
    try:
        # Tester la connexion avant de retourner la session
        db.execute(text("SELECT 1"))
        yield db
    except Exception as e:
        db.rollback()
        raise
    finally:
        db.close()
