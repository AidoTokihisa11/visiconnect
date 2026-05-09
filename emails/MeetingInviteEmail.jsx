import * as React from 'react';
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Row,
  Column,
  Text,
  Hr,
  Font,
  Button,
  Link,
  Img,
} from '@react-email/components';

export const MeetingInviteEmail = ({
  inviteeName = "Tester",
}) => {
  return (
    <Html lang="es">
      <Head>
        <title>Tu acceso beta a VisioConnect está activo</title>
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
          fontWeight={700}
          fontStyle="normal"
        />
      </Head>
      <Preview>🎉 {inviteeName}, eres uno/una de los 15 — acceso beta a VisioConnect activado</Preview>

      <Body style={bodyStyle}>
        <Container style={containerStyle}>

          {/* ════════════════════════════════
              EN-TÊTE GRADIENT
          ════════════════════════════════ */}
          <Section style={headerStyle}>
            {/* Logo + nom */}
            <table role="presentation" width="100%" cellSpacing="0" cellPadding="0" style={{ borderCollapse: 'collapse' }}>
              <tr>
                <td style={{ textAlign: 'center', paddingBottom: '20px' }}>
                  <div style={logoBadgeStyle}>
                    <span style={logoLetterStyle}>V</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: 'center' }}>
                  <Text style={brandNameStyle}>VisioConnect</Text>
                  <div style={betaBadgeStyle}>
                    <span style={betaBadgeTextStyle}>● BETA PRIVADA</span>
                  </div>
                </td>
              </tr>
            </table>
          </Section>

          {/* ════════════════════════════════
              SALUTATION PERSONNALISÉE
          ════════════════════════════════ */}
          <Section style={greetingSection}>
            <table role="presentation" width="100%" cellSpacing="0" cellPadding="0" style={{ borderCollapse: 'collapse' }}>
              <tr>
                <td style={avatarCell}>
                  <div style={avatarCircle}>
                    <span style={avatarLetter}>{(inviteeName || 'T').charAt(0).toUpperCase()}</span>
                  </div>
                </td>
                <td style={greetingTextCell}>
                  <Text style={greetingLineStyle}>Hola {inviteeName},</Text>
                  <Text style={greetingSubStyle}>Bienvenido/a al círculo de pioneros de VisioConnect.</Text>
                </td>
              </tr>
            </table>
          </Section>

          <Section style={contentStyle}>

            {/* ── INTRO ── */}
            <Text style={introText}>
              Formas parte de las <strong style={{ color: '#1d4ed8' }}>15 personas cuidadosamente seleccionadas</strong> para probar VisioConnect antes de su lanzamiento público. Este proyecto representa <strong>3 años de trabajo</strong> — y tus comentarios son una condición directa para la validación de mi título.
            </Text>
            <Text style={introText}>
              <strong>Una sola consigna:</strong> lee el PDF adjunto <strong>de principio a fin</strong> antes de conectarte. Todo está ahí dentro — no hay nada que improvisar.
            </Text>
            <Text style={disclaimerText}>
              Es mi primer proyecto de envergadura, construido en solitario de principio a fin. Algunas funcionalidades pueden mostrarse caprichosas — a menudo basta con recargar la página para que todo vuelva a su sitio. Te agradezco de antemano tu paciencia y cada bug que me reportes.
            </Text>

            {/* ════════════════════════════════
                BLOC SÉLECTION BÊTA
            ════════════════════════════════ */}
            <Section style={codeWrapperStyle}>
              <table role="presentation" width="100%" cellSpacing="0" cellPadding="0" style={{ borderCollapse: 'collapse' }}>
                <tr>
                  <td style={{ textAlign: 'center', paddingBottom: '14px' }}>
                    <div style={codeLabelStyle}>
                      <span style={codeLabelTextStyle}>🏆 ACCESO PIONERO — BETA CERRADA</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: 'center', paddingBottom: '10px' }}>
                    <div style={codeBoxStyle}>
                      <Text style={{ ...codeTextStyle, fontSize: '15px', letterSpacing: '0px' }}>Eres uno/una de ellos.</Text>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: 'center' }}>
                    <Text style={codeSubtextStyle}>Acceso completo gratuito · Plan Pro de por vida tras el lanzamiento público</Text>
                  </td>
                </tr>
              </table>
            </Section>

            {/* ════════════════════════════════
                STATUT BÊTA
            ════════════════════════════════ */}
            <Section style={statusSectionStyle}>
              <table role="presentation" width="100%" cellSpacing="0" cellPadding="0" style={{ borderCollapse: 'collapse' }}>
                <tr>
                  <td style={statusIconCell}>
                    <div style={statusDotStyle} />
                  </td>
                  <td style={{ padding: '0' }}>
                    <Text style={statusTitleStyle}>Plataforma activa — lista para usar</Text>
                    <Text style={statusBodyStyle}>
                      Todo funciona. Crea tu cuenta, explora cada funcionalidad, anota lo que falla o lo que te impresiona. <strong style={{ color: '#15803d' }}>Cada observación cuenta.</strong>
                    </Text>
                  </td>
                </tr>
              </table>
            </Section>

            {/* ════════════════════════════════
                ÉTAPES DE CONNEXION
            ════════════════════════════════ */}
            <Section style={stepsWrapperStyle}>
              <Text style={sectionTitleStyle}>Empezar en 3 pasos</Text>

              {/* Etapa 1 */}
              <table role="presentation" width="100%" cellSpacing="0" cellPadding="0" style={{ borderCollapse: 'collapse', marginBottom: '16px' }}>
                <tr>
                  <td style={stepNumberCell}>
                    <div style={stepBubble}>1</div>
                  </td>
                  <td style={stepContentCell}>
                    <Text style={stepTitleStyle}>Lee la guía — es obligatorio</Text>
                    <Text style={stepBodyStyle}>
                      El PDF adjunto detalla cada misión: creación de cuenta, pruebas Stripe con tarjetas ficticias, lanzamiento de una videoconferencia. <strong>10 minutos de lectura = cero confusión.</strong>
                    </Text>
                  </td>
                </tr>
              </table>

              {/* Etapa 2 */}
              <table role="presentation" width="100%" cellSpacing="0" cellPadding="0" style={{ borderCollapse: 'collapse', marginBottom: '16px' }}>
                <tr>
                  <td style={stepNumberCell}>
                    <div style={stepBubble}>2</div>
                  </td>
                  <td style={stepContentCell}>
                    <Text style={stepTitleStyle}>Explora la plataforma sin reservas</Text>
                    <Text style={stepBodyStyle}>
                      Haz clic en todas partes. Prueba cada botón, cada página, cada formulario. <strong>Intenta romper algo</strong> — es exactamente lo que necesito.
                    </Text>
                    <Text style={stepBodyStyle}>
                      Para iniciar una videoconferencia: desde la página principal, haz clic en el botón <strong>«Unirse a la sala»</strong> — <strong>basta con un alias</strong>, sin códigos ni configuración. Entras y la sala está lista. Dentro, un botón <strong>«Invitar»</strong> genera un enlace para compartir al instante con un amigo o un familiar y probar a dos en condiciones reales.
                    </Text>
                  </td>
                </tr>
              </table>

              {/* Etapa 3 */}
              <table role="presentation" width="100%" cellSpacing="0" cellPadding="0" style={{ borderCollapse: 'collapse' }}>
                <tr>
                  <td style={stepNumberCell}>
                    <div style={stepBubble}>3</div>
                  </td>
                  <td style={stepContentCell}>
                    <Text style={stepTitleStyle}>Envíame tus comentarios</Text>
                    <Text style={stepBodyStyle}>
                      A través del formulario de Contacto o a <strong>theo.garces.aido@gmail.com</strong>. No hace falta un informe formal — <strong>3 líneas honestas valen más que un silencio educado.</strong>
                    </Text>
                  </td>
                </tr>
              </table>
            </Section>

            {/* ════════════════════════════════
                GUIDE PDF
            ════════════════════════════════ */}
            <Section style={guideBoxStyle}>
              <table role="presentation" width="100%" cellSpacing="0" cellPadding="0" style={{ borderCollapse: 'collapse' }}>
                <tr>
                  <td style={{ width: '36px', verticalAlign: 'top', paddingTop: '2px' }}>
                    <Text style={guideIconStyle}>📎</Text>
                  </td>
                  <td>
                    <Text style={guideTitleStyle}>📎 Guía beta oficial — en archivo adjunto</Text>
                    <Text style={guideBodyStyle}>
                      Tu único punto de referencia para esta beta. Léela <strong>antes</strong> de conectarte — todo está dentro, no hay nada que adivinar.
                    </Text>
                  </td>
                </tr>
              </table>
            </Section>

            {/* ════════════════════════════════
                BOUTONS CTA
            ════════════════════════════════ */}
            <Section style={ctaWrapperStyle}>
              <table role="presentation" width="100%" cellSpacing="0" cellPadding="0" style={{ borderCollapse: 'collapse' }}>
                <tr>
                  <td style={{ textAlign: 'center', paddingBottom: '12px' }}>
                    <Button href="https://visioconnect-1.vercel.app/" style={btnPrimaryStyle}>
                      Acceder a la plataforma
                    </Button>
                  </td>
                </tr>
              </table>
            </Section>

            {/* Liens de secours */}
            <Section style={fallbackSectionStyle}>
              <Text style={fallbackItemStyle}>
                Enlace directo:{' '}
                <Link href="https://visioconnect-1.vercel.app/" style={linkInlineStyle}>
                  visioconnect-1.vercel.app
                </Link>
              </Text>
              <Text style={fallbackItemStyle}>
                Contacto:{' '}
                <Link href="mailto:theo.garces.aido@gmail.com" style={linkInlineStyle}>
                  theo.garces.aido@gmail.com
                </Link>
              </Text>
            </Section>

            <Hr style={hrStyle} />

            {/* ── SIGNATURE ── */}
            <table role="presentation" width="100%" cellSpacing="0" cellPadding="0" style={{ borderCollapse: 'collapse', marginTop: '8px' }}>
              <tr>
                <td>
                  <Text style={signoffStyle}>
                    Leo cada comentario íntegramente. De verdad. Estas pocas horas de tu tiempo pueden cambiar la trayectoria de este proyecto — y la mía.
                  </Text>
                  <Text style={signoffStyle}>Gracias por formar parte de esta aventura,</Text>
                  <Text style={signoffTeamStyle}>Théo — Fundador y desarrollador de VisioConnect</Text>
                </td>
              </tr>
            </table>

          </Section>

          {/* ════════════════════════════════
              PIED DE PAGE
          ════════════════════════════════ */}
          <Section style={footerStyle}>
            <Text style={footerTaglineStyle}>
              Diseñado para una colaboración rápida, sencilla y segura.
            </Text>
            <Hr style={footerHrStyle} />
            <Text style={footerLegalStyle}>
              Recibes este correo tras una invitación directa a la beta de VisioConnect.
            </Text>
            <Text style={footerCopyrightStyle}>
              © {new Date().getFullYear()} VisioConnect — Todos los derechos reservados.
            </Text>
          </Section>

        </Container>
      </Body>
    </Html>
  );
};

