import Webcam from "react-webcam";
import { useRef, useState } from "react";
import Card from "../components/Card";
import { predictEmotion, analyzeFace } from "../api/api";
import { Camera, Upload, Loader2, TrendingUp, CheckCircle2, AlertCircle, Smile } from "lucide-react";

const emotionEmojis = { happy: '😊', sad: '😢', angry: '😠', neutral: '😐', surprise: '😲', disgust: '🤢', fear: '😨' };
const emotionBg = {
  happy: 'bg-amber-50 border-amber-200',
  sad: 'bg-sky-50 border-sky-200',
  angry: 'bg-red-50 border-red-200',
  neutral: 'bg-slate-100 border-slate-200',
  surprise: 'bg-violet-50 border-violet-200',
  disgust: 'bg-emerald-50 border-emerald-200',
  fear: 'bg-orange-50 border-orange-200',
};

export default function Scan() {
  const webcamRef = useRef(null);
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);
  const [preview, setPreview] = useState(null);

  const videoConstraints = { width: 640, height: 480, facingMode: "user" };

  const captureFromCamera = async () => {
    if (!webcamRef.current) throw new Error("Caméra non prête");
    const src = webcamRef.current.getScreenshot();
    if (!src) throw new Error("Impossible de capturer");
    const res = await fetch(src);
    const blob = await res.blob();
    return new File([blob], "camera.jpg", { type: "image/jpeg" });
  };

  const sendToAPI = async (imageFile, useAuth = true) => {
    const fd = new FormData();
    fd.append("file", imageFile);
    const token = localStorage.getItem("token");
    if (token && useAuth) {
      const res = await predictEmotion(fd);
      setResult(res.data);
    } else {
      const res = await analyzeFace(fd);
      setResult(res.data);
    }
  };

  const handleCameraPredict = async () => {
    let img = null;
    try {
      setLoading(true);
      setResult(null);
      img = await captureFromCamera();
      setPreview(webcamRef.current.getScreenshot());
      await sendToAPI(img, true);
    } catch (e) {
      if (e.response?.status === 401 && img) {
        try { await sendToAPI(img, false); } catch (e2) { alert(e2.message || "Erreur"); }
      } else { alert(e.message || "Erreur"); }
    } finally {
      setLoading(false);
    }
  };

  const handleFilePredict = async () => {
    if (!file) return alert("Choisir une image");
    try {
      setLoading(true);
      setResult(null);
      const r = new FileReader();
      r.onload = (e) => setPreview(e.target.result);
      r.readAsDataURL(file);
      await sendToAPI(file, true);
    } catch (e) {
      if (e.response?.status === 401) {
        try { await sendToAPI(file, false); } catch (e2) { alert("Erreur"); }
      } else { alert("Erreur"); }
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (f) {
      setFile(f);
      setResult(null);
      const r = new FileReader();
      r.onload = (ev) => setPreview(ev.target.result);
      r.readAsDataURL(f);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafbfc] pt-16 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#e8f0fe] text-[#0f62fe] text-sm font-semibold mb-6">
            <Camera className="h-4 w-4" /> Détection IA
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Analyse d'<span className="text-[#0f62fe]">émotions</span>
          </h1>
          <p className="text-slate-600 max-w-xl mx-auto">Temps réel ou upload d'image.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <Card title="Caméra en direct" icon={Camera}>
            <div className="relative aspect-video bg-slate-900 rounded-2xl overflow-hidden mb-6 border border-slate-200">
              <Webcam
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                mirrored
                videoConstraints={videoConstraints}
                className="w-full h-full object-cover"
                onUserMedia={() => setCameraReady(true)}
                onUserMediaError={() => alert("Autorisez l'accès à la caméra")}
              />
              {!cameraReady && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-100">
                  <div className="text-center">
                    <Loader2 className="h-12 w-12 animate-spin text-[#0f62fe] mx-auto mb-3" />
                    <p className="text-slate-600 font-medium">Chargement...</p>
                  </div>
                </div>
              )}
            </div>
            <button
              disabled={!cameraReady || loading}
              onClick={handleCameraPredict}
              className={`w-full py-4 rounded-2xl font-semibold transition-all ${
                !cameraReady || loading
                  ? "bg-slate-200 text-slate-500 cursor-not-allowed"
                  : "bg-[#0f62fe] text-white hover:bg-[#0043ce]"
              }`}
            >
              {loading ? <span className="flex items-center justify-center gap-2"><Loader2 className="h-5 w-5 animate-spin" /> Analyse...</span> : "Détecter l'émotion"}
            </button>
          </Card>

          <Card title="Téléverser une image" icon={Upload}>
            <div
              className={`rounded-2xl border-2 border-dashed p-12 text-center mb-6 cursor-pointer transition-all ${
                file ? "border-emerald-400 bg-emerald-50/50" : "border-slate-300 bg-slate-50/50 hover:border-[#0f62fe]/50 hover:bg-[#e8f0fe]/30"
              }`}
              onClick={() => document.getElementById("file-upload").click()}
            >
              <Upload className={`h-12 w-12 mx-auto mb-4 ${file ? "text-emerald-600" : "text-[#0f62fe]"}`} />
              <p className="font-semibold text-slate-900 mb-1">{file ? "Fichier sélectionné" : "Glissez ou cliquez"}</p>
              <p className="text-sm text-slate-500">PNG, JPG</p>
              <input type="file" id="file-upload" accept="image/*" onChange={handleFileChange} className="hidden" />
              {file && (
                <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-100 text-emerald-800 text-sm font-medium">
                  <CheckCircle2 className="h-4 w-4" /> {file.name}
                </div>
              )}
            </div>
            <button
              disabled={!file || loading}
              onClick={handleFilePredict}
              className={`w-full py-4 rounded-2xl font-semibold transition-all ${
                !file || loading ? "bg-slate-200 text-slate-500 cursor-not-allowed" : "bg-[#0f62fe] text-white hover:bg-[#0043ce]"
              }`}
            >
              {loading ? <span className="flex items-center justify-center gap-2"><Loader2 className="h-5 w-5 animate-spin" /> Analyse...</span> : "Analyser l'image"}
            </button>
          </Card>
        </div>

        {result && (
          <Card title="Résultats" icon={TrendingUp}>
            <div className="grid lg:grid-cols-2 gap-8">
              {preview && (
                <div className="rounded-2xl overflow-hidden border border-slate-200">
                  <img src={preview} alt="Analyzed" className="w-full h-64 object-cover" />
                  <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center gap-2">
                    <Smile className="h-5 w-5 text-[#0f62fe]" />
                    <span className="font-medium text-slate-700">Image analysée</span>
                  </div>
                </div>
              )}
              <div className="space-y-6">
                <div className={`rounded-2xl border-2 p-8 ${emotionBg[result.emotion] || "bg-[#e8f0fe] border-[#0f62fe]/30"}`}>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Émotion</p>
                  <div className="flex items-center gap-4">
                    <span className="text-5xl">{emotionEmojis[result.emotion] || "😐"}</span>
                    <span className="text-2xl font-bold text-slate-900 capitalize">{result.emotion}</span>
                  </div>
                </div>
                <div className="rounded-2xl border border-slate-200 p-6 bg-white">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-semibold text-slate-700">Confiance</span>
                    <span className="text-2xl font-bold text-[#0f62fe]">{typeof result.confidence === "number" ? result.confidence.toFixed(1) : result.confidence}%</span>
                  </div>
                  <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-[#0f62fe] rounded-full transition-all duration-500" style={{ width: `${result.confidence}%` }} />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}

        {!result && !loading && (
          <div className="text-center py-16">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-[#e8f0fe] text-[#0f62fe] mb-4">
              <AlertCircle className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Aucune analyse</h3>
            <p className="text-slate-600">Capturez ou téléversez une image pour commencer.</p>
          </div>
        )}
      </div>
    </div>
  );
}
