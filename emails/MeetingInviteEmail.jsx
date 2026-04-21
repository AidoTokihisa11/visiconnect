import * as React from 'react';
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Text,
  Hr,
  Font
} from '@react-email/components';

const t = {
  // ANGLAIS
  previewText: "VisioConnect Beta goes live tonight at 8:30 PM (Paris/Madrid)",
  helloEn: "Dear",
  introTextEn: "Thank you for being part of the VisioConnect Beta Program. We are pleased to confirm that beta access will be officially available tonight.",
  launchHeroLabelEn: "OFFICIAL OPENING TIME",
  launchHeroTimeEn: "8:30 PM (CEST)",
  launchHeroSubEn: "Access starts tonight - please connect from this time onward.",
  launchDateTitleEn: "Official Beta Opening - Tonight",
  launchDateTextEn: `
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse: collapse; font-size: 14px;">
      <tr>
        <td style="padding: 10px 12px; border: 1px solid #bfdbfe; background: #dbeafe; color: #1e3a8a; font-weight: 700;">Paris / Madrid (CEST)</td>
        <td style="padding: 10px 12px; border: 1px solid #bfdbfe; background: #dbeafe; color: #1e3a8a; font-weight: 700; text-align: right;">8:30 PM</td>
      </tr>
      <tr>
        <td style="padding: 10px 12px; border: 1px solid #e2e8f0; color: #334155;">London (BST)</td>
        <td style="padding: 10px 12px; border: 1px solid #e2e8f0; color: #0f172a; font-weight: 600; text-align: right;">7:30 PM</td>
      </tr>
      <tr>
        <td style="padding: 10px 12px; border: 1px solid #e2e8f0; color: #334155;">New York (EDT)</td>
        <td style="padding: 10px 12px; border: 1px solid #e2e8f0; color: #0f172a; font-weight: 600; text-align: right;">2:30 PM</td>
      </tr>
      <tr>
        <td style="padding: 10px 12px; border: 1px solid #e2e8f0; color: #334155;">Los Angeles (PDT)</td>
        <td style="padding: 10px 12px; border: 1px solid #e2e8f0; color: #0f172a; font-weight: 600; text-align: right;">11:30 AM</td>
      </tr>
      <tr>
        <td style="padding: 10px 12px; border: 1px solid #e2e8f0; color: #334155;">Quito (ECT)</td>
        <td style="padding: 10px 12px; border: 1px solid #e2e8f0; color: #0f172a; font-weight: 600; text-align: right;">1:30 PM</td>
      </tr>
      <tr>
        <td style="padding: 10px 12px; border: 1px solid #e2e8f0; color: #334155;">UTC</td>
        <td style="padding: 10px 12px; border: 1px solid #e2e8f0; color: #0f172a; font-weight: 600; text-align: right;">6:30 PM</td>
      </tr>
      <tr>
        <td style="padding: 10px 12px; border: 1px solid #e2e8f0; color: #334155;">Tokyo (JST)</td>
        <td style="padding: 10px 12px; border: 1px solid #e2e8f0; color: #0f172a; font-weight: 600; text-align: right;">3:30 AM (Apr 22)</td>
      </tr>
    </table>
  `,
  
  situationTitleEn: "Before You Connect",
  situationTextEn: "Please make sure to read the documentation shared in the very first beta email before your first login. It contains the complete onboarding steps, expected behavior, and best practices to help you start quickly.",
  
  actionTitleEn: "If You Have an Issue with a Beta Code",
  actionTextEn: "If your beta code does not work, please send an email to <strong style=\"color: #1e40af;\">theo.garces.aido@gmail.com</strong> with your <strong>first name</strong>, <strong>last name</strong>, and <strong>email address</strong> used for registration (you can also include your beta code for faster support).",
  
  compensationTitleEn: "Access Reminder & Compensation",
  compensationTextEn: 'Access is considered officially open from <strong style="color: #1e40af;">8:30 PM (CEST)</strong> only. To ensure platform stability for everyone, please connect only from that time onward.<br /><br />To compensate for the delay, we have extended your beta period: <strong style="color: #1e40af;">beta access now ends on April 30, 2026</strong>.',
  
  closingTextEn: "Thank you again for your trust and for helping us test VisioConnect in real conditions. Your feedback is essential.",
  apologyTextEn: "We look forward to welcoming you tonight.",
  
  // FRANÇAIS
  helloFr: "Bonjour",
  introTextFr: "Merci de faire partie du programme Bêta de VisioConnect. Nous avons le plaisir de vous confirmer que l'accès bêta sera officiellement disponible ce soir.",
  launchHeroLabelFr: "HEURE OFFICIELLE D'OUVERTURE",
  launchHeroTimeFr: "20h30 (CEST)",
  launchHeroSubFr: "Accès ouvert ce soir - merci de vous connecter à partir de cet horaire.",
  launchDateTitleFr: "Ouverture Officielle de la Bêta - Ce Soir",
  launchDateTextFr: `
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse: collapse; font-size: 14px;">
      <tr>
        <td style="padding: 10px 12px; border: 1px solid #bfdbfe; background: #dbeafe; color: #1e3a8a; font-weight: 700;">Paris / Madrid (CEST)</td>
        <td style="padding: 10px 12px; border: 1px solid #bfdbfe; background: #dbeafe; color: #1e3a8a; font-weight: 700; text-align: right;">20h30</td>
      </tr>
      <tr>
        <td style="padding: 10px 12px; border: 1px solid #e2e8f0; color: #334155;">Londres (BST)</td>
        <td style="padding: 10px 12px; border: 1px solid #e2e8f0; color: #0f172a; font-weight: 600; text-align: right;">19h30</td>
      </tr>
      <tr>
        <td style="padding: 10px 12px; border: 1px solid #e2e8f0; color: #334155;">New York (EDT)</td>
        <td style="padding: 10px 12px; border: 1px solid #e2e8f0; color: #0f172a; font-weight: 600; text-align: right;">14h30</td>
      </tr>
      <tr>
        <td style="padding: 10px 12px; border: 1px solid #e2e8f0; color: #334155;">Los Angeles (PDT)</td>
        <td style="padding: 10px 12px; border: 1px solid #e2e8f0; color: #0f172a; font-weight: 600; text-align: right;">11h30</td>
      </tr>
      <tr>
        <td style="padding: 10px 12px; border: 1px solid #e2e8f0; color: #334155;">Quito (ECT)</td>
        <td style="padding: 10px 12px; border: 1px solid #e2e8f0; color: #0f172a; font-weight: 600; text-align: right;">13h30</td>
      </tr>
      <tr>
        <td style="padding: 10px 12px; border: 1px solid #e2e8f0; color: #334155;">UTC</td>
        <td style="padding: 10px 12px; border: 1px solid #e2e8f0; color: #0f172a; font-weight: 600; text-align: right;">18h30</td>
      </tr>
      <tr>
        <td style="padding: 10px 12px; border: 1px solid #e2e8f0; color: #334155;">Tokyo (JST)</td>
        <td style="padding: 10px 12px; border: 1px solid #e2e8f0; color: #0f172a; font-weight: 600; text-align: right;">03h30 (22 avril)</td>
      </tr>
    </table>
  `,
  
  situationTitleFr: "Avant de Vous Connecter",
  situationTextFr: "Pensez bien à lire la documentation fournie dans le tout premier email bêta avant votre première connexion. Elle contient toutes les étapes d'onboarding, les usages recommandés et les informations utiles pour démarrer rapidement.",
  
  actionTitleFr: "En Cas de Problème avec un Code Bêta",
  actionTextFr: "Si votre code bêta ne fonctionne pas, envoyez un email à <strong style=\"color: #1e40af;\">theo.garces.aido@gmail.com</strong> en indiquant votre <strong>nom</strong>, <strong>prénom</strong> et <strong>adresse mail</strong> utilisée à l'inscription (vous pouvez aussi ajouter le code bêta pour un traitement plus rapide).",
  
  compensationTitleFr: "Rappel d'Accès & Compensation",
  compensationTextFr: 'L\'accès est officiellement ouvert à partir de <strong style="color: #1e40af;">20h30 (CEST)</strong>. Pour garantir la stabilité de la plateforme pour tous, merci de vous connecter uniquement à partir de cet horaire.<br /><br />En compensation des jours ajoutés, votre période bêta est prolongée : <strong style="color: #1e40af;">la fin de la bêta est fixée au 30 avril 2026</strong>.',
  
  closingTextFr: "Merci encore pour votre confiance et votre aide dans les tests de VisioConnect en conditions réelles. Vos retours sont essentiels.",
  apologyTextFr: "Nous avons hâte de vous accueillir ce soir.",

  // ALERT
  alertBoxEn: "⚠️ IMPORTANT: VisioConnect Beta will be officially accessible tonight from 8:30 PM (CEST) only.",
  alertBoxFr: "⚠️ IMPORTANT : La bêta VisioConnect sera officiellement accessible ce soir à partir de 20h30 (CEST) uniquement.",
  
  footerText: "You are receiving this email because you registered for the VisioConnect Private Beta Program.",
  footerCopyright: "VisioConnect — The Future of Video Conferencing",
  footerUnsubscribe: "If you no longer wish to participate in the beta program, please reply to this email."
};

