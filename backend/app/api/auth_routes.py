from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError, IntegrityError
from app.database.db import get_db
from app.database.models import User
from app.api.schemas import RegisterRequest, LoginRequest
from app.services.auth import hash_password, verify_password, create_access_token

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/register")
def register(data: RegisterRequest, db: Session = Depends(get_db)):
    try:
        # Vérifier si l'email existe déjà
        existing_user = db.query(User).filter(User.email == data.email).first()
        if existing_user:
            raise HTTPException(status_code=400, detail="Email déjà utilisé")
        
        # Vérifier si le username existe déjà
        existing_username = db.query(User).filter(User.username == data.username).first()
        if existing_username:
            raise HTTPException(status_code=400, detail="Nom d'utilisateur déjà utilisé")

        # Créer le nouvel utilisateur
        user = User(
            username=data.username,
            email=data.email,
            hashed_password=hash_password(data.password)
        )

        db.add(user)
        db.commit()
        db.refresh(user)

        return {"message": "Compte créé avec succès", "user_id": user.id}
    
    except IntegrityError as e:
        db.rollback()
        raise HTTPException(status_code=400, detail="Erreur: Email ou nom d'utilisateur déjà utilisé")
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Erreur de base de données: {str(e)}")
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Erreur lors de l'inscription: {str(e)}")


@router.post("/login")
def login(data: LoginRequest, db: Session = Depends(get_db)):
    try:
        user = db.query(User).filter(User.email == data.email).first()

        if not user:
            raise HTTPException(status_code=401, detail="Identifiants invalides")

        if not verify_password(data.password, user.hashed_password):
            raise HTTPException(status_code=401, detail="Identifiants invalides")

        token = create_access_token({
            "sub": user.email,
            "user_id": user.id
        })

        return {
            "access_token": token,
            "token_type": "bearer",
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email
            }
        }
    
    except HTTPException:
        raise
    except SQLAlchemyError as e:
        raise HTTPException(status_code=500, detail=f"Erreur de base de données: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur lors de la connexion: {str(e)}")
