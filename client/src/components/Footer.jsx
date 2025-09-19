import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  VideoCameraIcon,
  HeartIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon
} from '@heroicons/react/24/solid';
// Custom social icons will be defined at the bottom

const Footer = () => {
  const footerSections = [
    {
      title: "Produit",
      links: [
        { name: "Fonctionnalités", href: "/features" },
        { name: "Tarifs", href: "/#pricing" },
        { name: "Planificateur", href: "/scheduler" },
        { name: "Intégrations", href: "/integrations" },
        { name: "API", href: "/api-docs" }
      ]
    },
    {
      title: "Entreprise",
      links: [
        { name: "À propos", href: "/about" },
        { name: "Sécurité", href: "/security" },
        { name: "Confidentialité", href: "/privacy" },
        { name: "Contact", href: "/contact" },
        { name: "Communauté", href: "/community" }
      ]
    },
    {
      title: "Support",
      links: [
        { name: "Centre d'aide", href: "/support" },
        { name: "Guide utilisateur", href: "/user-guide" },
        { name: "Statut système", href: "/status" },
        { name: "Email support", href: "mailto:support@visio-pro.com", external: true }
      ]
    },
    {
      title: "Ressources",
      links: [
        { name: "Blog", href: "/blog" },
        { name: "Documentation", href: "/api-docs" },
        { name: "Webinaires", href: "/webinars" },
        { name: "Études de cas", href: "/case-studies" },
        { name: "Téléchargements", href: "/downloads" }
      ]
    }
  ];

  const socialLinks = [
    { 
      name: "Twitter", 
      href: "https://twitter.com/visiopro", 
      icon: TwitterIcon,
      color: "hover:text-blue-400" 
    },
    { 
      name: "LinkedIn", 
      href: "https://linkedin.com/company/visiopro", 
      icon: LinkedInIcon,
      color: "hover:text-blue-600" 
    },
    { 
      name: "GitHub", 
      href: "https://github.com/visiopro", 
      icon: GitHubIcon,
      color: "hover:text-gray-300" 
    },
    { 
      name: "Discord", 
      href: "https://discord.gg/visiopro", 
      icon: DiscordIcon,
      color: "hover:text-indigo-400" 
    }
  ];

  const contactInfo = [
    {
      icon: EnvelopeIcon,
      label: "Email",
      value: "contact@visio-pro.com",
      href: "mailto:contact@visio-pro.com"
    },
    {
      icon: PhoneIcon,
      label: "Téléphone",
      value: "+33 1 23 45 67 89",
      href: "tel:+33123456789"
    },
    {
      icon: MapPinIcon,
      label: "Adresse",
      value: "Paris, France",
      href: "#"
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

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <footer className="relative bg-slate-900/50 backdrop-blur-sm border-t border-white/10">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {/* Top Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Brand & Description */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="flex items-center space-x-3">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ 
                    duration: 20, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                  className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center"
                >
                  <VideoCameraIcon className="w-6 h-6 text-white" />
                </motion.div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Visio Pro
                </span>
              </div>
              
              <p className="text-white/70 text-lg leading-relaxed max-w-md">
                La plateforme de visioconférence nouvelle génération qui révolutionne 
                la collaboration à distance avec une qualité 4K et des outils avancés.
              </p>

              {/* Social Links */}
              <div className="flex items-center space-x-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg flex items-center justify-center text-white/60 ${social.color} transition-all duration-200 hover:bg-white/20`}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-lg font-semibold text-white">Contactez-nous</h3>
              <div className="space-y-4">
                {contactInfo.map((contact, index) => (
                  <motion.a
                    key={contact.label}
                    href={contact.href}
                    whileHover={{ x: 5 }}
                    className="flex items-center space-x-3 text-white/70 hover:text-white transition-colors duration-200"
                  >
                    <contact.icon className="w-5 h-5 text-blue-400" />
                    <div>
                      <div className="text-sm font-medium text-white/50">
                        {contact.label}
                      </div>
                      <div>{contact.value}</div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Links Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {footerSections.map((section, sectionIndex) => (
              <motion.div
                key={section.title}
                variants={itemVariants}
                className="space-y-4"
              >
                <h4 className="text-lg font-semibold text-white">
                  {section.title}
                </h4>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={link.name}>
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ 
                          delay: (sectionIndex * 0.1) + (linkIndex * 0.05),
                          duration: 0.3 
                        }}
                      >
                        {link.external ? (
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white/60 hover:text-white transition-colors duration-200 block py-1"
                          >
                            {link.name}
                          </a>
                        ) : (
                          <Link
                            to={link.href}
                            className="text-white/60 hover:text-white transition-colors duration-200 block py-1"
                          >
                            {link.name}
                          </Link>
                        )}
                      </motion.div>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Newsletter */}
          <motion.div 
            variants={itemVariants}
            className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-white/10 rounded-xl p-8 mb-12"
          >
            <div className="text-center">
              <h3 className="text-xl font-bold text-white mb-4">
                Restez informé de nos nouveautés
              </h3>
              <p className="text-white/70 mb-6">
                Recevez les dernières mises à jour et conseils d'experts directement dans votre boîte mail
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="votre@email.com"
                  className="w-full sm:flex-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-lg transform transition-all duration-200"
                >
                  S'abonner
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Bottom Bar */}
          <motion.div 
            variants={itemVariants}
            className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
          >
            <div className="flex items-center space-x-2 text-white/60 text-sm">
              <span>© 2024 Visio Pro. Tous droits réservés.</span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <span>Fait avec</span>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <HeartIcon className="w-4 h-4 text-red-400" />
                </motion.div>
                <span>en France</span>
              </span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <Link 
                to="/privacy" 
                className="text-white/60 hover:text-white transition-colors duration-200"
              >
                Politique de confidentialité
              </Link>
              <Link 
                to="/terms" 
                className="text-white/60 hover:text-white transition-colors duration-200"
              >
                Conditions d'utilisation
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

// Custom Twitter Icon (since it might not be available)
const TwitterIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
  </svg>
);

const LinkedInIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const GitHubIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const DiscordIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0002 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z"/>
  </svg>
);

export default Footer;