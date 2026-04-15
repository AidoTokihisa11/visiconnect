import { useTranslation } from './useTranslation';
import { Video, Users, Shield, Zap, Mail, Github, Linkedin } from 'lucide-react';

export const useHomePageData = () => {
  const { t } = useTranslation();

  // Slider data
  const sliderData = [
    {
      title: t('slider.title1', 'Dashboard Intuitif'),
      description: t('slider.desc1', 'Contrôlez vos réunions en un clic.'),
      color: "#3b82f6"
    },
    {
      title: t('slider.title2', 'Mode Studio'),
      description: t('slider.desc2', 'Qualité 4K sans compromis.'),
      color: "#8b5cf6"
    },
    {
      title: t('slider.title3', 'Analytiques'),
      description: t('slider.desc3', 'Suivez l\\'engagement en temps réel.'),
      color: "#10b981"
    },
  ];

  // Features data
  const featuresData = [
    {
      icon: Video,
      title: t('homeFeatures.video.title', 'Réunions vidéo haute définition'),  
      description: t('homeFeatures.video.text', 'Streaming en HD avec compression intelligente'),
      items: t('homeFeatures.video.items', { returnObjects: true, defaultValue: [
        'Jusqu\\'à 1080p en HD',
        'Codec optimisé VP9',
        'Adaptative bitrate'
      ]}) || [],
      iconBg: 'rgba(59, 130, 246, 0.1)',
      iconColor: '#3b82f6'
    },
    {
      icon: Shield,
      title: t('homeFeatures.security.title', 'Sécurité de haut niveau'),       
      description: t('homeFeatures.security.text', 'Chiffrement E2E et conformité RGPD'),
      items: t('homeFeatures.security.items', { returnObjects: true, defaultValue: [
        'Chiffrement E2E',
        'Conformité RGPD',
        'Logs d\\'accès complets'
      ]}) || [],
      iconBg: 'rgba(34, 197, 94, 0.1)',
      iconColor: '#22c55e'
    },
    {
      icon: Zap,
      title: t('homeFeatures.instant.title', 'Démarrage instantané'),
      description: t('homeFeatures.instant.text', 'Pas d\\'installation, pas de compte'),
      items: t('homeFeatures.instant.items', { returnObjects: true, defaultValue: [
        'URL partageable',
        'Accès immédiat',
        'Sans inscription'
      ]}) || [],
      iconBg: 'rgba(249, 115, 22, 0.1)',
      iconColor: '#f97316'
    },
    {
      icon: Users,
      title: t('homeFeatures.collaboration.title', 'Collaboration en temps réel'),
      description: t('homeFeatures.collaboration.text', 'Partage d\\'écran, chat, tableau blanc'),
      items: t('homeFeatures.collaboration.items', { returnObjects: true, defaultValue: [
        'Partage d\\'écran HD',
        'Chat intégré',
        'Tableau blanc collaboratif'
      ]}) || [],
      iconBg: 'rgba(168, 85, 247, 0.1)',
      iconColor: '#a855f7'
    },
  ];

  // Testimonials data
  const testimonialsData = [
    {
      quote: t('testimonials.0.quote', 'VisioConnect a transformé nos réunions. Simple, efficace, sans prise de tête.'),
      author: t('testimonials.0.author', 'Marie Dubois'),
      title: t('testimonials.0.title', 'Fondatrice de TechStart')
    },
    {
      quote: t('testimonials.1.quote', 'La meilleure solution pour nos clients. Interface intuitive, support réactif.'),
      author: t('testimonials.1.author', 'Jean Martin'),
      title: t('testimonials.1.title', 'CTO, Solutions Digitales')
    },
    {
      quote: t('testimonials.2.quote', 'Pas d\\'équivalent sur le marché pour ce prix. Qualité professionnelle, vraiment.'),
      author: t('testimonials.2.author', 'Sophie Leclerc'),
      title: t('testimonials.2.title', 'Directrice Commerciale, Conseil RH')    
    },
  ];

  // Pricing data
  const pricingData = [
    {
      planName: t('pricing.free.title', 'Plan Gratuit'),
      price: '0',
      description: t('pricing.free.description', 'Pour tester'),
      features: t('pricing.free.features', { returnObjects: true, defaultValue: [
        'Jusqu\\'à 2 participants',
        'Réunions courtes (15 min)',
        'Quality vidéo standard',
        'Chat basique'
      ]}) || [],
      ctaText: t('pricing.free.action', 'Commencer'),
      ctaLink: '/dashboard',
      isPopular: false
    },
    {
      planName: t('pricing.pro.title', 'Plan Pro'),
      price: '29',
      description: t('pricing.pro.description', 'Pour les équipes'),
      features: t('pricing.pro.features', { returnObjects: true, defaultValue: [
        'Jusqu\\'à 10 participants',
        'Réunions illimitées',
        'HD 1080p',
        'Partage d\\'écran',
        'Enregistrement (1h/mois)',
        'Support par email'
      ]}) || [],
      ctaText: t('pricing.pro.action', 'Choisir'),
      ctaLink: '/checkout?plan=pro',
      isPopular: true
    },
    {
      planName: t('pricing.enterprise.title', 'Plan Enterprise'),
      price: '99',
      description: t('pricing.enterprise.description', 'Pour les large organisations'),
      features: t('pricing.enterprise.features', { returnObjects: true, defaultValue: [
        'Participants illimités',
        'Toutes les fonctionnalités',
        'API personnalisée',
        'SSO & sécurité avancée',
        'Support dédié 24/7',
        'SLA garanti 99.9%'
      ]}) || [],
      ctaText: t('pricing.enterprise.action', 'Contacter'),
      ctaLink: '/contact',
      isPopular: false
    },
  ];

  // Contact links
  const contactLinks = [
    {
      icon: Mail,
      label: 'Email',
      value: 'theo.garces.aido@gmail.com',
      href: 'mailto:theo.garces.aido@gmail.com'
    },
    {
      icon: Github,
      label: 'GitHub',
      value: '@AidoTokihisa11',
      href: 'https://github.com/AidoTokihisa11'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'Theo Garces',
      href: 'https://linkedin.com/in/theo-garces'
    },
  ];

  return {
    sliderData,
    featuresData,
    testimonialsData,
    pricingData,
    contactLinks
  };
};
