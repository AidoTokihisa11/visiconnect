const fs = require('fs');
const path = 'C:/Users/theog/Desktop/visiconnect/client/src/pages/PricingPage.jsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(/<h1>[\s\S]*?Des tarifs simples, <span>sans surprises<\/span>[\s\S]*?<\/h1>/g, `<h1>
            {t('pricing.header.title_part1')} <span>{t('pricing.header.title_part2')}</span>
          </h1>`);

content = content.replace(/<p>[\s\S]*?Choisissez le plan qui correspond parfaitement aux  besoins de votre équipe. [\s\S]*?Tous les plans incluent le support prioritaire\.[\s\S]*?<\/p>/g, `<p>
            {t('pricing.header.subtitle')}
          </p>`);

content = content.replace(/<div className="tab">Mensuel<\/div>/g, `<div className="tab">{t('pricing.toggle.monthly')}</div>`);
content = content.replace(/<div className="tab">Annuel <span>-20%<\/span><\/div>/g, `<div className="tab">{t('pricing.toggle.yearly')} <span>{t('pricing.toggle.discount')}</span></div>`);

// Cards

// Gratuit
content = content.replace(/<h3>Gratuit<\/h3>/g, `<h3>{t('pricing.plans.free.name')}</h3>`);
content = content.replace(/<p className="desc">Pour découvrir et pour les particuliers\.<\/p>/g, `<p className="desc">{t('pricing.plans.free.desc')}</p>`);
content = content.replace(/<span className="price">0€<\/span>/g, `<span className="price">{t('pricing.plans.free.price')}</span>`);
content = content.replace(/<span className="period">\/mois<\/span>/g, `<span className="period">{t('pricing.plans.free.period')}</span>`);
content = content.replace(/<button onClick=\{handleAction\} className="outline-btn">\s*Commencer\s*<\/button>/g, `<button onClick={handleAction} className="outline-btn">{t('pricing.plans.free.button')}</button>`);

// Starter
content = content.replace(/<h3>Starter<\/h3>/g, `<h3>{t('pricing.plans.starter.name')}</h3>`);
content = content.replace(/<p className="desc">L'essentiel pour les petites équipes\.<\/p>/g, `<p className="desc">{t('pricing.plans.starter.desc')}</p>`);
content = content.replace(/<span className="price">\{isAnnual \? '9\\.90€' : '12\.90€'\}<\/span>/g, `<span className="price">{isAnnual ? '9.90€' : '12.90€'}</span>`);
content = content.replace(/<span className="period">\/utilisateur\/mois<\/span>/g, `<span className="period">{t('pricing.plans.starter.period')}</span>`);
content = content.replace(/<button onClick=\{handleAction\} className="outline-btn">\s*Essai gratuit 14j\s*<\/button>/g, `<button onClick={handleAction} className="outline-btn">{t('pricing.plans.starter.button')}</button>`);

// Pro
content = content.replace(/<h3>Pro<\/h3>/g, `<h3>{t('pricing.plans.pro.name')}</h3>`);
content = content.replace(/<div className="popular-badge">Le plus choisi<\/div>/g, `<div className="popular-badge">{t('pricing.plans.pro.popular')}</div>`);
content = content.replace(/<p className="desc">Fonctionnalités avancées pour les pros\.<\/p>/g, `<p className="desc">{t('pricing.plans.pro.desc')}</p>`);
content = content.replace(/<span className="price">\{isAnnual \? '19\\.90€' : '24\.90€'\}<\/span>/g, `<span className="price">{isAnnual ? '19.90€' : '24.90€'}</span>`);
content = content.replace(/<span className="period">\/utilisateur\/mois<\/span>/g, `<span className="period">{t('pricing.plans.pro.period')}</span>`);
content = content.replace(/<button onClick=\{handleAction\}>\s*Essai gratuit 14j\s*<\/button>/g, `<button onClick={handleAction}>{t('pricing.plans.pro.button')}</button>`);

// Enterprise
content = content.replace(/<h3>Enterprise<\/h3>/g, `<h3>{t('pricing.plans.enterprise.name')}</h3>`);
content = content.replace(/<p className="desc">Pour les grandes organisations complexes\.<\/p>/g, `<p className="desc">{t('pricing.plans.enterprise.desc')}</p>`);
content = content.replace(/<span className="price">Sur devis<\/span>/g, `<span className="price">{t('pricing.plans.enterprise.price')}</span>`);
content = content.replace(/<button onClick=\{handleAction\} className="outline-btn">\s*Contacter les ventes\s*<\/button>/g, `<button onClick={handleAction} className="outline-btn">{t('pricing.plans.enterprise.button')}</button>`);

// Feature lists replacement can be tedious. Let's do a few manually or leave them if it's too much logic, but we should try.
content = content.replace(/Réunions jusqu'à 45 min/g, `{t('pricing.features.meeting_45')}`);
content = content.replace(/Jusqu'à 100 participants/g, `{t('pricing.features.participants_100')}`);
content = content.replace(/Partage d'écran basique/g, `{t('pricing.features.screen_share_basic')}`);
content = content.replace(/Chat intégré/g, `{t('pricing.features.chat')}`);

content = content.replace(/Réunions illimitées/g, `{t('pricing.features.meeting_unlimited')}`);
content = content.replace(/Jusqu'à 300 participants/g, `{t('pricing.features.participants_300')}`);
content = content.replace(/Enregistrement cloud \(10Go\)/g, `{t('pricing.features.recording_10gb')}`);
content = content.replace(/Sous-titres automatiques/g, `{t('pricing.features.captions')}`);
content = content.replace(/Sondages en direct/g, `{t('pricing.features.polls')}`);

content = content.replace(/Jusqu'à 1000 participants/g, `{t('pricing.features.participants_1000')}`);
content = content.replace(/Enregistrement cloud \(illimité\)/g, `{t('pricing.features.recording_unlimited')}`);
content = content.replace(/Salles de sous-commission/g, `{t('pricing.features.breakout_rooms')}`);
content = content.replace(/Tableau blanc avancé/g, `{t('pricing.features.whiteboard_advanced')}`);
content = content.replace(/Tableau de bord admin/g, `{t('pricing.features.admin_dashboard')}`);

content = content.replace(/Participants illimités/g, `{t('pricing.features.participants_unlimited')}`);
content = content.replace(/SSO & Active Directory/g, `{t('pricing.features.sso')}`);
content = content.replace(/SLA garantie 99\.99%/g, `{t('pricing.features.sla')}`);
content = content.replace(/Gestionnaire de compte dédié/g, `{t('pricing.features.account_manager')}`);
content = content.replace(/Marque blanche/g, `{t('pricing.features.white_label')}`);

// FAQ
content = content.replace(/<h2>Questions fréquentes<\/h2>/g, `<h2>{t('pricing.faq.title')}</h2>`);
content = content.replace(/Puis-je changer de plan en cours d'année \?/g, `{t('pricing.faq.q1.question')}`);
content = content.replace(/Oui, vous pouvez upgrader votre plan à tout moment\. Le prorata sera calculé automatiquement\. Pour downgrader, le changement prendra effet à la fin de votre cycle de facturation actuel\./g, `{t('pricing.faq.q1.answer')}`);

content = content.replace(/Quels sont les moyens de paiement acceptés \?/g, `{t('pricing.faq.q2.question')}`);
content = content.replace(/Nous acceptons toutes les cartes de crédit majoritaires \(Visa, MasterCard, Amex\), ainsi que les virements SEPA et prélèvements automatiques pour les plans annuels et Enterprise\./g, `{t('pricing.faq.q2.answer')}`);

content = content.replace(/Y a-t-il des frais cachés \?/g, `{t('pricing.faq.q3.question')}`);
content = content.replace(/Non, la transparence est une valeur clé pour nous\. Vous ne payez que le prix affiché pour le nombre d'utilisateurs actifs mensuels\./g, `{t('pricing.faq.q3.answer')}`);

content = content.replace(/Que se passe-t-il à la fin de la période d'essai \?/g, `{t('pricing.faq.q4.question')}`);
content = content.replace(/À la fin des 14 jours, vous serez automatiquement basculé sur le plan Gratuit sauf si vous ajoutez un moyen de paiement pour continuer avec le plan payant\./g, `{t('pricing.faq.q4.answer')}`);

// Imports update
if (!content.includes('useTranslation')) {
  content = content.replace(/import FooterClean from '\.\.\/components\/FooterClean';/, `import FooterClean from '../components/FooterClean';\nimport { useTranslation } from '../hooks/useTranslation';`);
  content = content.replace(/export default function PricingPage\(\) \{/, `export default function PricingPage() {\n  const { t } = useTranslation();`);
}

fs.writeFileSync(path, content);
console.log("PricingPage translated");
