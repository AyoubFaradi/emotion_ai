import Card from "../components/Card";
import { Code, Cpu, CpuIcon, Database, Github, Info, Layers, Linkedin, Smartphone, Sparkles } from 'lucide-react';

export default function About() {
  const techStack = [
    {
      name: 'React',
      description: 'Interface utilisateur moderne et réactive',
      icon: <Code className="w-6 h-6 text-blue-400" />
    },
    {
      name: 'FastAPI',
      description: 'API performante pour le traitement des requêtes',
      icon: <Cpu className="w-6 h-6 text-green-400" />
    },
    {
      name: 'MobileNetV2',
      description: 'Modèle de deep learning pour la détection des émotions',
      icon: <Layers className="w-6 h-6 text-purple-400" />
    },
    {
      name: 'TensorFlow',
      description: 'Framework de machine learning pour les modèles de détection',
      icon: <CpuIcon className="w-6 h-6 text-orange-400" />
    }
  ];

  const features = [
    {
      title: 'Analyse en temps réel',
      description: 'Détection instantanée des émotions via votre caméra',
      icon: <Smartphone className="w-6 h-6 text-primary" />
    },
    {
      title: 'Précision élevée',
      description: 'Modèle entraîné pour reconnaître une large gamme d\'émotions',
      icon: <Sparkles className="w-6 h-6 text-yellow-400" />
    },
    {
      title: 'Historique complet',
      description: 'Suivez vos analyses et vos progrès dans le temps',
      icon: <Database className="w-6 h-6 text-blue-400" />
    }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="mt-[40px] text-4xl font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
          À propos d'Emotion AI
        </h1>
        <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
          Une solution avancée de reconnaissance d'émotions utilisant l'intelligence artificielle
          pour analyser et interpréter les expressions faciales en temps réel.
        </p>
      </div>

      {/* Features */}
      <Card>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="group p-6 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
              <div className="w-12 h-12 flex items-center justify-center bg-primary/10 rounded-lg mb-4 group-hover:bg-primary/20 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Tech Stack */}
      <Card title="Notre Stack Technologique" icon={Code}>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {techStack.map((tech, index) => (
            <div key={index} className="p-5 bg-white/5 rounded-xl border border-white/10 hover:border-primary/30 transition-all">
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 bg-white/10 rounded-lg">
                  {tech.icon}
                </div>
                <h4 className="text-lg font-medium">{tech.name}</h4>
              </div>
              <p className="text-sm text-gray-400">{tech.description}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Project Info */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card title="Ma Mission" icon={Info}>
          <p className="text-gray-300 mb-4">
            Mon objectif est de rendre la technologie d'analyse des émotions accessible à tous, 
            en fournissant un outil précis et facile à utiliser pour comprendre les expressions faciales.
          </p>
          <p className="text-gray-300">
            Ce projet a été développé en utilisant les dernières technologies d'IA et de développement web,
            avec une attention particulière portée à l'expérience utilisateur et aux performances.
          </p>
        </Card>

        <Card title="Contribuer" icon={Github}>
          <p className="text-gray-300 mb-4">
            Ce projet est open source et nous accueillons les contributions de la communauté.
            N'hésitez pas à nous rejoindre pour améliorer cette plateforme.
          </p>
          <a 
            href="https://github.com/votre-nom/emotion-ai" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors text-primary"
          >
            <Github className="w-5 h-5 mr-2" />
            Voir sur GitHub
          </a>
        </Card>
      </div>

      {/* Developer Section */}
      <Card title="Développeur" icon={Code}>
        <div className="flex flex-col items-center text-center">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 p-1 mb-6">
            <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center text-4xl font-bold text-white">
              AF
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-2">Ayoub Faradi</h3>
          <p className="text-lg text-primary mb-4">Développeur Full Stack & IA</p>
          <p className="text-gray-300 max-w-2xl mb-6">
            Je suis le créateur et unique développeur de cette application d'analyse d'émotions.
            J'ai conçu et développé l'ensemble du projet, du frontend au backend,
            en passant par l'implémentation du modèle d'IA.
          </p>
          <div className="flex space-x-4">
            <a 
              href="https://github.com/ayoubfaradi" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors"
            >
              <Github className="w-5 h-5 mr-2" />
              GitHub
            </a>
            <a 
              href="https://www.linkedin.com/in/ayoub-faradi/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 rounded-lg transition-colors"
            >
              <Linkedin className="w-5 h-5 mr-2" />
              LinkedIn
            </a>
          </div>
        </div>
      </Card>
    </div>
  );
}
