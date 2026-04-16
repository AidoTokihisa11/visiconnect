import * as React from 'react';
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Text,
  Button,
  Hr,
  Link,
  Font
} from '@react-email/components';

const t = {
  previewText: "Your exclusive beta access code to VisioConnect",
  restrictedAccess: "Restricted Beta Access",
  hello: "Hello",
  almostThere: "You are almost there!",
  testerPart1: "You are among the first official testers chosen by",
  testerPart2: ". Access to the platform is currently secured by a nominative code found below. It will give you access to the meeting",
  betaCodeTitle: "Your Beta Access Code",
  copyPasteText: "To be copied and pasted during your first login.",
  warningTitle: "⚠️ Important Warning",
  warningText: "Please <strong>do not log in before Friday, April 17 at 10:30 AM (CET)</strong>. A premature connection could cause conflicts on our end during the final development phase.",
  calendarTitle: "🗓️ Beta Calendar (Start - End):",
  calendarEU: "<strong>France / Spain / Italy :</strong> April 17 10:30 AM — April 24 12:30 AM",
  calendarPT: "<strong>Portugal :</strong> April 17 09:30 AM — April 23 11:30 PM",
  calendarUS: "<strong>United States (EST) :</strong> April 17 04:30 AM — April 23 06:30 PM",
  calendarEC: "<strong>Ecuador :</strong> April 17 03:30 AM — April 23 05:30 PM",
  stepsTitle: "Steps to follow:",
  step1Title: "1. Create your account:",
  step1Text: "Sign up on the platform instantly with <strong>Google</strong> or <strong>GitHub</strong>.",
  step1Or: "Or via classic email:",
  step1OrText: "Receive a <strong>6-digit code</strong> by email to verify your identity.",
  step2Title: "2. Validate the beta code:",
  step2Text: "Paste or enter the exclusive code written above to unlock the app.",
  pdfTitle: "📎 Beta Guide Included:",
  pdfText: "To support you, we have included your official PDF guide as an <strong>attachment to this email</strong>. Open it to discover your exclusive testing missions!",
  btnJoin: "Join the meeting",
  btnDiscover: "Discover the site",
  backupLinks: "Backup links:",
  meetingLink: "Meeting:",
  siteLink: "Site:",
  footerText: "Built for fast, simple, and secure collaboration.",
  footerCopyright: "VisioConnect. You are receiving this email following a direct invitation."
};

