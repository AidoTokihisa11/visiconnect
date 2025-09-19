import React from 'react';
import { motion } from 'framer-motion';
import { ServiceCard } from './Card';
import { 
  VideoCameraIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  BoltIcon,
  PaintBrushIcon,
  CubeTransparentIcon,
  CloudArrowUpIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';

const FeaturesSection = () => {
  const features = [
    {
      icon: VideoCameraIcon,
      title: "Vidéo 4K Ultra HD",
      description: "Profitez d'une qualité vidéo exceptionnelle avec une résolution allant jusqu'à 4K et une optimisation automatique selon votre connexion.",
      features: ["Résolution jusqu'à 4K", "Auto-optimisation", "Faible latence", "HDR support"],
      gradient: "from-blue-500 to-cyan-500",
      badge: "Nouveau"
    },
    {
      icon: UserGroupIcon,
      title: "Jusqu'à 100 Participants",
      description: "Connectez des équipes entières avec une performance optimale, des outils de gestion avancés et des salles de réunion flexibles.",
      features: ["100 participants max", "Gestion des rôles", "Salles privées", "Mode présentateur"],
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: ShieldCheckIcon,
      title: "Sécurité Avancée",
      description: "Protection de niveau militaire avec chiffrement de bout en bout, authentification multi-facteurs et conformité RGPD.",
      features: ["Chiffrement E2E", "Authentification 2FA", "Conformité RGPD", "Audit trail"],
      gradient: "from-green-500 to-emerald-500",
      badge: "Certifié"
    },
    {
      icon: BoltIcon,
      title: "Performance Optimale",
      description: "Infrastructure mondiale distribuée pour garantir une expérience fluide avec une latence ultra-faible et un uptime de 99.9%.",
      features: ["CDN mondial", "Latence < 50ms", "Uptime 99.9%", "Auto-scaling"],
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: PaintBrushIcon,
      title: "Tableau Blanc Collaboratif",
      description: "Créez, dessinez et collaborez en temps réel sur un tableau blanc HD avec des outils professionnels intégrés.",
      features: ["Tableau blanc HD", "Annotations temps réel", "Formes géométriques", "Import/Export"],
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      icon: CubeTransparentIcon,
      title: "Intégrations Avancées",
      description: "Connectez vos outils favoris grâce à notre API complète, webhooks et plugins tiers pour un workflow optimisé.",
      features: ["API complète", "Webhooks", "Plugins tiers", "SSO entreprise"],
      gradient: "from-teal-500 to-blue-500"
    },
    {
      icon: CloudArrowUpIcon,
      title: "Enregistrement Cloud",
      description: "Enregistrez vos réunions dans le cloud avec transcription automatique et partage sécurisé.",
      features: ["Stockage illimité", "Transcription IA", "Partage sécurisé", "Recherche avancée"],
      gradient: "from-violet-500 to-purple-500"
    },
    {
      icon: ChatBubbleLeftRightIcon,
      title: "Chat Intelligent",
      description: "Communiquez efficacement avec un système de chat avancé incluant réactions, fichiers et traduction automatique.",
      features: ["Chat en temps réel", "Partage de fichiers", "Traduction auto", "Réactions emoji"],
      gradient: "from-pink-500 to-rose-500"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.6
      }
    }
  };

  const titleVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-0 left-1/3 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
          className="absolute bottom-0 right-1/3 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="text-center mb-16 lg:mb-24"
        >
          <motion.div variants={titleVariants} className="mb-6">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-blue-500/30 rounded-full px-4 py-2 mb-8">
              <BoltIcon className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-white">
                Fonctionnalités Avancées
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Technologie
              </span>
              {' '}de pointe
            </h2>
            
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Découvrez les fonctionnalités révolutionnaires qui font de Visio Pro 
              la plateforme de visioconférence la plus avancée du marché.
            </p>
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={{
                hidden: { y: 50, opacity: 0 },
                visible: {
                  y: 0,
                  opacity: 1,
                  transition: { 
                    duration: 0.6, 
                    ease: "easeOut",
                    delay: index * 0.1
                  }
                }
              }}
              className={index < 4 ? "lg:col-span-1" : "lg:col-span-1"}
            >
              <ServiceCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                features={feature.features}
                gradient={feature.gradient}
                badge={feature.badge}
                className="h-full"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16 lg:mt-24"
        >
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-white/10 rounded-2xl p-8 lg:p-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              Prêt à transformer vos réunions ?
            </h3>
            <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
              Découvrez pourquoi plus de 50,000 entreprises font confiance à Visio Pro 
              pour leurs communications critiques.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl transform transition-all duration-200 hover:shadow-2xl hover:shadow-blue-500/25"
              >
                Essayer gratuitement
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-white/80 hover:text-white font-medium py-4 px-8 rounded-xl border border-white/20 hover:bg-white/5 transition-all duration-200"
              >
                Planifier une démo
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;