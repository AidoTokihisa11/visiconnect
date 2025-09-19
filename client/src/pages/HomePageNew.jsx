import React from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import Footer from '../components/Footer';
import '../styles.css';

const HomePage = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
    >
      {/* Header avec navigation */}
      <Header />

      {/* Section principale avec hero */}
      <main>
        <HeroSection />
        <FeaturesSection />
      </main>

      {/* Footer */}
      <Footer />
    </motion.div>
  );
};

export default HomePage;