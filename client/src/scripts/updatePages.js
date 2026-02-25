#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Fonction pour lire un fichier
const readFile = (filePath) => {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    console.error(`Erreur lecture ${filePath}:`, error.message);
    return null;
  }
};

// Fonction pour écrire un fichier
const writeFile = (filePath, content) => {
  try {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Mis à jour: ${path.basename(filePath)}`);
  } catch (error) {
    console.error(`❌ Erreur écriture ${filePath}:`, error.message);
  }
};

// Fonction pour ajouter les imports nécessaires
const addTranslationImports = (content) => {
  if (content.includes("import { useTranslation }")) {
    return content; // Déjà présent
  }

  // Trouver les imports React
  const reactImportMatch = content.match(/import React[^;]*;/);
  if (!reactImportMatch) {
    console.log("❌ Import React non trouvé");
    return content;
  }

  const reactImportEnd = content.indexOf(reactImportMatch[0]) + reactImportMatch[0].length;
  
  // Ajouter les imports après React
  const newImports = `
import { useTranslation } from '../hooks/useTranslation';
import LanguageSelector from '../components/LanguageSelector';`;

  const beforeImport = content.substring(0, reactImportEnd);
  const afterImport = content.substring(reactImportEnd);
  
  return beforeImport + newImports + afterImport;
};

// Fonction pour ajouter le hook useTranslation dans le composant
const addTranslationHook = (content) => {
  if (content.includes("const { t }")) {
    return content; // Déjà présent
  }

  // Trouver le début du composant
  const componentMatch = content.match(/const\s+\w+\s*=\s*\(\s*\)\s*=>\s*{/);
  if (!componentMatch) {
    console.log("❌ Début du composant non trouvé");
    return content;
  }

  const componentStart = content.indexOf(componentMatch[0]) + componentMatch[0].length;
  
  // Ajouter le hook
  const hookLine = `
  const { t } = useTranslation();`;

  const beforeHook = content.substring(0, componentStart);
  const afterHook = content.substring(componentStart);
  
  return beforeHook + hookLine + afterHook;
};

// Fonction pour ajouter le LanguageSelector dans le header
const addLanguageSelectorToHeader = (content) => {
  if (content.includes('<LanguageSelector')) {
    return content; // Déjà présent
  }

  // Chercher différents patterns de header/navigation
  const headerPatterns = [
    /<Nav[^>]*>/,
    /<Header[^>]*>/,
    /<NavigationHeader[^>]*>/,
    /<nav[^>]*>/,
    /<header[^>]*>/
  ];

  let headerMatch = null;
  for (const pattern of headerPatterns) {
    headerMatch = content.match(pattern);
    if (headerMatch) break;
  }

  if (!headerMatch) {
    console.log("❌ Header non trouvé");
    return content;
  }

  // Trouver la fermeture du header
  const headerStart = content.indexOf(headerMatch[0]);
  const headerTagName = headerMatch[0].match(/<(\w+)/)[1];
  const closingTag = `</${headerTagName}>`;
  const headerEnd = content.indexOf(closingTag, headerStart);

  if (headerEnd === -1) {
    console.log("❌ Fermeture du header non trouvée");
    return content;
  }

  // Ajouter le LanguageSelector juste avant la fermeture
  const languageSelector = `
          <LanguageSelector />`;

  const beforeClose = content.substring(0, headerEnd);
  const afterClose = content.substring(headerEnd);
  
  return beforeClose + languageSelector + afterClose;
};

// Replacements courants pour les textes français
const commonReplacements = [
  // Navigation
  { from: /['"]Accueil['"]/, to: "{t('navigation.home')}" },
  { from: /['"]Fonctionnalités['"]/, to: "{t('navigation.features')}" },
  { from: /['"]Tarifs['"]/, to: "{t('navigation.pricing')}" },
  { from: /['"]À propos['"]/, to: "{t('navigation.about')}" },
  { from: /['"]Contact['"]/, to: "{t('navigation.contact')}" },
  { from: /['"]Support['"]/, to: "{t('navigation.support')}" },
  { from: /['"]Documentation['"]/, to: "{t('navigation.documentation')}" },
  
  // Actions communes
  { from: /['"]Retour à l'accueil['"]/, to: "{t('backToHome')}" },
  { from: /['"]Retour['"]/, to: "{t('common.back')}" },
  { from: /['"]En savoir plus['"]/, to: "{t('learnMore')}" },
  { from: /['"]Commencer['"]/, to: "{t('common.getStarted')}" },
  { from: /['"]Commencer maintenant['"]/, to: "{t('getStartedNow')}" },
  { from: /['"]Nous contacter['"]/, to: "{t('contactUs')}" },
  { from: /['"]Me contacter['"]/, to: "{t('contactMe')}" },
  
  // États
  { from: /['"]En développement['"]/, to: "{t('inDevelopment')}" },
  { from: /['"]Bientôt disponible['"]/, to: "{t('comingSoon')}" },
  { from: /['"]Version bêta['"]/, to: "{t('betaVersion')}" },
  
  // Titres de pages
  { from: /['"]Fonctionnalités['"]/, to: "{t('featuresPageTitle')}" },
  { from: /['"]Sécurité['"]/, to: "{t('securityPageTitle')}" },
  { from: /['"]À propos['"]/, to: "{t('aboutPageTitle')}" },
  { from: /['"]Contact['"]/, to: "{t('contactPageTitle')}" },
  { from: /['"]Support['"]/, to: "{t('supportPageTitle')}" },
  { from: /['"]Politique des cookies['"]/, to: "{t('cookiesPageTitle')}" }
];

// Fonction pour appliquer les remplacements courants
const applyCommonReplacements = (content) => {
  let newContent = content;
  
  commonReplacements.forEach(({ from, to }) => {
    newContent = newContent.replace(from, to);
  });
  
  return newContent;
};

// Fonction pour traiter une page
const processPage = (filePath) => {
  console.log(`📄 Traitement de ${path.basename(filePath)}...`);
  
  let content = readFile(filePath);
  if (!content) return;

  // Étapes de transformation
  content = addTranslationImports(content);
  content = addTranslationHook(content);
  content = addLanguageSelectorToHeader(content);
  content = applyCommonReplacements(content);

  writeFile(filePath, content);
};

// Fonction principale
const main = () => {
  console.log('🚀 Mise à jour automatique des pages avec les traductions...\n');

  // D'abord exécuter le script d'ajout des traductions
  console.log('📝 Ajout des nouvelles clés de traduction...');
  try {
    require('./addTranslations.js');
  } catch (error) {
    console.error('❌ Erreur lors de l\'ajout des traductions:', error.message);
  }

  console.log('\n📄 Mise à jour des pages...\n');

  // Pages à traiter
  const pagesDir = path.join(__dirname, '..', 'pages');
  const pagesToProcess = [
    'FeaturesPage.jsx',
    'FeaturesPageNew.jsx',
    'PricingPage.jsx',
    'AboutPage.jsx',
    'ContactPage.jsx',
    'SupportPage.jsx',
    'SupportPageNew.jsx',
    'SecurityPage.jsx',
    'PrivacyPage.jsx',
    'TermsPage.jsx',
    'CookiesPage.jsx',
    'StatusPage.jsx',
    'StatusPageNew.jsx',
    'UserGuidePage.jsx',
    'UserGuidePageNew.jsx',
    'IntegrationsPage.jsx',
    'IntegrationsPageTemp.jsx',
    'SchedulerPage.jsx',
    'SchedulerPageNew.jsx'
  ];

  let processedCount = 0;
  pagesToProcess.forEach(pageFile => {
    const filePath = path.join(pagesDir, pageFile);
    if (fs.existsSync(filePath)) {
      processPage(filePath);
      processedCount++;
    } else {
      console.log(`⚠️  Fichier non trouvé: ${pageFile}`);
    }
  });

  console.log(`\n✅ ${processedCount} pages traitées !`);
  console.log('\n📋 Résumé des modifications :');
  console.log('• Ajout des imports useTranslation et LanguageSelector');
  console.log('• Ajout du hook useTranslation dans chaque composant');
  console.log('• Ajout du sélecteur de langue dans les headers');
  console.log('• Remplacement des textes français par les clés de traduction');
  console.log('\n🎯 Prochaines étapes :');
  console.log('1. Vérifiez les pages modifiées');
  console.log('2. Testez le changement de langue');
  console.log('3. Ajustez manuellement si nécessaire');
};

// Exécuter le script
main();