// ══════════════════════════════════════════════
// STYLES
// ══════════════════════════════════════════════

const bodyStyle = {
  backgroundColor: '#eef2f7',
  fontFamily: '"Inter", "Helvetica Neue", Helvetica, Arial, sans-serif',
  padding: '32px 0 48px',
};

const containerStyle = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  maxWidth: '580px',
  borderRadius: '16px',
  overflow: 'hidden',
  boxShadow: '0 20px 60px rgba(30, 64, 175, 0.12), 0 4px 16px rgba(0,0,0,0.06)',
  border: '1px solid #dbeafe',
};

// ── HEADER ──
const headerStyle = {
  background: 'linear-gradient(150deg, #1e40af 0%, #1d4ed8 40%, #2563eb 70%, #3b82f6 100%)',
  padding: '44px 40px 36px',
  textAlign: 'center',
};

const logoBadgeStyle = {
  display: 'inline-block',
  width: '52px',
  height: '52px',
  borderRadius: '14px',
  backgroundColor: 'rgba(255,255,255,0.18)',
  border: '2px solid rgba(255,255,255,0.35)',
  margin: '0 auto',
  textAlign: 'center',
  lineHeight: '52px',
  verticalAlign: 'middle',
};

const logoLetterStyle = {
  color: '#ffffff',
  fontSize: '28px',
  fontWeight: '800',
  lineHeight: '52px',
  verticalAlign: 'middle',
  display: 'inline-block',
};

