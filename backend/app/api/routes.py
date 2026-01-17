import os
import shutil
import uuid
from fastapi import APIRouter, UploadFile, File, Depends, HTTPException, Header
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.database.models import EmotionAnalysis, User
from app.services.predictor import predict_emotion_from_path, predict_emotion
from app.services.auth import decode_token

router = APIRouter(tags=["Predict & History"])


# ======================
# AUTH JWT
# ======================
def get_current_user(
    authorization: str = Header(None),
    db: Session = Depends(get_db)
):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Token manquant")

    token = authorization.split(" ")[1]
    payload = decode_token(token)

    if not payload or "user_id" not in payload:
        raise HTTPException(status_code=401, detail="Token invalide ou expiré")

    user = db.query(User).filter(User.id == payload["user_id"]).first()
    if not user:
        raise HTTPException(status_code=401, detail="Utilisateur introuvable")

    return user


# ======================
# PREDICT
# ======================
@router.post("/analyze-face")
async def analyze_face(
    file: UploadFile = File(...),
    authorization: str = Header(None),
    db: Session = Depends(get_db)
):
    """
    Endpoint optimisé pour la caméra webcam en temps réel
    Analyse l'émotion depuis les bytes de l'image
    Sauvegarde en DB si l'utilisateur est connecté
    """
    try:
        image_bytes = await file.read()
        result = predict_emotion(image_bytes)
        
        # Si l'utilisateur est connecté, sauvegarder l'analyse
        if authorization and authorization.startswith("Bearer "):
            try:
                token = authorization.split(" ")[1]
                payload = decode_token(token)
                
                if payload and "user_id" in payload:
                    user = db.query(User).filter(User.id == payload["user_id"]).first()
                    if user:
                        # Sauvegarder l'image
                        upload_dir = os.path.join(os.path.dirname(__file__), "..", "uploads")
                        upload_dir = os.path.abspath(upload_dir)
                        os.makedirs(upload_dir, exist_ok=True)
                        
                        file_extension = os.path.splitext(file.filename)[1] if file.filename else ".jpg"
                        unique_filename = f"{uuid.uuid4()}{file_extension}"
                        file_path = os.path.join(upload_dir, unique_filename)
                        
                        with open(file_path, "wb") as buffer:
                            buffer.write(image_bytes)
                        
                        # Sauvegarder l'analyse en DB
                        analysis = EmotionAnalysis(
                            user_id=user.id,
                            image_path=file_path,
                            emotion=result["emotion"],
                            confidence=result["confidence"]
                        )
                        db.add(analysis)
                        db.commit()
            except Exception as e:
                # Si erreur de sauvegarde, continuer quand même
                db.rollback()
                print(f"Erreur lors de la sauvegarde: {e}")
        
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur lors de l'analyse: {str(e)}")


@router.post("/predict")
async def predict(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    try:
        # Lire les bytes de l'image directement (plus rapide pour la caméra)
        image_bytes = await file.read()
        
        # Prédire l'émotion directement depuis les bytes
        result = predict_emotion(image_bytes)
        
        # Sauvegarder l'image pour l'historique
        upload_dir = os.path.join(os.path.dirname(__file__), "..", "uploads")
        upload_dir = os.path.abspath(upload_dir)
        os.makedirs(upload_dir, exist_ok=True)
        
        file_extension = os.path.splitext(file.filename)[1] if file.filename else ".jpg"
        unique_filename = f"{uuid.uuid4()}{file_extension}"
        file_path = os.path.join(upload_dir, unique_filename)
        
        # Sauvegarder l'image
        with open(file_path, "wb") as buffer:
            buffer.write(image_bytes)

        analysis = EmotionAnalysis(
            user_id=current_user.id,
            image_path=file_path,
            emotion=result["emotion"],
            confidence=result["confidence"]
        )

        db.add(analysis)
        db.commit()
        db.refresh(analysis)

        return {
            "id": analysis.id,
            "emotion": analysis.emotion,
            "confidence": analysis.confidence
        }
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Erreur lors de la prédiction: {str(e)}")


# ======================
# HISTORY (PAR UTILISATEUR)
# ======================
@router.get("/history")
def history(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    try:
        data = (
            db.query(EmotionAnalysis)
            .filter(EmotionAnalysis.user_id == current_user.id)
            .order_by(EmotionAnalysis.created_at.desc())
            .all()
        )

        return [
            {
                "id": d.id,
                "emotion": d.emotion,
                "confidence": float(d.confidence) if d.confidence else 0.0,
                "created_at": d.created_at.isoformat() if d.created_at else None
            }
            for d in data
        ]
    except Exception as e:
        print(f"Erreur lors de la récupération de l'historique: {e}")
        raise HTTPException(status_code=500, detail=f"Erreur lors de la récupération de l'historique: {str(e)}")
