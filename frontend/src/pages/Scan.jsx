import Webcam from "react-webcam";
import { useRef, useState } from "react";
import Card from "../components/Card";
import { predictEmotion, analyzeFace } from "../api/api";

export default function Scan() {
  const webcamRef = useRef(null);

  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);

  const videoConstraints = {
    width: 640,
    height: 480,
    facingMode: "user",
  };

  const captureFromCamera = async () => {
  if (!webcamRef.current) {
    throw new Error("Caméra non prête");
  }

  const imageSrc = webcamRef.current.getScreenshot();
  if (!imageSrc) {
    throw new Error("Impossible de capturer l’image");
  }

  const res = await fetch(imageSrc);
  const blob = await res.blob();
  return new File([blob], "camera.jpg", { type: "image/jpeg" });
};


  const sendToAPI = async (imageFile, useAuth = true) => {
    const formData = new FormData();
    formData.append("file", imageFile);

    // Utiliser /predict pour sauvegarder en DB (nécessite auth)
    // Si pas de token, utiliser /analyze-face qui sauvegarde aussi si token présent
    const token = localStorage.getItem("token");
    if (token && useAuth) {
      // Utiliser /predict pour garantir la sauvegarde
      const res = await predictEmotion(formData);
      setResult(res.data);
    } else {
      // Utiliser /analyze-face (sauvegarde si token présent)
      const res = await analyzeFace(formData);
      setResult(res.data);
    }
  };

  const handleCameraPredict = async () => {
    let image = null;
    try {
      setLoading(true);
      image = await captureFromCamera();
      // Sauvegarder en DB si utilisateur connecté
      await sendToAPI(image, true);
    } catch (err) {
      console.error(err);
      // Si erreur 401 et image capturée, essayer sans auth (mais ne sauvegardera pas)
      if (err.response?.status === 401 && image) {
        try {
          await sendToAPI(image, false);
        } catch (err2) {
          alert(err2.message || "Erreur lors de l'analyse");
        }
      } else {
        alert(err.message || "Erreur lors de l'analyse");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFilePredict = async () => {
    if (!file) return alert("Choisir une image");

    try {
      setLoading(true);
      // Utiliser /predict (avec authentification et sauvegarde)
      await sendToAPI(file, true);
    } catch (err) {
      console.error(err);
      // Si erreur 401, essayer sans auth (mais ne sauvegardera pas)
      if (err.response?.status === 401) {
        try {
          await sendToAPI(file, false);
        } catch (err2) {
          alert("Erreur analyse fichier: " + (err2.message || "Erreur inconnue"));
        }
      } else {
        alert("Erreur analyse fichier: " + (err.message || "Erreur inconnue"));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-[35px] min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-white mb-3">Analyse d'Émotions</h1>
        <p className="text-center text-gray-300 mb-10">Détectez les émotions en temps réel ou à partir d'images</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Camera Card */}
          <Card title="Caméra" className="h-full bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 shadow-2xl">
            <div className="relative aspect-video bg-gray-900/50 rounded-lg overflow-hidden mb-4 border-2 border-gray-700/50">
              <Webcam
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                mirrored
                videoConstraints={videoConstraints}
                className="w-full h-full object-cover"
                onUserMedia={() => setCameraReady(true)}
                onUserMediaError={() => alert("Veuillez autoriser l'accès à la caméra")}
              />
              {!cameraReady && (
                <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                  <div className="text-center p-4">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                    <p className="text-gray-600">Chargement de la caméra...</p>
                  </div>
                </div>
              )}
            </div>

            <button
              disabled={!cameraReady || loading}
              onClick={handleCameraPredict}
              className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
                !cameraReady || loading
                  ? 'bg-gray-700/50 text-gray-500 cursor-not-allowed border border-gray-600/50'
                  : 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 hover:shadow-blue-500/20'
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                  Analyse en cours...
                </span>
              ) : (
                'Détecter l\'émotion'
              )}
            </button>
          </Card>

          {/* File Upload Card */}
          <Card title=" Téléverser une image" className="h-full bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 shadow-2xl">
            <div className={`border-2 border-dashed rounded-lg p-8 text-center mb-4 transition-all duration-300 ${
              file ? 'border-green-400/50 bg-green-900/20' : 'border-gray-600/50 hover:border-blue-400/50 bg-gray-900/30 hover:bg-gray-900/40'
            }`}>
              <div className="flex flex-col items-center justify-center space-y-3">
                <div className="p-3 rounded-full bg-blue-900/20 text-blue-500 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <p className="text-sm text-gray-300 mb-1">
                  Glissez et déposez votre image ici
                </p>
                <p className="text-xs text-gray-400 mb-4">
                  ou cliquez pour parcourir vos fichiers
                </p>
                <input
                  type="file"
                  id="file-upload"
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="hidden"
                />
                <label
                  htmlFor="file-upload"
                  className="px-4 py-2 bg-gray-700/50 border border-gray-600/50 text-gray-200 rounded-md text-sm font-medium cursor-pointer hover:bg-gray-700 transition-all duration-200 hover:border-blue-400/50"
                >
                  Choisir un fichier
                </label>
                {file && (
                  <div className="mt-2 text-sm text-green-400 flex items-center bg-green-900/30 px-3 py-1.5 rounded-full border border-green-800/50">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="max-w-[180px] truncate">{file.name}</span>
                  </div>
                )}
              </div>
            </div>

            <button
              disabled={!file || loading}
              onClick={handleFilePredict}
              className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
                !file || loading
                  ? 'bg-gray-700/50 text-gray-500 cursor-not-allowed border border-gray-600/50'
                  : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 hover:shadow-green-500/20'
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                  Analyse en cours...
                </span>
              ) : (
                'Analyser l\'image'
              )}
            </button>
          </Card>
        </div>

        {/* Results Card */}
<div className="mt-12">
  <Card 
    title="Analyse Results" 
    className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
  >
    {result ? (
      <div className="space-y-8">
        {/* Main Results */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Emotion */}
          <div className="p-6 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Detected Emotion</p>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">
                  {result.emotion.charAt(0).toUpperCase() + result.emotion.slice(1)}
                </h3>
              </div>
              <div className="text-3xl">
                {result.emotion === 'happy' ? '😊' : 
                 result.emotion === 'sad' ? '😢' :
                 result.emotion === 'angry' ? '😠' :
                 result.emotion === 'neutral' ? '😐' : '🤔'}
              </div>
            </div>
          </div>

          {/* Confidence */}
          <div className="p-6 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Confidence Level</p>
            <div className="flex items-center space-x-4">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {result.confidence}%
              </div>
              <div className="flex-1">
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div 
                    className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full" 
                    style={{ width: `${result.confidence}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Analysis Details */}
<div className="mt-6 p-6 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Analysis Details</h3>
  <div className="grid grid-cols-2 gap-4">
    {[
      { label: 'Model Version', value: 'v2.1', color: 'text-yellow-600' },
      { label: 'Last Updated', value: 'Today', color: 'text-gray-600' }
    ].map((item, index) => (
      <div key={index} className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <p className={`text-2xl font-semibold ${item.color} mb-1`}>{item.value}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{item.label}</p>
      </div>
    ))}
  </div>
</div>
      </div>
    ) : (
      <div className="text-center py-12">
        <div className="mx-auto w-20 h-20 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-4">
          <svg className="w-10 h-10 text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Analysis Results</h3>
        <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
          Capture an image or upload a photo to analyze emotions
        </p>
      </div>
    )}
  </Card>
</div>
      </div>
    </div>
  );
}