const brandNameStyle = {
  color: '#ffffff',
  fontSize: '26px',
  fontWeight: '800',
  letterSpacing: '-0.6px',
  margin: '12px 0 10px',
};

const betaBadgeStyle = {
  display: 'inline-block',
  backgroundColor: 'rgba(255,255,255,0.15)',
  border: '1px solid rgba(255,255,255,0.3)',
  borderRadius: '20px',
  padding: '4px 14px',
  margin: '0 auto',
};

const betaBadgeTextStyle = {
  color: '#bfdbfe',
  fontSize: '10px',
  fontWeight: '700',
  letterSpacing: '2px',
  textTransform: 'uppercase',
};

// ── GREETING BAND ──
const greetingSection = {
  backgroundColor: '#f0f7ff',
  borderBottom: '1px solid #dbeafe',
  padding: '20px 32px',
};

const avatarCell = {
  width: '60px',
  verticalAlign: 'middle',
  paddingRight: '14px',
};

const avatarCircle = {
  width: '42px',
  height: '42px',
  borderRadius: '50%',
  backgroundColor: '#1d4ed8',
  display: 'block',
  border: '3px solid #bfdbfe',
  textAlign: 'center',
  lineHeight: '42px',
};

const avatarLetter = {
  color: '#ffffff',
  fontSize: '20px',
  fontWeight: '700',
  lineHeight: '42px',
  verticalAlign: 'middle',
  display: 'inline-block',
};

