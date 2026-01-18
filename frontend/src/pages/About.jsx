import Card from "../components/Card";
import { Code, Cpu, Layers, Database, Github, Info, Linkedin, Smartphone, Sparkles, Brain, Target, Heart } from "lucide-react";

const techStack = [
  { name: "React", desc: "Interface utilisateur réactive", icon: Code },
  { name: "FastAPI", desc: "API performante", icon: Cpu },
  { name: "TensorFlow/Keras", desc: "Deep learning", icon: Brain },
  { name: "CNN", desc: "Modèle convolutif", icon: Layers },
];

const features = [
  { title: "Analyse en temps réel", desc: "Détection via caméra", icon: Smartphone },
  { title: "Précision élevée", desc: "Large gamme d'émotions", icon: Sparkles },
  { title: "Historique", desc: "Suivi des analyses", icon: Database },
];

export default function About() {
  return (
    <div className="min-h-screen bg-[#fafbfc] pt-16 pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0f62fe] text-white mb-8">
            <Info className="h-7 w-7" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            À propos d'<span className="text-[#0f62fe]">Emotion AI</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Reconnaissance d'émotions par IA pour analyser les expressions faciales en temps réel.
          </p>
        </div>

        {/* Features */}
        <Card className="mb-12">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map(({ title, desc, icon: Icon }) => (
              <div key={title} className="p-6 rounded-2xl bg-slate-50/80 border border-slate-100 hover:border-slate-200 transition-all">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#e8f0fe] text-[#0f62fe] mb-4">
                  <Icon className="h-6 w-6" strokeWidth={2} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
                <p className="text-slate-600 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Tech */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Stack technique</h2>
            <p className="text-slate-600">Technologies utilisées</p>
          </div>
          <Card>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {techStack.map(({ name, desc, icon: Icon }) => (
                <div key={name} className="p-6 rounded-2xl bg-slate-50/80 border border-slate-100 text-center hover:border-slate-200 transition-all">
                  <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-xl bg-[#e8f0fe] text-[#0f62fe] mb-4">
                    <Icon className="h-6 w-6" strokeWidth={2} />
                  </div>
                  <h4 className="font-bold text-slate-900 mb-2">{name}</h4>
                  <p className="text-slate-600 text-sm">{desc}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Mission & Contribuer */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card title="Mission" icon={Target}>
            <p className="text-slate-600 mb-4 leading-relaxed">
              Rendre l'analyse des émotions accessible avec un outil précis et simple.
            </p>
            <p className="text-slate-600 mb-4 leading-relaxed">
              Projet conçu avec les dernières technologies IA et une attention à l'UX.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <Heart className="h-5 w-5 text-red-500" />
              <span className="font-medium text-slate-700">Développé avec passion</span>
            </div>
          </Card>

          <Card title="Contribuer" icon={Github}>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Projet open source. N'hésitez pas à contribuer.
            </p>
            <a
              href="https://github.com/AyoubFaradi/emotion_ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-200 bg-white font-semibold text-slate-800 hover:bg-slate-50 hover:border-slate-300 transition-all"
            >
              <Github className="h-5 w-5" /> Voir sur GitHub
            </a>
          </Card>
        </div>

        {/* Dev */}
        <Card>
          <div className="flex flex-col items-center text-center py-8">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#0f62fe] text-3xl font-bold text-white mb-6">
              AF
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Ayoub Faradi</h3>
            <p className="text-slate-600 font-semibold mb-6">Développeur Full Stack & IA</p>
            <p className="text-slate-600 max-w-2xl mb-8 leading-relaxed">
              Créateur de l'application. Conception du frontend, backend et modèle IA (TensorFlow/Keras).
            </p>
            <div className="flex gap-3">
              <a
                href="https://github.com/AyoubFaradi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-200 font-semibold text-slate-800 hover:bg-slate-50 transition-all"
              >
                <Github className="h-5 w-5" /> GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/ayoub-faradi/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-[#0f62fe]/30 bg-[#e8f0fe] font-semibold text-[#0f62fe] hover:bg-[#e0eafe] transition-all"
              >
                <Linkedin className="h-5 w-5" /> LinkedIn
              </a>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
