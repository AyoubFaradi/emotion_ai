import { Link } from 'react-router-dom';
import {
  Camera,
  BarChart3,
  Zap,
  CheckCircle2,
  Smile,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Brain,
} from 'lucide-react';

export default function Home() {
  const features = [
    { icon: Camera, title: 'Analyse en temps réel', desc: 'Détection instantanée des émotions via votre caméra.' },
    { icon: BarChart3, title: 'Analyses approfondies', desc: 'Visualisations et rapports détaillés de vos tendances.' },
    { icon: Brain, title: 'IA de pointe', desc: 'Modèle CNN optimisé pour une précision maximale.' },
    { icon: Zap, title: 'Rapide & efficace', desc: 'Résultats en moins d\'une seconde.' },
    { icon: Smile, title: '7+ émotions', desc: 'Détection d\'une large gamme d\'expressions faciales.' },
    { icon: Sparkles, title: 'Interface moderne', desc: 'Design épuré et expérience intuitive.' },
  ];

  const steps = [
    { num: '1', title: 'Capture', desc: 'Caméra ou image', icon: Camera },
    { num: '2', title: 'Analyse IA', desc: 'Traitement des expressions', icon: Brain },
    { num: '3', title: 'Résultats', desc: 'Émotion et confiance', icon: TrendingUp },
  ];

  const stats = [
    { value: '99.7%', label: 'Précision', icon: CheckCircle2 },
    { value: '<1s', label: 'Temps', icon: Zap },
    { value: '7+', label: 'Émotions', icon: Smile },
    { value: '∞', label: 'Analyses', icon: Sparkles },
  ];

  return (
    <div className="min-h-screen bg-[#fafbfc] pt-16">
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 md:pt-24 pb-20">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#e8f0fe] text-[#0f62fe] text-sm font-semibold mb-8">
            <Sparkles className="h-4 w-4" /> IA émotionnelle
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-6 text-balance">
            Décryptez les émotions
            <br />
            <span className="text-[#0f62fe]">avec précision</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Analyse faciale par IA pour comprendre les émotions en temps réel. Technologie de pointe, résultats instantanés.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/scan"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-[#0f62fe] text-white font-semibold shadow-sm hover:bg-[#0043ce] transition-all"
            >
              <Camera className="h-5 w-5" /> Essayer maintenant
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center justify-center px-8 py-4 rounded-2xl border border-slate-300 text-slate-700 font-semibold hover:bg-white hover:border-slate-400 transition-all"
            >
              En savoir plus
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map(({ value, label, icon: Icon }) => (
            <div
              key={label}
              className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] hover:border-slate-200 transition-all"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e8f0fe] text-[#0f62fe] mb-4">
                <Icon className="h-5 w-5" strokeWidth={2} />
              </div>
              <p className="text-2xl md:text-3xl font-bold text-slate-900">{value}</p>
              <p className="text-sm font-medium text-slate-500">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Fonctionnalités</h2>
          <p className="text-slate-600">Tout pour analyser les émotions</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] hover:border-slate-200 transition-all"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#e8f0fe] text-[#0f62fe] mb-5">
                <Icon className="h-6 w-6" strokeWidth={2} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Comment ça marche</h2>
          <p className="text-slate-600">En 3 étapes</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map(({ num, title, desc, icon: Icon }) => (
            <div
              key={num}
              className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] text-center"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0f62fe] text-white text-lg font-bold mb-6">
                {num}
              </div>
              <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-xl bg-[#e8f0fe] text-[#0f62fe] mb-4">
                <Icon className="h-6 w-6" strokeWidth={2} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
              <p className="text-slate-600 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-24">
        <div className="rounded-3xl bg-[#e8f0fe] border border-[#0f62fe]/20 p-12 md:p-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Prêt à commencer ?</h2>
          <p className="text-slate-600 mb-8 max-w-xl mx-auto">
            Testez gratuitement l’analyse émotionnelle par IA.
          </p>
          <Link
            to="/scan"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-2xl bg-[#0f62fe] text-white font-semibold hover:bg-[#0043ce] transition-all"
          >
            <Camera className="h-5 w-5" /> Essayer gratuitement
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