const greetingTextCell = {
  verticalAlign: 'middle',
};

const greetingLineStyle = {
  color: '#1e3a8a',
  fontSize: '17px',
  fontWeight: '700',
  margin: '0 0 2px',
};

const greetingSubStyle = {
  color: '#3b82f6',
  fontSize: '13px',
  margin: '0',
};

// ── CONTENT ──
const contentStyle = {
  padding: '32px 36px 36px',
};

const introText = {
  color: '#374151',
  fontSize: '15px',
  lineHeight: '27px',
  margin: '0 0 28px',
};

const disclaimerText = {
  color: '#6b7280',
  fontSize: '13px',
  lineHeight: '22px',
  fontStyle: 'italic',
  margin: '-12px 0 28px',
  paddingLeft: '12px',
  borderLeft: '3px solid #e5e7eb',
};

// ── CODE BÊTA ──
const codeWrapperStyle = {
  background: 'linear-gradient(145deg, #0f172a 0%, #1e293b 100%)',
  borderRadius: '14px',
  padding: '28px 24px',
  marginBottom: '24px',
  border: '1px solid #334155',
};

const codeLabelStyle = {
  display: 'inline-block',
  backgroundColor: 'rgba(99,179,255,0.12)',
  border: '1px solid rgba(147,197,253,0.3)',
  borderRadius: '20px',
  padding: '5px 16px',
};

const codeLabelTextStyle = {
  color: '#7dd3fc',
  fontSize: '10px',
  fontWeight: '700',
  letterSpacing: '1.8px',
  textTransform: 'uppercase',
};

const codeBoxStyle = {
  backgroundColor: 'rgba(255,255,255,0.05)',
  border: '2px dashed rgba(147,197,253,0.4)',
  borderRadius: '10px',
  padding: '14px 20px',
  display: 'inline-block',
  margin: '0 auto',
};

const codeTextStyle = {
  color: '#ffffff',
  fontSize: '32px',
  fontWeight: '800',
  letterSpacing: '8px',
  fontFamily: '"Courier New", Courier, "Lucida Console", monospace',
  margin: '0',
  textAlign: 'center',
};

