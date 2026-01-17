FROM python:3.11-slim

# Définir les variables d'environnement
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1

WORKDIR /app

# Dépendances système nécessaires pour OpenCV et TensorFlow
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    libgl1 \
    libglib2.0-0 \
    libsm6 \
    libxext6 \
    libxrender-dev \
    libgomp1 \
    && rm -rf /var/lib/apt/lists/*

# Upgrade pip
RUN pip install --upgrade pip setuptools wheel

# Copier requirements en premier pour optimiser le cache Docker
COPY requirements.txt .

# Installer dépendances Python
RUN pip install \
    --no-cache-dir \
    --timeout 300 \
    --retries 10 \
    -r requirements.txt

# Copier le code de l'application
COPY app ./app

# Créer le répertoire uploads s'il n'existe pas
RUN mkdir -p /app/app/uploads

# Exposer le port
EXPOSE 8000

# Commande de démarrage
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
