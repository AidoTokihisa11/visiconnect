const fs = require('fs');
const path = 'C:/Users/theog/Desktop/visiconnect/client/src/pages/PricingPage.jsx';
let content = fs.readFileSync(path, 'utf8');

// Update FAQ Array
content = content.replace(/q: "Puis-je annuler mon abonnement à tout moment \?"/g, `q: t('pricing.faq.q1.question')`);
content = content.replace(/a: "Oui, l'annulation est gratuite et prend effet à la fin de votre période de facturation en cours\."/g, `a: t('pricing.faq.q1.answer')`);

content = content.replace(/q: "Y a-t-il une limite de temps pour les réunions gratuites \?"/g, `q: t('pricing.faq.q2.question')`);
content = content.replace(/a: "Les réunions sur le forfait gratuit sont limitées à 45 minutes\. Pour des réunions illimitées, passez au forfait Pro\."/g, `a: t('pricing.faq.q2.answer')`);

content = content.replace(/q: "Proposez-vous des tarifs pour l'éducation \?"/g, `q: t('pricing.faq.q3.question')`);
content = content.replace(/a: "Oui, les étudiants et enseignants bénéficient de 50% de réduction sur présentation d'un justificatif\."/g, `a: t('pricing.faq.q3.answer')`);

content = content.replace(/q: "Quels modes de paiement acceptez-vous \?"/g, `q: t('pricing.faq.q4.question')`);
content = content.replace(/a: "Nous acceptons toutes les principales cartes de crédit \\(Visa, Mastercard, Amex\\) ainsi que PayPal pour les abonnements annuels\."/g, `a: t('pricing.faq.q4.answer')`);

// Update Features Array (the pricing plans array)
content = content.replace(/name: 'Gratuit'/g, `name: t('pricing.plans.free.name')`);
content = content.replace(/desc: 'Pour les appels rapides entre amis'/g, `desc: t('pricing.plans.free.desc')`);
content = content.replace(/price: '0€'/g, `price: t('pricing.plans.free.price')`);
content = content.replace(/period: '\/mois'/g, `period: t('pricing.plans.free.period')`);
content = content.replace(/buttonText: 'Commencer'/g, `buttonText: t('pricing.plans.free.button')`);

content = content.replace(/name: 'Pro'/g, `name: t('pricing.plans.pro.name')`);
content = content.replace(/desc: 'Pour les freelances et petites équipes'/g, `desc: t('pricing.plans.pro.desc')`);
content = content.replace(/price: \{ monthly: '14€', annual: '9€' \}/g, `price: { monthly: t('pricing.plans.pro.price.monthly'), annual: t('pricing.plans.pro.price.annual') }`);
content = content.replace(/buttonText: 'Essai gratuit de 14 jours'/g, `buttonText: t('pricing.plans.pro.button')`);

content = content.replace(/name: 'Business'/g, `name: t('pricing.plans.business.name')`);
content = content.replace(/desc: 'Pour les entreprises en croissance'/g, `desc: t('pricing.plans.business.desc')`);
content = content.replace(/price: \{ monthly: '29€', annual: '19€' \}/g, `price: { monthly: t('pricing.plans.business.price.monthly'), annual: t('pricing.plans.business.price.annual') }`);
content = content.replace(/buttonText: 'Contacter les ventes'/g, `buttonText: t('pricing.plans.business.button')`);

fs.writeFileSync(path, content);
console.log("Pricing arrays translated");
