#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Fonction pour nettoyer les clés dupliquées dans fr.js
const cleanFrenchTranslations = () => {
  const filePath = path.join(__dirname, '..', 'i18n', 'locales', 'fr.js');
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Supprimer les doublons ajoutés par le script
  const duplicateSection = /\/\/ Pages and common translations[\s\S]*?\/\/ Personal description/;
  content = content.replace(duplicateSection, '// Personal description');
  
  fs.writeFileSync(filePath, content);
  console.log('✅ Nettoyé fr.js');
};

// Fonction pour nettoyer les clés dupliquées dans en.js
const cleanEnglishTranslations = () => {
  const filePath = path.join(__dirname, '..', 'i18n', 'locales', 'en.js');
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Supprimer les doublons ajoutés par le script
  const duplicateSection = /\/\/ Pages and common translations[\s\S]*?\/\/ Personal description/;
  content = content.replace(duplicateSection, '// Personal description');
  
  fs.writeFileSync(filePath, content);
  console.log('✅ Nettoyé en.js');
};

// Fonction pour corriger PricingPage.jsx
const fixPricingPage = () => {
  const filePath = path.join(__dirname, '..', 'pages', 'PricingPage.jsx');
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Corriger les erreurs de syntaxe dans les données
  content = content.replace(/buttonText: {t\('([^']+)'\)}/g, 'buttonText: "$1"');
  
  fs.writeFileSync(filePath, content);
  console.log('✅ Corrigé PricingPage.jsx');
};

// Fonction pour corriger FeaturesPage.jsx
const fixFeaturesPage = () => {
  const filePath = path.join(__dirname, '..', 'pages', 'FeaturesPage.jsx');
  let content = fs.readFileSync(filePath, 'utf8');
  
  // S'assurer que LanguageSelector est importé
  if (!content.includes("import LanguageSelector")) {
    const importIndex = content.indexOf("import { useTranslation }");
    if (importIndex !== -1) {
      const importEnd = content.indexOf('\n', importIndex) + 1;
      const newImport = "import LanguageSelector from '../components/LanguageSelector';\n";
      content = content.slice(0, importEnd) + newImport + content.slice(importEnd);
    }
  }
  
  fs.writeFileSync(filePath, content);
  console.log('✅ Corrigé FeaturesPage.jsx');
};

// Fonction principale
const main = () => {
  console.log('🧹 Nettoyage des erreurs automatiques...\n');
  
  try {
    cleanFrenchTranslations();
    cleanEnglishTranslations();
    fixPricingPage();
    fixFeaturesPage();
    
    console.log('\n✅ Nettoyage terminé !');
    console.log('\n🚀 Vous pouvez maintenant tester avec: npm start');
    
  } catch (error) {
    console.error('❌ Erreur lors du nettoyage:', error.message);
  }
};

main();