export const MeetingInviteEmail = ({
  inviteeName = "Theo",
}) => {
  return (
    <Html>
      <Head>
        <title>Official Beta Opening Tonight - VisioConnect</title>
        <Font
          fontFamily="Inter"
          fallbackFontFamily="Helvetica, Arial, sans-serif"
          webFont={{
            url: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf",      
            format: "truetype",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
        <Font
          fontFamily="Inter"
          fallbackFontFamily="Helvetica, Arial, sans-serif"
          webFont={{
            url: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf",      
            format: "truetype",
          }}
          fontWeight={600} // Inter SemiBold
          fontStyle="normal"
        />
      </Head>
      <Preview>{t.previewText}</Preview>
      <Body style={main}>      
        <Container style={container}>
          {/* EN-TÊTE ÉLÉGANT */}
          <Section style={header}>
            <Text style={headerText}>VisioConnect</Text>
            <Text style={headerSubText}>OFFICIAL COMMUNICATION</Text>
          </Section>

          {/* CORPS DU MESSAGE - ANGLAIS */}
          <Section style={content}>
            <Text style={greeting}>{t.helloEn} {inviteeName},</Text>
            
            <div style={paragraph} dangerouslySetInnerHTML={{ __html: t.introTextEn }} />

            <Section style={launchHeroBox}>
              <Text style={launchHeroLabel}>{t.launchHeroLabelEn}</Text>
              <Text style={launchHeroTime}>{t.launchHeroTimeEn}</Text>
              <Text style={launchHeroSub}>{t.launchHeroSubEn}</Text>
            </Section>

            {/* ENCART HORARES EN */}
            <Section style={dateBoxStyles}>
              <Text style={dateTitle}>{t.launchDateTitleEn}</Text>
              <div style={dateText} dangerouslySetInnerHTML={{ __html: t.launchDateTextEn }} />
            </Section>

            {/* ALERTE URGENCE EN */}
            <Section style={alertBoxStyles}>
              <Text style={alertText}>{t.alertBoxEn}</Text>
            </Section>
            
            <Section style={infoCard}>
              <Text style={cardTitle}>{t.situationTitleEn}</Text>
              <Text style={cardText}>{t.situationTextEn}</Text>
            </Section>
            
            <Section style={infoCard}>
              <Text style={cardTitle}>{t.actionTitleEn}</Text>
              <div style={cardText} dangerouslySetInnerHTML={{ __html: t.actionTextEn }} />
            </Section>
            
            <Section style={infoCardHighlight}>
              <Text style={cardTitle}>{t.compensationTitleEn}</Text>
              <div style={cardText} dangerouslySetInnerHTML={{ __html: t.compensationTextEn }} />
            </Section>

            <Text style={paragraph}>{t.closingTextEn}</Text>
            <Text style={paragraph}>{t.apologyTextEn}</Text>
            
            <Text style={signoffEn}>
              Warmest regards,<br />
              <span style={{ fontWeight: 600, color: '#2563eb', display: 'inline-block', marginTop: '6px' }}>The VisioConnect Team</span>
            </Text>
            
            <Hr style={dividerMargin} />

            {/* CORPS DU MESSAGE - FRANÇAIS */}
            <Text style={greeting}>{t.helloFr} {inviteeName},</Text>
            
            <div style={paragraph} dangerouslySetInnerHTML={{ __html: t.introTextFr }} />

            <Section style={launchHeroBox}>
              <Text style={launchHeroLabel}>{t.launchHeroLabelFr}</Text>
              <Text style={launchHeroTime}>{t.launchHeroTimeFr}</Text>
              <Text style={launchHeroSub}>{t.launchHeroSubFr}</Text>
            </Section>

            {/* ENCART HORARES FR */}
            <Section style={dateBoxStyles}>
              <Text style={dateTitle}>{t.launchDateTitleFr}</Text>
              <div style={dateText} dangerouslySetInnerHTML={{ __html: t.launchDateTextFr }} />
            </Section>

            {/* ALERTE URGENCE FR */}
            <Section style={alertBoxStyles}>
              <Text style={alertText}>{t.alertBoxFr}</Text>
            </Section>
            
            <Section style={infoCard}>
              <Text style={cardTitle}>{t.situationTitleFr}</Text>
              <Text style={cardText}>{t.situationTextFr}</Text>
            </Section>
            
            <Section style={infoCard}>
              <Text style={cardTitle}>{t.actionTitleFr}</Text>
              <div style={cardText} dangerouslySetInnerHTML={{ __html: t.actionTextFr }} />
            </Section>
            
            <Section style={infoCardHighlight}>
              <Text style={cardTitle}>{t.compensationTitleFr}</Text>
              <div style={cardText} dangerouslySetInnerHTML={{ __html: t.compensationTextFr }} />
            </Section>

            <Text style={paragraph}>{t.closingTextFr}</Text>
            <Text style={paragraph}>{t.apologyTextFr}</Text>

            <Text style={signoff}>
              Cordialement,<br />
              <span style={{ fontWeight: 600, color: '#2563eb', display: 'inline-block', marginTop: '6px' }}>L'équipe VisioConnect</span>
            </Text>
          </Section>
          <Section style={footer}>
            <Text style={footerText}>{t.footerText}</Text>
            <Text style={footerText}>{t.footerUnsubscribe}</Text>
            <Text style={footerCopyright}>© {new Date().getFullYear()} {t.footerCopyright}</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

// -------------------------------------------------------------
// STYLES IN-JS POUR DESIGNS UNIQUES ET RESPONSIVE
// -------------------------------------------------------------
const main = {
  backgroundColor: '#f4f4f5', // Soft minimal gray
  fontFamily: '"Inter", "Helvetica Neue", Helvetica, Arial, sans-serif',
  padding: '40px 0',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  maxWidth: '600px',
  borderRadius: '12px',
  overflow: 'hidden',
  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  border: '1px solid #e4e4e7',
};

const header = {
  backgroundColor: '#2563eb', // Deep premium dark -> changed to Primary Blue
  padding: '36px 40px',
  textAlign: 'center',
};

const headerText = {
  color: '#ffffff',
  fontSize: '26px',
  fontWeight: '600',
  letterSpacing: '-0.5px',
  margin: '0',
};

const headerSubText = {
  color: '#bfdbfe', // Soft light blue
  fontSize: '11px',
  fontWeight: '600',
  letterSpacing: '2px',
  textTransform: 'uppercase',
  margin: '8px 0 0 0',
};

const content = {
  padding: '40px',
};

const greeting = {
  color: '#1e3a8a', // Dark blue
  fontSize: '20px',
  fontWeight: '600',
  marginBottom: '24px',
};

const paragraph = {
  color: '#3f3f46',
  fontSize: '15px',
  lineHeight: '26px',
  marginBottom: '24px',
};

const infoCard = {
  backgroundColor: '#fafafa', // Ultra light gray to pop inside white box
  border: '1px solid #e4e4e7',
  borderRadius: '8px',
  marginBottom: '24px',
};

const infoCardHighlight = {
  backgroundColor: '#eff6ff', // Light blue highlight
  border: '2px solid #2563eb',
  borderRadius: '8px',
  marginBottom: '24px',
};

const cardTitle = {
  color: '#1e3a8a', // Dark blue
  fontSize: '15px',
  fontWeight: '600',
  margin: '0',
  padding: '24px 24px 8px 24px',
};

const cardText = {
  color: '#52525b',
  fontSize: '15px',
  lineHeight: '25px',
  margin: '0',
  padding: '0 24px 24px 24px',
};

const dateBoxStyles = {
  backgroundColor: '#f8fafc', // slate-50
  borderLeft: '4px solid #2563eb', // blue-600
  padding: '24px',
  marginBottom: '24px',
  borderRadius: '0 8px 8px 0',
};

const dateTitle = {
  color: '#1e3a8a',
  fontSize: '14px',
  fontWeight: '700',
  margin: '0 0 12px 0',
  textTransform: 'uppercase',
  letterSpacing: '0.5px'
};

const dateText = {
  color: '#27272a',
  fontSize: '15px',
  lineHeight: '24px',
  margin: '0',
};

const launchHeroBox = {
  backgroundColor: '#0f172a',
  borderRadius: '10px',
  padding: '20px 24px',
  marginBottom: '24px',
  border: '1px solid #1e293b',
};

const launchHeroLabel = {
  color: '#93c5fd',
  fontSize: '11px',
  fontWeight: '700',
  letterSpacing: '1.2px',
  textTransform: 'uppercase',
  margin: '0 0 8px 0',
};

const launchHeroTime = {
  color: '#ffffff',
  fontSize: '32px',
  fontWeight: '700',
  letterSpacing: '-0.8px',
  lineHeight: '1.2',
  margin: '0 0 8px 0',
};

const launchHeroSub = {
  color: '#cbd5e1',
  fontSize: '14px',
  lineHeight: '22px',
  margin: '0',
};

const alertBoxStyles = {
  backgroundColor: '#fef2f2', // red-50
  border: '2px solid #ef4444', // red-500
  borderRadius: '8px',
  padding: '24px',
  marginBottom: '32px',
};

const alertText = {
  color: '#991b1b', // red-800
  fontSize: '16px',
  fontWeight: '600',
  lineHeight: '24px',
  margin: '0',
  textAlign: 'center',
};

const dividerMargin = {
  borderColor: '#e4e4e7',
  margin: '40px 0',
};

const signoffEn = {
  color: '#52525b',
  fontSize: '15px',
  lineHeight: '24px',
  margin: '0',
  marginTop: '24px',
};

const signoff = {
  color: '#52525b',
  fontSize: '15px',
  lineHeight: '24px',
  margin: '0',
  marginTop: '24px',
};

const divider = {
  borderColor: '#e4e4e7',
  margin: '0',
};

const dividerSubtle = {
  borderColor: '#e4e4e7',
  margin: '0',
};

const footer = {
  backgroundColor: '#fafafa',
  padding: '32px 40px',
  textAlign: 'center',
};

const footerText = {
  color: '#71717a',
  fontSize: '12px',
  lineHeight: '18px',
  margin: '0 0 8px 0',
};

const footerCopyright = {
  color: '#a1a1aa',
  fontSize: '12px',
  fontWeight: '600',
  margin: '0',
};

export default MeetingInviteEmail;
