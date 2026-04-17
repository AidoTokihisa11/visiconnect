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
  previewText: "Petite mise à jour sur la bêta VisioConnect",
  hello: "Salut",
  introText: "Petit message pour vous prévenir : le lancement de la bêta VisioConnect, prévu le 17 avril, prend un peu de retard.",
  reasonTitle: "Ce qui s'est passé",
  reasonText: "Pendant nos derniers tests, on a détecté une instabilité serveur. Plutôt que de vous lancer sur quelque chose de bancal, on préfère prendre quelques jours pour consolider le tout.",
  newDateTitle: "Nouvelle date",
  newDateText: "La plateforme sera accessible <strong style=\"color: #1e3a8a;\">ce samedi, ou au plus tard dimanche, dès 10h30</strong>. Vous recevrez un email dès que c'est bon.<br/><br/>Pour compenser ce délai, <strong>l'accès bêta est prolongé jusqu'au 26 avril</strong>.",
  apologyText: "Désolé pour ce petit contretemps. On préfère ça plutôt que de vous faire tester un truc qui plante. Merci pour votre patience !",
  footerText: "Vous recevez cet email car vous participez à la bêta privée.",
  footerCopyright: "VisioConnect — Fait avec ♥ par Théo"
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
            <Text style={headerSubText}>BÊTA PRIVÉE</Text>
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
              À très vite,<br />
              <span style={{ fontWeight: 600, color: '#2563eb', display: 'inline-block', marginTop: '6px' }}>Théo \u2014 VisioConnect</span>
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
