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
  previewText: "Mise à jour importante — Bêta VisioConnect",
  hello: "Bonjour",
  introText: "Nous vous informons que le lancement de la phase Bêta de VisioConnect, initialement prévu le 17 avril, est légèrement reporté.",
  reasonTitle: "Contexte de ce report",
  reasonText: "Lors de nos vérifications pré-déploiement, une instabilité serveur a été détectée. Notre engagement est de vous garantir une expérience fiable et sécurisée dès le premier jour. Nos équipes travaillent activement à consolider l'infrastructure.",
  newDateTitle: "Nouvelle date d'accès",
  newDateText: "La plateforme sera accessible <strong style=\"color: #1e3a8a;\">ce samedi, ou au plus tard dimanche, à partir de 10h30</strong>. Un email de confirmation vous sera envoyé dès que l'environnement sera opérationnel.<br/><br/>Pour compenser ce délai, <strong>votre accès bêta est prolongé jusqu'au 26 avril</strong>.",
  apologyText: "Nous vous présentons nos excuses pour ce contretemps. La qualité de votre expérience reste notre priorité absolue, et nous vous remercions sincèrement pour votre compréhension.",
  footerText: "Vous recevez cet email dans le cadre de votre participation à la bêta privée VisioConnect.",
  footerCopyright: "VisioConnect — L'excellence en visioconférence"
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
            <Text style={headerSubText}>COMMUNICATION OFFICIELLE</Text>
          </Section>

          {/* CORPS DU MESSAGE */}
          <Section style={content}>
            <Text style={greeting}>{t.hello} {inviteeName},</Text>
            
            <Text style={paragraph}>{t.introText}</Text>
            
            {/* ENCART RATIONALISÉ ET MODERNE */}
            <Section style={infoCard}>
              <Text style={cardTitle}>{t.reasonTitle}</Text>
              <Text style={cardText}>{t.reasonText}</Text>
              
              <Hr style={dividerSubtle} />
              
              <Text style={cardTitle}>{t.newDateTitle}</Text>
              <Text style={cardText} dangerouslySetInnerHTML={{ __html: t.newDateText }} />
            </Section>

            <Text style={paragraph}>{t.apologyText}</Text>
            
            <Text style={signoff}>
              Cordialement,<br />
              <span style={{ fontWeight: 600, color: '#2563eb', display: 'inline-block', marginTop: '6px' }}>L'équipe VisioConnect</span>
            </Text>
          </Section>
          <Section style={footer}>
            <Text style={footerText}>{t.footerText}</Text>
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
  marginBottom: '32px',
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

const signoff = {
  color: '#52525b',
  fontSize: '15px',
  lineHeight: '24px',
  margin: '0',
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
