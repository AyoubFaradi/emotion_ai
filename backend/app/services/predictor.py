import os
import cv2
import numpy as np
from tensorflow.keras.models import load_model
from PIL import Image
import io
import warnings

# Dans Docker, le volume est monté à /models
# Le modèle se trouve dans /models/emotion_model.h5
if os.path.exists("/models/emotion_model.h5"):
    MODEL_PATH = "/models/emotion_model.h5"
elif os.path.exists("/models/face_emotion/emotion_model.h5"):
    MODEL_PATH = "/models/face_emotion/emotion_model.h5"
else:
    # Développement local
    PROJECT_ROOT = os.path.abspath(
        os.path.join(os.path.dirname(__file__), "..", "..", "..")
    )
    local_path = os.path.join(PROJECT_ROOT, "models", "emotion_model.h5")
    if os.path.exists(local_path):
        MODEL_PATH = local_path
    else:
        MODEL_PATH = os.path.join(PROJECT_ROOT, "models", "face_emotion", "emotion_model.h5")

print(f"MODEL_PATH configuré : {MODEL_PATH}")

# Variable globale pour le modèle (chargé de manière lazy)
_model = None

# Ordre des classes (DOIT correspondre à l'entraînement)
EMOTIONS = ['angry', 'disgust', 'fear', 'happy', 'sad', 'surprise', 'neutral']

# Taille d'image attendue par le modèle : 64x64 en niveaux de gris
IMG_SIZE = 64


def get_model():
    """Charge le modèle de manière lazy (lors de la première utilisation)"""
    global _model, MODEL_PATH
    
    # Vérifier que le modèle existe maintenant
    if not os.path.exists(MODEL_PATH):
        # Essayer de trouver le modèle à un autre emplacement
        possible_paths = [
            "/models/emotion_model.h5",
            "/models/face_emotion/emotion_model.h5",
        ]
        # Ajouter aussi les chemins locaux
        PROJECT_ROOT = os.path.abspath(
            os.path.join(os.path.dirname(__file__), "..", "..", "..")
        )
        possible_paths.extend([
            os.path.join(PROJECT_ROOT, "models", "emotion_model.h5"),
            os.path.join(PROJECT_ROOT, "models", "face_emotion", "emotion_model.h5"),
        ])
        
        for path in possible_paths:
            if os.path.exists(path):
                MODEL_PATH = path
                print(f"Modèle trouvé à : {MODEL_PATH}")
                break
        else:
            raise FileNotFoundError(f"Modèle introuvable. Chemins testés : {possible_paths}")
    
    if _model is None:
        warnings.filterwarnings('ignore')
        
        # Essayer différentes méthodes de chargement
        loading_methods = [
            lambda: load_model(MODEL_PATH, compile=False, safe_mode=False),
            lambda: load_model(MODEL_PATH, compile=False),
            lambda: load_model(MODEL_PATH, compile=True),
        ]
        
        for i, load_method in enumerate(loading_methods, 1):
            try:
                _model = load_method()
                print(f"✓ Modèle chargé avec succès (méthode {i}) depuis: {MODEL_PATH}")
                break
            except Exception as e:
                if i == len(loading_methods):
                    raise RuntimeError(f"Impossible de charger le modèle depuis {MODEL_PATH}\nErreur: {e}")
                continue
    
    return _model


def preprocess_image(image_path: str):
    """Prétraite l'image pour le modèle : conversion en niveaux de gris et redimensionnement à 64x64"""
    img = cv2.imread(image_path)
    if img is None:
        raise ValueError("Impossible de lire l'image")

    # Convertir en niveaux de gris (1 canal)
    img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    # Redimensionner à 64x64 (taille attendue par le modèle)
    img = cv2.resize(img, (IMG_SIZE, IMG_SIZE))
    
    # Normaliser les valeurs entre 0 et 1
    img = img / 255.0
    
    # Ajouter les dimensions batch et channel : (1, 64, 64, 1)
    img = np.expand_dims(img, axis=0)  # Ajoute dimension batch
    img = np.expand_dims(img, axis=-1)  # Ajoute dimension channel
    
    return img


def predict_emotion(image_bytes: bytes):
    """
    Prédit l'émotion à partir d'image bytes (depuis caméra ou upload)
    
    Args:
        image_bytes: Bytes de l'image
        
    Returns:
        dict: {"emotion": str, "confidence": float}
    """
    model = get_model()
    
    # Ouvrir l'image avec PIL et convertir en niveaux de gris
    image = Image.open(io.BytesIO(image_bytes)).convert("L")
    
    # Redimensionner à 64x64 (taille attendue par le modèle)
    image = image.resize((IMG_SIZE, IMG_SIZE))
    
    # Convertir en numpy array et normaliser
    img_array = np.array(image) / 255.0
    
    # Reshaper pour le modèle : (1, 64, 64, 1)
    img_array = np.reshape(img_array, (1, IMG_SIZE, IMG_SIZE, 1))
    
    # Prédiction
    preds = model.predict(img_array, verbose=0)[0]
    
    # Trouver l'émotion avec la plus haute confiance
    emotion = EMOTIONS[np.argmax(preds)]
    confidence = float(np.max(preds)) * 100  # Convertir en pourcentage
    
    return {
        "emotion": emotion,
        "confidence": round(confidence, 2)
    }


def predict_emotion_from_path(image_path: str):
    """
    Prédit l'émotion à partir d'un chemin de fichier (compatibilité avec ancien code)
    
    Args:
        image_path: Chemin vers l'image
        
    Returns:
        dict: {"emotion": str, "confidence": float}
    """
    with open(image_path, 'rb') as f:
        image_bytes = f.read()
    return predict_emotion(image_bytes)
