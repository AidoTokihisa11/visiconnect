import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Bars3Icon, 
  XMarkIcon, 
  VideoCameraIcon,
  SparklesIcon,
  UserIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user, isLoggedIn, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Accueil', href: '/', icon: SparklesIcon },
    { name: 'Fonctionnalités', href: '/features', icon: VideoCameraIcon },
    { name: 'Tarifs', href: '/pricing', icon: Cog6ToothIcon },
    { name: 'À Propos', href: '/about', icon: UserIcon },
    { name: 'Support', href: '/support', icon: UserIcon },
  ];

  const headerVariants = {
    initial: { y: -100, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const mobileMenuVariants = {
    closed: { opacity: 0, x: "100%" },
    open: { 
      opacity: 1, 
      x: 0,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 30 
      }
    }
  };

  const navItemVariants = {
    closed: { x: 20, opacity: 0 },
    open: (i) => ({
      x: 0,
      opacity: 1,
      transition: { delay: i * 0.1, duration: 0.3 }
    })
  };

  return (
    <>
      <motion.header
        initial="initial"
        animate="animate"
        variants={headerVariants}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/95 backdrop-blur-md border-b border-black/10 shadow-lg' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/" className="flex items-center space-x-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ 
                    duration: 20, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                  className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center"
                >
                  <VideoCameraIcon className="w-5 h-5 text-white" />
                </motion.div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Visio Pro
                </span>
              </Link>
            </motion.div>

            {/* Navigation Desktop */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map((item, index) => {
                const isActive = location.pathname === item.href;
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                  >
                    <Link
                      to={item.href}
                      className={`relative flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 group ${
                        isActive
                          ? 'text-white bg-white/10'
                          : 'text-white/70 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      <span className="font-medium">{item.name}</span>
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg border border-blue-500/30"
                          initial={false}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              {!isLoggedIn ? (
                <>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to="/login"
                      className="text-white/80 hover:text-white font-medium py-2 px-4 rounded-lg transition-all duration-200"
                    >
                      Connexion
                    </Link>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to="/signup"
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-2 px-6 rounded-lg transform transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25"
                    >
                      Créer un compte
                    </Link>
                  </motion.div>
                </>
              ) : (
                <>
                  <motion.div className="text-white/80 text-sm">
                    Bienvenue, {user?.displayName || user?.email}
                  </motion.div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogout}
                    className="text-white/80 hover:text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 border border-white/20"
                  >
                    Déconnexion
                  </motion.button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20"
            >
              {isOpen ? (
                <XMarkIcon className="w-6 h-6 text-white" />
              ) : (
                <Bars3Icon className="w-6 h-6 text-white" />
              )}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
            />

            {/* Mobile Menu Panel */}
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={mobileMenuVariants}
              className="fixed top-0 right-0 bottom-0 z-50 w-80 bg-slate-900/95 backdrop-blur-md border-l border-white/10 md:hidden"
            >
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center p-6 border-b border-white/10">
                  <span className="text-xl font-bold text-white">Menu</span>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-lg bg-white/10"
                  >
                    <XMarkIcon className="w-6 h-6 text-white" />
                  </motion.button>
                </div>

                <nav className="flex-1 px-6 py-8">
                  <div className="space-y-4">
                    {navigation.map((item, index) => (
                      <motion.div
                        key={item.name}
                        custom={index}
                        variants={navItemVariants}
                        className="block"
                      >
                        <Link
                          to={item.href}
                          onClick={() => setIsOpen(false)}
                          className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                            location.pathname === item.href
                              ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border border-blue-500/30'
                              : 'text-white/70 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          <item.icon className="w-5 h-5" />
                          <span className="font-medium">{item.name}</span>
                        </Link>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-8 pt-8 border-t border-white/10 space-y-4">
                    <Link
                      to="/login"
                      onClick={() => setIsOpen(false)}
                      className="block w-full text-center py-3 px-4 text-white/80 hover:text-white font-medium rounded-lg hover:bg-white/5 transition-all duration-200"
                    >
                      Connexion
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setIsOpen(false)}
                      className="block w-full text-center py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg transform transition-all duration-200 hover:scale-105"
                    >
                      Commencer
                    </Link>
                  </div>
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;