const codeSubtextStyle = {
  color: '#64748b',
  fontSize: '12px',
  margin: '4px 0 0',
  textAlign: 'center',
};

// ── STATUS ──
const statusSectionStyle = {
  backgroundColor: '#f0fdf4',
  border: '1.5px solid #86efac',
  borderRadius: '12px',
  padding: '18px 20px',
  marginBottom: '24px',
};

const statusIconCell = {
  width: '20px',
  verticalAlign: 'top',
  paddingTop: '4px',
  paddingRight: '12px',
};

const statusDotStyle = {
  width: '10px',
  height: '10px',
  borderRadius: '50%',
  backgroundColor: '#22c55e',
  boxShadow: '0 0 0 3px rgba(34,197,94,0.2)',
};

const statusTitleStyle = {
  color: '#15803d',
  fontSize: '14px',
  fontWeight: '700',
  margin: '0 0 6px',
};

const statusBodyStyle = {
  color: '#166534',
  fontSize: '13px',
  lineHeight: '22px',
  margin: '0',
};

// ── CALENDRIER ──
const calendarWrapperStyle = {
  marginBottom: '24px',
  border: '1px solid #e2e8f0',
  borderRadius: '12px',
  overflow: 'hidden',
};

const sectionTitleStyle = {
  color: '#1e3a8a',
  fontSize: '14px',
  fontWeight: '700',
  margin: '0 0 14px',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
};

const thStyleLeft = {
  padding: '10px 14px',
  backgroundColor: '#1e40af',
  color: '#ffffff',
  fontSize: '11px',
  fontWeight: '700',
  textAlign: 'left',
  letterSpacing: '0.5px',
  textTransform: 'uppercase',
};

const thStyleCenter = {
  padding: '10px 14px',
  backgroundColor: '#1e40af',
  color: '#ffffff',
  fontSize: '11px',
  fontWeight: '700',
  textAlign: 'center',
  letterSpacing: '0.5px',
  textTransform: 'uppercase',
};

const tdMainZone = {
  padding: '10px 14px',
  color: '#1e3a8a',
  fontSize: '13px',
  fontWeight: '600',
  borderBottom: '1px solid #e2e8f0',
};

const tdZoneStyle = {
  padding: '10px 14px',
  color: '#334155',
  fontSize: '13px',
  borderBottom: '1px solid #e2e8f0',
};

const tdCenter = {
  padding: '10px 14px',
  color: '#475569',
  fontSize: '13px',
  fontWeight: '500',
  textAlign: 'center',
  borderBottom: '1px solid #e2e8f0',
  borderLeft: '1px solid #e2e8f0',
};

const tdEndHighlight = {
  padding: '10px 14px',
  color: '#1d4ed8',
  fontSize: '13px',
  fontWeight: '700',
  textAlign: 'center',
  borderBottom: '1px solid #e2e8f0',
  borderLeft: '1px solid #e2e8f0',
};

// ── ÉTAPES ──
const stepsWrapperStyle = {
  backgroundColor: '#fafafa',
  border: '1px solid #e4e4e7',
  borderRadius: '12px',
  padding: '22px 22px 8px',
  marginBottom: '24px',
};

const stepNumberCell = {
  width: '36px',
  verticalAlign: 'top',
  paddingTop: '0px',
  paddingRight: '14px',
};

const stepBubble = {
  width: '32px',
  height: '32px',
  borderRadius: '50%',
  backgroundColor: '#1d4ed8',
  color: '#ffffff',
  fontSize: '14px',
  fontWeight: '700',
  display: 'inline-block',
  textAlign: 'center',
  lineHeight: '32px',
};

const stepContentCell = {
  verticalAlign: 'top',
  paddingBottom: '16px',
};

const stepTitleStyle = {
  color: '#1e3a8a',
  fontSize: '14px',
  fontWeight: '700',
  margin: '2px 0 6px',
};

const stepBodyStyle = {
  color: '#52525b',
  fontSize: '13px',
  lineHeight: '22px',
  margin: '0',
};

