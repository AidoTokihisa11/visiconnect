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
  previewText: "Important update regarding the VisioConnect Beta",
  hello: "Hello",
  introText: "We are contacting you to inform you that the launch of the VisioConnect Beta phase, initially scheduled for April 17th, has been postponed.",
  reasonTitle: "Context of this postponement",
  reasonText: "During our pre-deployment checks, an unexpected server instability was detected. Our commitment is to guarantee you a completely smooth and secure experience for this Beta, and our developers are actively working to consolidate the infrastructure before granting access.",
  newDateTitle: "Schedule and access",
  newDateText: "The platform will consequently be accessible <strong style=\"color: #1e3a8a;\">this Saturday, or at the latest this Sunday, starting at 10:30 AM</strong>. A confirmation email will be sent to you as soon as the environment is fully operational.<br/><br/>To compensate for this delay, <strong>Beta access has been extended until April 26th</strong>.",
  apologyText: "We offer our sincere apologies for this delay. The quality of your experience remains our absolute priority, and we warmly thank you for your understanding.",
  footerText: "This message was sent to you as part of your participation in the private Beta.",
  footerCopyright: "VisioConnect — Communication excellence."
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
              The Management Team,<br />
              <span style={{ fontWeight: 600, color: '#2563eb', display: 'inline-block', marginTop: '6px' }}>VisioConnect</span>
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
