import { useTranslation } from './useTranslation';
import { Video, Users, Shield, Zap, Mail, Github, Linkedin } from 'lucide-react';

export const useHomePageData = () => {
  const { t } = useTranslation();
  const publicContactEmail = ['contact', 'visioconnect.pro'].join('@');

  // Slider data
  const sliderData = [
    {
      title: t('slider.title1', 'Dashboard Intuitif'),
      description: t('slider.desc1', 'Contrôlez vos réunions en un clic.'),
      color: '#3b82f6',
    },
    {
      title: t('slider.title2', 'Mode Studio'),
      description: t('slider.desc2', 'Qualité 4K sans compromis.'),
      color: '#8b5cf6',
    },
    {
      title: t('slider.title3', 'Analytiques'),
      description: t('slider.desc3', "Suivez l'engagement en temps réel."),
      color: '#10b981',
    },
  ];

  // Features data
  const featuresData = [
    {
      icon: Video,
      title: t('homeFeatures.video.title', 'Réunions vidéo haute définition'),
      description: t('homeFeatures.video.text', 'Streaming en HD avec compression intelligente'),
      items:
        t('homeFeatures.video.items', {
          returnObjects: true,
          defaultValue: ["Jusqu'à 1080p en HD", 'Codec optimisé VP9', 'Adaptative bitrate'],
        }) || [],
      iconBg: 'rgba(59, 130, 246, 0.1)',
      iconColor: '#3b82f6',
    },
    {
      icon: Shield,
      title: t('homeFeatures.security.title', 'Sécurité de haut niveau'),
      description: t('homeFeatures.security.text', 'Chiffrement E2E et conformité RGPD'),
      items:
        t('homeFeatures.security.items', {
          returnObjects: true,
          defaultValue: ['Chiffrement E2E', 'Conformité RGPD', "Logs d'ccès complets"],
        }) || [],
      iconBg: 'rgba(34, 197, 94, 0.1)',
      iconColor: '#22c55e',
    },
    {
      icon: Zap,
      title: t('homeFeatures.instant.title', 'Démarrage instantané'),
      description: t('homeFeatures.instant.text', "Pas d'nstallation, pas de compte"),
      items:
        t('homeFeatures.instant.items', {
          returnObjects: true,
          defaultValue: ['URL partageable', 'Accès immédiat', 'Sans inscription'],
        }) || [],
      iconBg: 'rgba(249, 115, 22, 0.1)',
      iconColor: '#f97316',
    },
    {
      icon: Users,
      title: t('homeFeatures.collaboration.title', 'Collaboration en temps réel'),
      description: t('homeFeatures.collaboration.text', "Partage d'cran, chat, tableau blanc"),
      items:
        t('homeFeatures.collaboration.items', {
          returnObjects: true,
          defaultValue: ["Partage d'cran HD", 'Chat intégré', 'Tableau blanc collaboratif'],
        }) || [],
      iconBg: 'rgba(168, 85, 247, 0.1)',
      iconColor: '#a855f7',
    },
  ];

  // Testimonials data
  const testimonialsData = [
    {
      quote: t(
        'testimonials.0.quote',
        'VisioConnect a transformé nos réunions. Simple, efficace, sans prise de tête.'
      ),
      author: t('testimonials.0.author', 'Marie Dubois'),
      title: t('testimonials.0.title', 'Fondatrice de TechStart'),
    },
    {
      quote: t(
        'testimonials.1.quote',
        'La meilleure solution pour nos clients. Interface intuitive, support réactif.'
      ),
      author: t('testimonials.1.author', 'Jean Martin'),
      title: t('testimonials.1.title', 'CTO, Solutions Digitales'),
    },
    {
      quote: t(
        'testimonials.2.quote',
        "Pas d'quivalent sur le marché pour ce prix. Qualité professionnelle, vraiment."
      ),
      author: t('testimonials.2.author', 'Sophie Leclerc'),
      title: t('testimonials.2.title', 'Directrice Commerciale, Conseil RH'),
    },
  ];

  // Pricing data — aligned with /pricing page and client/src/config/pricing.js
  const pricingData = [
    {
      planName: 'Starter',
      price: '0',
      description: t('pricing.free.description', 'Pour découvrir la plateforme sans engagement.'),
      features:
        t('pricing.free.features', {
          returnObjects: true,
          defaultValue: [
            "Jusqu'à 3 participants",
            '45 min par réunion',
            "Partage d'écran",
            'Chat en temps réel',
          ],
        }) || [],
      ctaText: t('pricing.free.action', 'Commencer gratuitement'),
      ctaLink: '/signup',
      isPopular: false,
    },
    {
      planName: 'Pro',
      price: '15',
      description: t('pricing.pro.description', 'Pour les équipes agiles et les freelances.'),
      features:
        t('pricing.pro.features', {
          returnObjects: true,
          defaultValue: [
            "Jusqu'à 50 participants",
            'Durée illimitée',
            '5 Go de stockage Cloud',
            'Support Prioritaire',
            'Transcriptions IA (10h/mois)',
          ],
        }) || [],
      ctaText: t('pricing.pro.action', "S'abonner"),
      ctaLink: '/pricing',
      isPopular: true,
    },
    {
      planName: 'Business',
      price: '35',
      description: t('pricing.enterprise.description', 'Pour les organisations à grande échelle.'),
      features:
        t('pricing.enterprise.features', {
          returnObjects: true,
          defaultValue: [
            "Jusqu'à 200 participants",
            'Stockage illimité',
            'Salles de sous-groupes',
            'SSO & Admin Avancé',
            'Transcriptions Illimitées',
          ],
        }) || [],
      ctaText: t('pricing.enterprise.action', "S'abonner"),
      ctaLink: '/pricing',
      isPopular: false,
    },
  ];

  // Contact links
  const contactLinks = [
    {
      icon: Mail,
      label: 'Email',
      value: publicContactEmail,
      href: `mailto:${publicContactEmail}`,
    },
    {
      icon: Github,
      label: 'GitHub',
      value: '@AidoTokihisa11',
      href: 'https://github.com/AidoTokihisa11',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'Theo Garces',
      href: 'https://linkedin.com/in/theo-garces',
    },
  ];

  return {
    sliderData,
    featuresData,
    testimonialsData,
    pricingData,
    contactLinks,
  };
};