// ── GUIDE PDF ──
const guideBoxStyle = {
  backgroundColor: '#fffbeb',
  border: '1.5px solid #fcd34d',
  borderRadius: '12px',
  padding: '16px 20px',
  marginBottom: '28px',
};

const guideIconStyle = {
  fontSize: '20px',
  margin: '0',
};

const guideTitleStyle = {
  color: '#92400e',
  fontSize: '14px',
  fontWeight: '700',
  margin: '0 0 4px',
};

const guideBodyStyle = {
  color: '#78350f',
  fontSize: '13px',
  lineHeight: '22px',
  margin: '0',
};

// ── CTA ──
const ctaWrapperStyle = {
  marginBottom: '20px',
};

const btnPrimaryStyle = {
  backgroundColor: '#1d4ed8',
  backgroundImage: 'linear-gradient(135deg, #1d4ed8, #2563eb)',
  borderRadius: '10px',
  color: '#ffffff',
  display: 'inline-block',
  fontSize: '15px',
  fontWeight: '700',
  padding: '15px 36px',
  textDecoration: 'none',
  letterSpacing: '0.2px',
};

const btnSecondaryStyle = {
  backgroundColor: '#f8fafc',
  border: '2px solid #cbd5e1',
  borderRadius: '10px',
  color: '#1e3a8a',
  display: 'inline-block',
  fontSize: '14px',
  fontWeight: '600',
  padding: '13px 32px',
  textDecoration: 'none',
};

const fallbackSectionStyle = {
  marginBottom: '28px',
};

const fallbackTitleStyle = {
  color: '#94a3b8',
  fontSize: '11px',
  fontWeight: '600',
  margin: '0 0 4px',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
};

const fallbackItemStyle = {
  color: '#94a3b8',
  fontSize: '11px',
  margin: '0 0 2px',
};

const linkInlineStyle = {
  color: '#3b82f6',
  textDecoration: 'underline',
};

const hrStyle = {
  borderColor: '#e2e8f0',
  margin: '28px 0',
};

const signoffStyle = {
  color: '#52525b',
  fontSize: '14px',
  lineHeight: '24px',
  margin: '0 0 8px',
};

const signoffTeamStyle = {
  color: '#1d4ed8',
  fontSize: '15px',
  fontWeight: '700',
  margin: '0',
};

// ── FOOTER ──
const footerStyle = {
  backgroundColor: '#f1f5f9',
  borderTop: '1px solid #e2e8f0',
  padding: '24px 36px',
  textAlign: 'center',
};

const footerTaglineStyle = {
  color: '#475569',
  fontSize: '13px',
  fontWeight: '600',
  margin: '0 0 14px',
};

const footerHrStyle = {
  borderColor: '#e2e8f0',
  margin: '0 0 14px',
};

const footerLegalStyle = {
  color: '#94a3b8',
  fontSize: '11px',
  lineHeight: '17px',
  margin: '0 0 6px',
};

const footerCopyrightStyle = {
  color: '#64748b',
  fontSize: '11px',
  fontWeight: '700',
  margin: '0',
  letterSpacing: '0.5px',
};

// ── CITATION ──
const quoteWrapperStyle = {
  borderLeft: '4px solid #1d4ed8',
  backgroundColor: '#f0f7ff',
  borderRadius: '0 12px 12px 0',
  padding: '20px 24px',
  margin: '24px 0',
};

const quoteMarkStyle = {
  color: '#1d4ed8',
  fontSize: '48px',
  fontWeight: '800',
  lineHeight: '1',
  margin: '0 0 -8px',
  display: 'block',
};

const quoteTextStyle = {
  color: '#1e3a6e',
  fontSize: '15px',
  fontStyle: 'italic',
  fontWeight: '500',
  lineHeight: '1.7',
  margin: '0 0 10px',
};

const quoteAuthorStyle = {
  color: '#1d4ed8',
  fontSize: '12px',
  fontWeight: '700',
  letterSpacing: '0.5px',
  textTransform: 'uppercase',
  margin: '0',
};

export default MeetingInviteEmail;