export const MeetingInviteEmail = ({
  inviteeName = "Theo",
  hostName = "The VisioConnect Team",
  roomLink = "https://visioconnect-1.vercel.app/room/demo-123",
  roomName = "Point de Synchronisation",
  betaCode = "VC-T5OS-ITU5"
}) => {

  return (
    <Html>
      <Head>
        <title>Invitation Bêta - VisioConnect</title>
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
      </Head>
      <Preview>{t.previewText}</Preview>
      <Body style={{ backgroundColor: '#f4f4f5', fontFamily: 'Inter, Helvetica, Arial, sans-serif', padding: '20px 0' }}>
        <Container style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', margin: '0 auto', maxWidth: '600px', overflow: 'hidden' }}>
          
          {/* EN-TÊTE */}
          <Section style={{ backgroundColor: '#2563eb', padding: '40px 20px', textAlign: 'center' }}>
            <Text style={{ color: '#ffffff', fontSize: '32px', fontWeight: 'bold', margin: '0' }}>
              VisioConnect
            </Text>
            <Text style={{ color: '#bfdbfe', fontSize: '12px', fontWeight: 'bold', letterSpacing: '2px', textTransform: 'uppercase', margin: '10px 0 0 0' }}>
              {t.restrictedAccess}
            </Text>
          </Section>
          
          <Section style={{ padding: '30px 40px' }}>
            <Text style={{ color: '#1e3a8a', fontSize: '20px', fontWeight: 'bold', marginBottom: '24px' }}>
              {t.hello} {inviteeName},
            </Text>
            
            <Text style={{ color: '#3b82f6', fontWeight: 'bold', fontSize: '16px', marginBottom: '8px' }}>
              {t.almostThere}
            </Text>
            <Text style={{ color: '#475569', fontSize: '16px', lineHeight: '24px', margin: '0' }}>
              {t.testerPart1} <strong>{hostName}</strong>{t.testerPart2} <strong style={{ color: '#2563eb' }}>{roomName}</strong>.
            </Text>

            {/* CODE BÊTA */}
            <Section style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '8px', padding: '30px', margin: '30px 0', textAlign: 'center' }}>
              <Text style={{ color: '#1e3a8a', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', margin: '0 0 10px 0' }}>
                {t.betaCodeTitle}
              </Text>
              <Text style={{ color: '#1e40af', fontSize: '32px', fontFamily: 'monospace', fontWeight: 'bold', letterSpacing: '4px', margin: '0' }}>
                {betaCode}
              </Text>
              <Hr style={{ borderColor: '#93c5fd', margin: '20px auto', width: '50px' }} />
              <Text style={{ color: '#60a5fa', fontSize: '12px', fontStyle: 'italic', margin: '0' }}>
            {t.copyPasteText}
          </Text>
        </Section>

        {/* AVERTISSEMENT IMPORTANT */}
        <Section style={{ backgroundColor: '#fffbeb', border: '1px solid #fcd34d', borderLeft: '4px solid #f59e0b', borderRadius: '4px', padding: '20px', marginBottom: '30px' }}>
          <Text style={{ color: '#b45309', fontSize: '16px', fontWeight: 'bold', margin: '0 0 10px 0' }}>
            {t.warningTitle}
          </Text>
          <Text style={{ color: '#78350f', fontSize: '14px', lineHeight: '22px', margin: '0 0 15px 0' }} dangerouslySetInnerHTML={{ __html: t.warningText }} />
          
          <Hr style={{ borderColor: '#fde68a', margin: '15px 0' }} />
          
          <Text style={{ color: '#92400e', fontSize: '14px', fontWeight: 'bold', margin: '0 0 10px 0' }}>
            {t.calendarTitle}
          </Text>
          <Text style={{ color: '#78350f', fontSize: '13px', lineHeight: '24px', margin: '0' }}>
            <span dangerouslySetInnerHTML={{ __html: t.calendarEU }} /><br/>
            <span dangerouslySetInnerHTML={{ __html: t.calendarPT }} /><br/>
            <span dangerouslySetInnerHTML={{ __html: t.calendarUS }} /><br/>
            <span dangerouslySetInnerHTML={{ __html: t.calendarEC }} />
          </Text>
        </Section>

        {/* INSTRUCTIONS DE COMPTE */}
            <Text style={{ color: '#1e3a8a', fontSize: '18px', fontWeight: 'bold', margin: '40px 0 20px 0' }}>
              {t.stepsTitle}
            </Text>

            <Section style={{ padding: '20px', backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', marginBottom: '30px' }}>
              <Text style={{ color: '#334155', fontSize: '15px', lineHeight: '24px', margin: '0 0 15px 0' }}>
                <strong style={{ color: '#0f172a' }}>{t.step1Title}</strong><br/> 
                <span dangerouslySetInnerHTML={{ __html: t.step1Text }} />
              </Text>
              <Hr style={{ borderColor: '#f1f5f9', margin: '15px 0' }} />
              <Text style={{ color: '#334155', fontSize: '15px', lineHeight: '24px', margin: '0 0 15px 0' }}>
                <strong style={{ color: '#0f172a' }}>{t.step1Or}</strong><br/>
                <span dangerouslySetInnerHTML={{ __html: t.step1OrText }} />
              </Text>
              <Hr style={{ borderColor: '#f1f5f9', margin: '15px 0' }} />
              <Text style={{ color: '#334155', fontSize: '15px', lineHeight: '24px', margin: '0' }}>
                <strong style={{ color: '#0f172a' }}>{t.step2Title}</strong><br/>
                {t.step2Text}
              </Text>
            </Section>

            {/* MENTION DU PDF JOINT */}
            <Section style={{ backgroundColor: '#f0fdfa', border: '1px solid #ccfbf1', borderLeft: '4px solid #14b8a6', borderRadius: '4px', padding: '15px', marginBottom: '30px' }}>
              <Text style={{ color: '#0f766e', fontSize: '14px', lineHeight: '22px', margin: '0' }}>
                <strong>{t.pdfTitle}</strong> <span dangerouslySetInnerHTML={{ __html: t.pdfText }} />
              </Text>
            </Section>

            {/* BOUTONS D'ACTION */}
            <Section style={{ textAlign: 'center', marginBottom: '20px' }}>
              {/* Utilisation de balises a classiques pour une meilleure compatibilité des boutons côte à côte */}
              <a href={roomLink} style={{ backgroundColor: '#2563eb', color: '#ffffff', padding: '14px 24px', borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold', display: 'inline-block', margin: '10px 10px' }}>
                {t.btnJoin}
              </a>
              <a href="https://visioconnect-1.vercel.app/" style={{ backgroundColor: '#ffffff', color: '#2563eb', border: '2px solid #2563eb', padding: '12px 24px', borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold', display: 'inline-block', margin: '10px 10px' }}>
                {t.btnDiscover}
              </a>
            </Section>

            <Text style={{ color: '#94a3b8', fontSize: '12px', textAlign: 'center', marginTop: '30px' }}>
              {t.backupLinks}<br />
              {t.meetingLink} <Link href={roomLink} style={{ color: '#3b82f6', textDecoration: 'underline' }}>{roomLink}</Link><br />
              {t.siteLink} <Link href="https://visioconnect-1.vercel.app/" style={{ color: '#3b82f6', textDecoration: 'underline' }}>https://visioconnect-1.vercel.app/</Link>
            </Text>
          </Section>

          {/* PIED DE PAGE */}
          <Section style={{ backgroundColor: '#f8fafc', padding: '30px', textAlign: 'center', borderTop: '1px solid #e2e8f0' }}>
            <Text style={{ color: '#64748b', fontSize: '14px', fontWeight: 'bold', margin: '0' }}>
              VisioConnect
            </Text>
            <Text style={{ color: '#94a3b8', fontSize: '12px', margin: '5px 0 20px 0' }}>
              {t.footerText}
            </Text>
            <Text style={{ color: '#94a3b8', fontSize: '10px', margin: '0' }}>
              © {new Date().getFullYear()} {t.footerCopyright}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default MeetingInviteEmail;
