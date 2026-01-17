import bcrypt
from jose import jwt, JWTError
from datetime import datetime, timedelta

SECRET_KEY = "SUPER_SECRET_KEY_123"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_DAYS = 1

def hash_password(password: str) -> str:
    """Hash un mot de passe avec bcrypt"""
    # Encoder le mot de passe en bytes
    password_bytes = password.encode('utf-8')
    # Tronquer à 72 bytes (limite de bcrypt)
    if len(password_bytes) > 72:
        password_bytes = password_bytes[:72]
    # Générer le hash
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password_bytes, salt)
    return hashed.decode('utf-8')

def verify_password(password: str, hashed_password: str) -> bool:
    """Vérifie un mot de passe contre un hash"""
    # Encoder le mot de passe en bytes
    password_bytes = password.encode('utf-8')
    # Tronquer à 72 bytes (limite de bcrypt)
    if len(password_bytes) > 72:
        password_bytes = password_bytes[:72]
    # Vérifier le mot de passe
    hashed_bytes = hashed_password.encode('utf-8')
    return bcrypt.checkpw(password_bytes, hashed_bytes)

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(days=ACCESS_TOKEN_EXPIRE_DAYS)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def decode_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None
