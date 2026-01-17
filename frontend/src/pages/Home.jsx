import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ScanLine,
  Camera,
  Activity,
  BarChart2,
  Zap,
  ChevronRight,
  CheckCircle2,
  Smile,
  Sparkles,
  ArrowRight
} from 'lucide-react';

/* ================= ANIMATIONS ================= */
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 80, damping: 20 }
  }
};

export default function Home() {
  const features = [
    {
      icon: <Camera className="w-6 h-6 text-indigo-400" />,
      title: 'Analyse en Temps Réel',
      description: 'Détection instantanée des émotions via votre caméra avec une latence minimale'
    },
    {
      icon: <BarChart2 className="w-6 h-6 text-emerald-400" />,
      title: 'Analyses Approfondies',
      description: 'Visualisations claires et rapports détaillés de vos tendances émotionnelles'
    },
    {
      icon: <Activity className="w-6 h-6 text-amber-400" />,
      title: 'IA de Pointe',
      description: 'Modèle MobileNetV2 optimisé pour une précision maximale'
    },
    {
      icon: <Zap className="w-6 h-6 text-purple-400" />,
      title: 'Rapide & Efficace',
      description: 'Résultats en moins d’une seconde avec une interface fluide'
    },
    {
      icon: <Smile className="w-6 h-6 text-pink-400" />,
      title: '7+ Émotions',
      description: 'Détection précise d’une large gamme d’expressions faciales'
    },
    {
      icon: <Sparkles className="w-6 h-6 text-cyan-400" />,
      title: 'Interface Moderne',
      description: 'Design épuré et expérience utilisateur intuitive'
    }
  ];

  const steps = [
    'Sélectionnez la caméra ou téléchargez une image',
    'L’IA analyse les expressions faciales',
    'Visualisez les résultats détaillés'
  ];

  const stats = [
    { value: '99.7%', label: 'Précision moyenne', icon: <CheckCircle2 className="w-6 h-6 text-indigo-400" /> },
    { value: '<1s', label: 'Temps d’analyse', icon: <Zap className="w-6 h-6 text-emerald-400" /> },
    { value: '7+', label: 'Émotions détectées', icon: <Smile className="w-6 h-6 text-amber-400" /> },
    { value: '∞', label: 'Analyses', icon: <Activity className="w-6 h-6 text-pink-400" /> }
  ];

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="pb-24 space-y-24">

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden pt-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.15),transparent_60%)]" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-300" />

        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <motion.div variants={item} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 text-indigo-300 mb-6">
            <Sparkles className="w-4 h-4" /> IA émotionnelle nouvelle génération
          </motion.div>

          <motion.h1 variants={item} className="text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] bg-gradient-to-r from-white via-indigo-200 to-cyan-400 bg-clip-text text-transparent mb-6">
            Décryptez les émotions<br />avec précision
          </motion.h1>

          <motion.p variants={item} className="text-xl text-gray-400 max-w-3xl mx-auto mb-10">
            Analyse faciale avancée basée sur l’IA pour comprendre les émotions humaines en temps réel.
          </motion.p>

          <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/scan" className="group relative px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-medium overflow-hidden">
              <span className="relative z-10 flex items-center gap-2">
                <Camera className="w-5 h-5" /> Essayer maintenant
              </span>
              <span className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.2),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>

            <Link to="/about" className="px-8 py-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white flex items-center justify-center gap-2">
              Découvrir plus <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03, rotateX: 2, rotateY: -2 }}
              className="relative bg-gradient-to-br from-slate-800/60 to-slate-900/80 border border-white/5 rounded-2xl p-6 shadow-xl"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 opacity-0 hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-4">
                  {f.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-gray-400">{f.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="relative max-w-6xl mx-auto px-6">
        <div className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-indigo-500/40 to-cyan-500/40" />
        <div className="space-y-8">
          {steps.map((step, i) => (
            <motion.div key={i} variants={item} className="flex items-start gap-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                {i + 1}
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white">Étape {i + 1}</h4>
                <p className="text-gray-400">{step}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div key={i} variants={item} className="bg-gradient-to-br from-slate-800/60 to-slate-900/80 border border-white/5 rounded-2xl p-6 shadow-xl">
              <div className="mb-4">{s.icon}</div>
              <div className="text-3xl font-bold text-white">{s.value}</div>
              <div className="text-gray-400 text-sm">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="text-center">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-6">
          Prêt à commencer ?
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto mb-8">
          Testez gratuitement notre analyse émotionnelle basée sur l’IA.
        </p>
        <Link to="/scan" className="inline-flex items-center gap-2 px-10 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-medium">
          <Camera className="w-5 h-5" /> Essayer gratuitement
        </Link>
      </section>
    </motion.div>
  );
}
