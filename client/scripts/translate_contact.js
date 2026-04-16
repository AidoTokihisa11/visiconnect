const fs = require('fs');
const path = 'C:/Users/theog/Desktop/visiconnect/client/src/pages/ContactPage.jsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(/<h1>[\s\S]*?Prenez contact avec <span>notre équipe<\/span>[\s\S]*?<\/h1>/g, `<h1>
            {t('contact.header.title_part1')} <span>{t('contact.header.title_part2')}</span>
          </h1>`);

content = content.replace(/<p>[\s\S]*?Que vous ayez besoin d'une démonstration sur mesure, d'une[\s\S]*?assistance technique ou d'informations sur nos tarifs[\s\S]*?professionnels, nous sommes à votre écoute\.[\s\S]*?<\/p>/g, `<p>
            {t('contact.header.subtitle')}
          </p>`);

content = content.replace(/<h3>Informations <\/h3>/g, `<h3>{t('contact.info.title')}</h3>`);
content = content.replace(/<p className="desc">[\s\S]*?Remplissez ce formulaire et un expert dédié prendra contact avec[\s\S]*?vous dans les 24h ouvrées\.[\s\S]*?<\/p>/g, `<p className="desc">{t('contact.info.desc')}</p>`);

content = content.replace(/<h4>Email Professionnel<\/h4>/g, `<h4>{t('contact.info.email_title')}</h4>`);
content = content.replace(/<h4>Département Entreprise<\/h4>/g, `<h4>{t('contact.info.enterprise_title')}</h4>`);
content = content.replace(/<p>Ligne prioritaire pour les projets et accords-cadres\.<\/p>/g, `<p>{t('contact.info.enterprise_desc')}</p>`);
content = content.replace(/<h4>Heures de service<\/h4>/g, `<h4>{t('contact.info.hours_title')}</h4>`);
content = content.replace(/\\bLundi au Vendredi\\b/g, `{t('contact.info.hours_days')}`);
content = content.replace(/09:00 - 18:00 \\(Paris\\)/g, `{t('contact.info.hours_time')}`);

content = content.replace(/<strong>Message envoyé avec succès !<\/strong>/g, `<strong>{t('contact.form.success_title')}</strong>`);
content = content.replace(/Notre équipe reviendra vers vous rapidement\\./g, `{t('contact.form.success_desc')}`);

content = content.replace(/<strong>Une erreur est survenue\.<\/strong>/g, `<strong>{t('contact.form.error_title')}</strong>`);
content = content.replace(/Veuillez réessayer ou nous contacter directement par e-mail\\./g, `{t('contact.form.error_desc')}`);

content = content.replace(/<label htmlFor="firstName">Prénom<\/label>/g, `<label htmlFor="firstName">{t('contact.form.first_name')}</label>`);
content = content.replace(/placeholder="Jean"/g, `placeholder={t('contact.form.first_name_placeholder')}`);
content = content.replace(/<label htmlFor="lastName">Nom<\/label>/g, `<label htmlFor="lastName">{t('contact.form.last_name')}</label>`);
content = content.replace(/placeholder="Dupont"/g, `placeholder={t('contact.form.last_name_placeholder')}`);

content = content.replace(/<label htmlFor="email">Email professionnel<\/label>/g, `<label htmlFor="email">{t('contact.form.email')}</label>`);
content = content.replace(/placeholder="jean\.dupont@societe\.com"/g, `placeholder={t('contact.form.email_placeholder')}`);

content = content.replace(/Téléphone <span className="sub-label">\\(Optionnel\\)<\/span>/g, `{t('contact.form.phone')} <span className="sub-label">{t('contact.form.optional')}</span>`);

content = content.replace(/<label htmlFor="company">Nom de l'entreprise<\/label>/g, `<label htmlFor="company">{t('contact.form.company')}</label>`);
content = content.replace(/placeholder="Société ou Indépendant"/g, `placeholder={t('contact.form.company_placeholder')}`);

content = content.replace(/<label htmlFor="category">Nature de la demande<\/label>/g, `<label htmlFor="category">{t('contact.form.category')}</label>`);

content = content.replace(/Sélectionnez un sujet\.\.\./g, `Sélectionnez un sujet...`); // Leave for translation string extraction logic, but let's replace manually:

content = content.replace(/>\\s*Sélectionnez un sujet\.\.\.\\s*<\/option>/g, `>{t('contact.form.category_options.placeholder')}</option>`);
content = content.replace(/>Demander une démonstration<\/option>/g, `>{t('contact.form.category_options.demo')}</option>`);
content = content.replace(/>Question sur les tarifs \\(Devis\\)<\/option>/g, `>{t('contact.form.category_options.pricing')}</option>`);
content = content.replace(/>Proposition de partenariat<\/option>/g, `>{t('contact.form.category_options.partnership')}</option>`);
content = content.replace(/>Support technique<\/option>/g, `>{t('contact.form.category_options.support')}</option>`);
content = content.replace(/>Autre demande<\/option>/g, `>{t('contact.form.category_options.other')}</option>`);

content = content.replace(/<label htmlFor="message">Votre message<\/label>/g, `<label htmlFor="message">{t('contact.form.message')}</label>`);
content = content.replace(/placeholder="Décrivez votre projet ou votre besoin en détail\.\.\."/g, `placeholder={t('contact.form.message_placeholder')}`);

content = content.replace(/Envoi en cours\.\.\./g, `Envoi en cours...`); // Let's replace within ternary
content = content.replace(/\\{isSubmitting \\? "Envoi en cours\.\.\." : "Envoyer la demande"\\}/g, `{isSubmitting ? t('contact.form.submitting') : t('contact.form.submit_button')}`);


fs.writeFileSync(path, content);
console.log("ContactPage translated");
