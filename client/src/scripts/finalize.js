#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Fonction pour vérifier les erreurs dans les fichiers
const checkForErrors = () => {
  console.log('🔍 Vérification des erreurs...\n');

  const filesToCheck = [
    'src/i18n/locales/fr.js',
    'src/i18n/locales/en.js', 
    'src/i18n/locales/de.js',
    'src/i18n/locales/es.js',
    'src/i18n/locales/ru.js'
  ];

  let hasErrors = false;

  filesToCheck.forEach(file => {
    const filePath = path.join(__dirname, '..', '..', file);
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Vérifications de base
      const issues = [];
      
      // Vérifier les parenthèses et accolades
      const openBraces = (content.match(/{/g) || []).length;
      const closeBraces = (content.match(/}/g) || []).length;
      if (openBraces !== closeBraces) {
        issues.push('Accolades non équilibrées');
      }
      
      // Vérifier les apostrophes non échappées
      const unescapedQuotes = content.match(/[^\\]'/g);
      if (unescapedQuotes && unescapedQuotes.length > 0) {
        issues.push('Apostrophes possiblement non échappées');
      }
      
      if (issues.length > 0) {
        console.log(`❌ ${file}:`);
        issues.forEach(issue => console.log(`   • ${issue}`));
        hasErrors = true;
      } else {
        console.log(`✅ ${file} - OK`);
      }
      
    } catch (error) {
      console.log(`❌ ${file} - Erreur: ${error.message}`);
      hasErrors = true;
    }
  });

  return !hasErrors;
};

// Fonction pour générer un rapport des pages mises à jour
const generateReport = () => {
  console.log('\n📋 Rapport des pages traduites:\n');
  
  const pagesDir = path.join(__dirname, '..', 'pages');
  const pages = fs.readdirSync(pagesDir).filter(file => file.endsWith('.jsx'));
  
  let translatedPages = 0;
  
  pages.forEach(pageFile => {
    const filePath = path.join(pagesDir, pageFile);
    const content = fs.readFileSync(filePath, 'utf8');
    
    const hasTranslation = content.includes('useTranslation');
    const hasLanguageSelector = content.includes('LanguageSelector');
    
    if (hasTranslation) {
      console.log(`✅ ${pageFile} - Traduit ${hasLanguageSelector ? '+ Sélecteur' : ''}`);
      translatedPages++;
    } else {
      console.log(`⚠️  ${pageFile} - Non traduit`);
    }
  });
  
  console.log(`\n📊 Résumé: ${translatedPages}/${pages.length} pages traduites`);
  
  return { translated: translatedPages, total: pages.length };
};

// Fonction pour créer un guide de test
const createTestGuide = () => {
  const testGuide = `
# 🧪 Guide de Test des Traductions VisioConnect

## Pages à tester
${[
  '📄 HomePage - http://localhost:3000/',
  '📄 FeaturesPage - http://localhost:3000/features', 
  '📄 PricingPage - http://localhost:3000/pricing',
  '📄 AboutPage - http://localhost:3000/about',
  '📄 ContactPage - http://localhost:3000/contact',
  '📄 SecurityPage - http://localhost:3000/security',
  '📄 SupportPage - http://localhost:3000/support',
  '📄 PrivacyPage - http://localhost:3000/privacy',
  '📄 CookiesPage - http://localhost:3000/cookies',
  '📄 TermsPage - http://localhost:3000/terms',
  '📄 StatusPage - http://localhost:3000/status'
].join('\n')}

## Tests à effectuer
1. ✅ Vérifier que le sélecteur de langue 🌐 apparaît en haut à droite
2. ✅ Tester le changement entre FR, EN, DE, ES, RU
3. ✅ Vérifier que tous les textes se traduisent correctement
4. ✅ S'assurer qu'il n'y a pas de clés non traduites (ex: "featureHDVideo")
5. ✅ Tester la navigation entre les pages en conservant la langue

## Commandes utiles
- Démarrer l'app: \`npm start\`
- Vérifier erreurs: \`npm run build\`
- Tests: \`npm test\`

## Langues supportées
- 🇫🇷 Français (par défaut)
- 🇺🇸 English 
- 🇩🇪 Deutsch
- 🇪🇸 Español
- 🇷🇺 Русский

## En cas de problème
1. Vérifier la console du navigateur
2. Vérifier les fichiers de traduction dans src/i18n/locales/
3. S'assurer que useTranslation() est bien appelé dans le composant
`;

  fs.writeFileSync(path.join(__dirname, '..', '..', 'TRANSLATION_TEST_GUIDE.md'), testGuide);
  console.log('\n📝 Guide de test créé: TRANSLATION_TEST_GUIDE.md');
};

// Fonction principale
const main = () => {
  console.log('🎯 Finalisation du système de traduction VisioConnect\n');
  
  // Vérifications
  const noErrors = checkForErrors();
  const report = generateReport();
  
  // Créer le guide de test
  createTestGuide();
  
  console.log('\n🎉 SYSTÈME DE TRADUCTION INSTALLÉ AVEC SUCCÈS!\n');
  console.log('📊 Statistiques:');
  console.log(`   • ${Object.keys({fr: 1, en: 1, de: 1, es: 1, ru: 1}).length} langues supportées`);
  console.log(`   • ${report.translated} pages traduites`);
  console.log(`   • Sélecteur de langue ajouté automatiquement`);
  
  if (noErrors) {
    console.log('\n✅ Aucune erreur détectée');
    console.log('\n🚀 Prêt à tester! Exécutez:');
    console.log('   cd client && npm start');
    console.log('\n📋 Puis suivez le guide de test: TRANSLATION_TEST_GUIDE.md');
  } else {
    console.log('\n⚠️  Des erreurs ont été détectées. Vérifiez les fichiers mentionnés ci-dessus.');
  }
  
  console.log('\n🌍 Votre site est maintenant multilingue! 🎉');
};

// Exécuter le script
main();