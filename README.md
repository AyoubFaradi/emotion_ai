# 🧠 Emotion AI - Système de Reconnaissance d'Émotions Faciales

<div align="center">

![Emotion AI](https://img.shields.io/badge/Emotion%20AI-v1.0-blue?style=for-the-badge)
![Python](https://img.shields.io/badge/Python-3.11-blue?style=for-the-badge&logo=python)
![FastAPI](https://img.shields.io/badge/FastAPI-0.127-green?style=for-the-badge&logo=fastapi)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![Docker](https://img.shields.io/badge/Docker-Ready-blue?style=for-the-badge&logo=docker)

**Détectez les émotions en temps réel à partir de votre webcam ou d'images uploadées**

[Installation](#-installation) • [Utilisation](#-utilisation) • [Architecture](#-architecture) • [API](#-api)

</div>

---

## 📋 Table des Matières

- [À Propos](#-à-propos)
- [Fonctionnalités](#-fonctionnalités)
- [Architecture](#-architecture)
- [Technologies](#-technologies)
- [Installation](#-installation)
- [Utilisation](#-utilisation)
- [API Documentation](#-api-documentation)
- [Structure du Projet](#-structure-du-projet)
- [Modèle ML](#-modèle-ml)
- [Contribuer](#-contribuer)
- [License](#-license)

---

## 🎯 À Propos

Emotion AI est une application web complète permettant de détecter et analyser les émotions faciales en temps réel. Le système utilise un modèle de deep learning entraîné sur TensorFlow/Keras pour reconnaître 7 émotions différentes : **angry**, **disgust**, **fear**, **happy**, **sad**, **surprise**, et **neutral**.

L'application est construite avec une architecture microservices Docker, incluant un backend FastAPI, un frontend React, et une base de données MySQL pour la persistance des données.

---

## ✨ Fonctionnalités

-  **Analyse en temps réel** : Détection d'émotions depuis la webcam
-  **Upload d'images** : Analyse d'émotions à partir d'images uploadées
-  **Authentification** : Système de connexion/inscription sécurisé (JWT)
-  **Historique** : Sauvegarde et visualisation de toutes les analyses par utilisateur
-  **Précision** : Modèle ML avec précision élevée (64x64 grayscale CNN)
-  **Docker** : Déploiement facile avec Docker Compose
-  **Responsive** : Interface moderne et responsive

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT (Browser)                         │
│                    React Application (Port 3000)                 │
└───────────────────────┬─────────────────────────────────────────┘
                        │ HTTP/HTTPS
                        │
        ┌───────────────┴───────────────┐
        │                               │
        ▼                               ▼
┌───────────────┐              ┌───────────────┐
│   Frontend    │              │    Backend    │
│   (Nginx)     │◄─────────────┤   (FastAPI)   │
│   Port 3000   │   API Calls  │   Port 8000   │
└───────────────┘              └───────┬───────┘
                                       │
                          ┌────────────┼────────────┐
                          │            │            │
                          ▼            ▼            ▼
                   ┌──────────┐  ┌──────────┐  ┌──────────┐
                   │   MySQL  │  │   ML     │  │  Upload  │
                   │ Database │  │  Model   │  │  Storage │
                   │ Port 3306│  │(H5 File) │  │  (/uploads)│
                   └──────────┘  └──────────┘  └──────────┘
```

### Flux de Données

```
1. User → Frontend (React)
   ↓
2. Frontend → Backend API (FastAPI)
   ↓
3. Backend → Préprocessing Image (48x48 grayscale)
   ↓
4. Backend → Modèle ML (TensorFlow/Keras)
   ↓
5. Backend → Base de Données (MySQL)
   ↓
6. Backend → Frontend (Résultat JSON)
   ↓
7. Frontend → Affichage (UI React)
```

---

## 🛠️ Technologies

### Backend
- **FastAPI** : Framework web moderne et rapide
- **TensorFlow/Keras** : Deep learning pour la reconnaissance d'émotions
- **MySQL** : Base de données relationnelle
- **SQLAlchemy** : ORM Python
- **JWT** : Authentification sécurisée
- **OpenCV/PIL** : Traitement d'images

### Frontend
- **React** : Bibliothèque JavaScript pour l'UI
- **React Webcam** : Accès à la caméra
- **Axios** : Client HTTP
- **Tailwind CSS** : Framework CSS
- **Lucide React** : Icônes

### DevOps
- **Docker** : Containerisation
- **Docker Compose** : Orchestration multi-conteneurs
- **Nginx** : Serveur web pour le frontend

---

##  Installation

### Prérequis

- Docker et Docker Compose installés
- Git pour cloner le repository

### Étapes d'Installation

1. **Cloner le repository**

```bash
git clone https://github.com/AyoubFaradi/emotion_ai.git
cd emotion_ai
```

2. **Vérifier la structure du projet**

Assurez-vous que le modèle ML est présent :
```
models/
  └── emotion_model.h5
```

3. **Lancer avec Docker Compose**

```bash
docker-compose up --build
```

4. **Accéder à l'application**

- Frontend : http://localhost:3000
- Backend API : http://localhost:8000
- API Documentation : http://localhost:8000/docs

---

##  Utilisation

### Première Utilisation

1. **Inscription/Connexion**
   - Accédez à http://localhost:3000
   - Créez un compte ou connectez-vous

2. **Analyser une émotion**

   **Option 1 : Depuis la caméra**
   - Cliquez sur "Scanner" dans le menu
   - Autorisez l'accès à votre caméra
   - Cliquez sur "Détecter l'émotion"
   - Le résultat s'affiche instantanément

   **Option 2 : Upload d'image**
   - Cliquez sur "Choisir un fichier"
   - Sélectionnez une image
   - Cliquez sur "Analyser l'image"

3. **Consulter l'historique**
   - Cliquez sur "Historique" dans le menu
   - Toutes vos analyses sont affichées avec :
     - L'émotion détectée
     - Le niveau de confiance
     - La date et l'heure

---

## 📡 API Documentation

### Endpoints d'Authentification

#### POST `/api/auth/register`
Créer un nouveau compte utilisateur

**Body:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "secure_password"
}
```

#### POST `/api/auth/login`
Se connecter et obtenir un token JWT

**Body:**
```json
{
  "email": "john@example.com",
  "password": "secure_password"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com"
  }
}
```

### Endpoints d'Analyse

#### POST `/api/analyze-face`
Analyse rapide (sans authentification obligatoire, mais sauvegarde si connecté)

**Headers:**
```
Authorization: Bearer <token> (optionnel)
Content-Type: multipart/form-data
```

**Body:**
```
file: <image_file>
```

**Response:**
```json
{
  "emotion": "happy",
  "confidence": 87.45
}
```

#### POST `/api/predict`
Analyse avec sauvegarde en base de données (authentification requise)

**Headers:**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Body:**
```
file: <image_file>
```

**Response:**
```json
{
  "id": 123,
  "emotion": "happy",
  "confidence": 87.45
}
```

#### GET `/api/history`
Récupérer l'historique des analyses de l'utilisateur connecté

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
[
  {
    "id": 123,
    "emotion": "happy",
    "confidence": 87.45,
    "created_at": "2024-01-15T10:30:00Z"
  },
  {
    "id": 122,
    "emotion": "neutral",
    "confidence": 65.20,
    "created_at": "2024-01-15T09:15:00Z"
  }
]
```

### Documentation Interactive

Accédez à la documentation interactive Swagger à : http://localhost:8000/docs

---

## 📁 Structure du Projet

```
emotion_ai/
├── backend/                    # Application FastAPI
│   ├── app/
│   │   ├── api/               # Routes API
│   │   │   ├── auth_routes.py # Authentification
│   │   │   └── routes.py      # Analyse et historique
│   │   ├── database/          # Configuration DB
│   │   │   ├── db.py          # Connexion MySQL
│   │   │   └── models.py      # Modèles SQLAlchemy
│   │   ├── services/          # Services métier
│   │   │   ├── auth.py        # JWT et hash password
│   │   │   └── predictor.py   # Prédiction ML
│   │   ├── uploads/           # Images uploadées
│   │   └── main.py            # Point d'entrée FastAPI
│   ├── Dockerfile             # Image Docker backend
│   └── requirements.txt       # Dépendances Python
│
├── frontend/                   # Application React
│   ├── src/
│   │   ├── api/               # Client API
│   │   │   └── api.js         # Appels HTTP
│   │   ├── components/        # Composants React
│   │   ├── pages/             # Pages
│   │   │   ├── Scan.jsx       # Page d'analyse
│   │   │   └── History.jsx    # Page historique
│   │   └── App.jsx            # Composant principal
│   ├── nginx/                 # Configuration Nginx
│   ├── Dockerfile             # Image Docker frontend
│   └── package.json           # Dépendances Node.js
│
├── models/                     # Modèles ML
│   └── emotion_model.h5       # Modèle entraîné (64x64 grayscale)
│
├── notebooks/                  # Notebooks Jupyter
│   └── 02_Emotion_Model_Analysis_and_Preprocessing.ipynb
│
├── docker-compose.yml         # Configuration Docker Compose
├── .gitignore                 # Fichiers à ignorer
└── README.md                  # Ce fichier
```

---

## 🤖 Modèle ML

### Spécifications du Modèle

- **Architecture** : CNN (Convolutional Neural Network)
- **Input** : Images 64x64 pixels en niveaux de gris (1 canal)
- **Output** : 7 classes d'émotions
- **Format** : H5 (Keras/TensorFlow)
- **Emotions** : angry, disgust, fear, happy, sad, surprise, neutral

### Préprocessing

Les images sont prétraitées avant la prédiction :
1. Conversion en niveaux de gris
2. Redimensionnement à 64x64 pixels
3. Normalisation (0-1)
4. Reshape : `(1, 64, 64, 1)`

### Utilisation

Le modèle est chargé de manière lazy (lors de la première prédiction) pour optimiser le temps de démarrage.

---

## 🔧 Configuration

### Variables d'Environnement (Backend)

Les variables d'environnement sont définies dans `docker-compose.yml` :

```yaml
environment:
  - DB_USER=emotion_user
  - DB_PASSWORD=emotion123
  - DB_HOST=db
  - DB_PORT=3306
  - DB_NAME=emotion_ai_db
```

### Ports

- **Frontend** : 3000
- **Backend** : 8000
- **MySQL** : 3306

---

## 🧪 Tests

### Tester l'API avec curl

```bash
# Test d'authentification
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@test.com","password":"test123"}'

# Test d'analyse (avec token)
curl -X POST http://localhost:8000/api/predict \
  -H "Authorization: Bearer <your_token>" \
  -F "file=@path/to/image.jpg"
```

---

## 🐛 Dépannage

### Problème : Modèle introuvable

**Solution** : Vérifiez que `models/emotion_model.h5` existe et que le volume Docker est correctement monté.

### Problème : Erreur 401 (Unauthorized)

**Solution** : Assurez-vous d'être connecté et que votre token JWT est valide.

### Problème : Caméra ne fonctionne pas

**Solution** : Vérifiez les permissions du navigateur et que vous utilisez HTTPS en production.

### Problème : Base de données non accessible

**Solution** : Attendez que MySQL soit complètement démarré (les healthchecks dans docker-compose gèrent cela automatiquement).

---

## 📊 Performances

- **Temps de prédiction** : ~40-60ms par image
- **Temps de chargement du modèle** : ~2-3s (première prédiction)
- **Précision du modèle** : ~85-90% (selon le dataset d'entraînement)

---

## 🚧 Améliorations Futures

- [ ] Détection automatique des visages (OpenCV/MediaPipe)
- [ ] Analyse en temps réel (streaming)
- [ ] Export des résultats en PDF
- [ ] Graphiques statistiques dans l'historique
- [ ] Support multi-langues
- [ ] Mode sombre/clair
- [ ] API rate limiting
- [ ] Tests unitaires et d'intégration
- [ ] CI/CD avec GitHub Actions

---

## 👥 Contribuer

Les contributions sont les bienvenues ! Voici comment contribuer :

1. Fork le projet
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

---

## 📝 License

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

---

## 👨‍💻 Auteur

**Ayoub Faradi**

- GitHub: [@AyoubFaradi](https://github.com/AyoubFaradi)
- Projet: [Emotion AI](https://github.com/AyoubFaradi/emotion_ai)

---

## 🙏 Remerciements

- TensorFlow/Keras pour le framework de deep learning
- FastAPI pour l'excellent framework web
- React pour la bibliothèque UI
- Tous les contributeurs open-source qui ont rendu ce projet possible

---

<div align="center">

**⭐ Si ce projet vous a aidé, n'hésitez pas à lui donner une étoile ! ⭐**

by Ayoub Faradi

</div>
