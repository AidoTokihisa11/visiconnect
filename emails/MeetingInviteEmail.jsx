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
  previewText: "Update regarding the VisioConnect Beta Delay",
  helloEn: "Dear",
  introTextEn: "Thank you for being part of the VisioConnect Beta Program. The beta launch, which was initially postponed to April 19, has unfortunately been delayed once more.",
  launchDateTitleEn: "New Official Launch Date",
  launchDateTextEn: `
    <div style="margin-bottom: 8px;">🗓️ <strong>April 21 at 10:30 AM (Paris/Madrid time)</strong></div>
    <div style="margin-bottom: 4px;">🌍 <strong>4:30 AM</strong> on the US East Coast (EDT)</div>
    <div>🌍 <strong>3:30 AM</strong> in Ecuador (ECT)</div>
  `,
  
  situationTitleEn: "What Happened?",
  situationTextEn: "Despite our explicit instructions to wait for the official launch email, a small number of users connected to the platform prematurely. These unexpected early connections triggered unforeseen code errors that destabilized our infrastructure.",
  
  actionTitleEn: "Our Response",
  actionTextEn: "Our developers are actively fixing these code errors and implementing stricter access controls.",
  
  compensationTitleEn: "Beta Period Extended",
  compensationTextEn: 'To apologize for this delay, we are extending your beta access. Your account will now remain active until <strong style="color: #1e40af;">April 30, 2026</strong>.',
  
  closingTextEn: "We deeply apologize for the inconvenience and appreciate your patience. We will notify you by email as soon as the servers are fully stabilized.",
  apologyTextEn: "Thank you for your understanding.",
  
  // FRANÇAIS
  helloFr: "Bonjour",
  introTextFr: "Merci de faire partie du programme Bêta de VisioConnect. Le lancement de la bêta, initialement repoussé au 19 avril, est malheureusement retardé une nouvelle fois.",
  launchDateTitleFr: "Nouvelle Date de Lancement Officiel",
  launchDateTextFr: `
    <div style="margin-bottom: 8px;">🗓️ <strong>21 avril à 10h30 (Heure de Paris et de Madrid)</strong></div>
    <div style="margin-bottom: 4px;">🌍 <strong>4h30</strong> sur la côte Est des États-Unis (EDT)</div>
    <div>🌍 <strong>3h30</strong> en Équateur (ECT)</div>
  `,
  
  situationTitleFr: "Que s'est-il passé ?",
  situationTextFr: "Malgré nos instructions claires de patienter jusqu'à la réception de l'email officiel de lancement, un petit nombre d'utilisateurs s'est connecté prématurément à la plateforme. Ces connexions anticipées ont déclenché des erreurs de code inattendues qui ont déstabilisé notre infrastructure.",
  
  actionTitleFr: "Notre Réponse",
  actionTextFr: "Nos développeurs corrigent activement ces erreurs de code et mettent en place des contrôles d'accès plus stricts.",
  
  compensationTitleFr: "Période de Bêta Prolongée",
  compensationTextFr: 'Pour nous excuser de ce retard, nous prolongeons votre accès à la bêta. Votre compte restera désormais actif jusqu\'au <strong style="color: #1e40af;">30 Avril 2026</strong>.',
  
  closingTextFr: "Nous vous présentons nos plus plates excuses pour la gêne occasionnée et vous remercions de votre patience. Nous vous informerons par email dès que les serveurs seront totalement stabilisés.",
  apologyTextFr: "Merci de votre compréhension.",

  // ALERT
  alertBoxEn: "⚠️ IMPORTANT: Please do not try logging into VisioConnect until you receive the official launch confirmation email.",
  alertBoxFr: "⚠️ IMPORTANT : Merci de ne pas tenter de vous connecter à VisioConnect tant que vous n'avez pas reçu l'email officiel de lancement.",
  
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
        <title>Beta Update - VisioConnect</title>
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
              <Text style={cardText}>{t.actionTextEn}</Text>
            </Section>
            
            <Section style={infoCardHighlight}>
              <Text style={cardTitle}>{t.compensationTitleEn}</Text>
              <div style={cardText} dangerouslySetInnerHTML={{ __html: t.compensationTextEn }} />
            </Section>

            <Text style={paragraph}>{t.closingTextEn}</Text>
            
            <Text style={signoffEn}>
              Warmest regards,<br />
              <span style={{ fontWeight: 600, color: '#2563eb', display: 'inline-block', marginTop: '6px' }}>The VisioConnect Team</span>
            </Text>
            
            <Hr style={dividerMargin} />

            {/* CORPS DU MESSAGE - FRANÇAIS */}
            <Text style={greeting}>{t.helloFr} {inviteeName},</Text>
            
            <div style={paragraph} dangerouslySetInnerHTML={{ __html: t.introTextFr }} />

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
              <Text style={cardText}>{t.actionTextFr}</Text>
            </Section>
            
            <Section style={infoCardHighlight}>
              <Text style={cardTitle}>{t.compensationTitleFr}</Text>
              <div style={cardText} dangerouslySetInnerHTML={{ __html: t.compensationTextFr }} />
            </Section>

            <Text style={paragraph}>{t.closingTextFr}</Text>

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
