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

export const MeetingInviteEmail = ({
  inviteeName = "Theo",
  hostName = "L'équipe VisioConnect",
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
      <Preview>Votre code d'accès exclusif à la bêta de VisioConnect</Preview>
      <Body style={{ backgroundColor: '#f4f4f5', fontFamily: 'Inter, Helvetica, Arial, sans-serif', padding: '20px 0' }}>
        <Container style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', margin: '0 auto', maxWidth: '600px', overflow: 'hidden' }}>
          
          {/* EN-TÊTE */}
          <Section style={{ backgroundColor: '#2563eb', padding: '40px 20px', textAlign: 'center' }}>
            <Text style={{ color: '#ffffff', fontSize: '32px', fontWeight: 'bold', margin: '0' }}>
              VisioConnect
            </Text>
            <Text style={{ color: '#bfdbfe', fontSize: '12px', fontWeight: 'bold', letterSpacing: '2px', textTransform: 'uppercase', margin: '10px 0 0 0' }}>
              Accès Bêta Restreint
            </Text>
          </Section>
          
          <Section style={{ padding: '30px 40px' }}>
            <Text style={{ color: '#1e3a8a', fontSize: '20px', fontWeight: 'bold', marginBottom: '24px' }}>
              Bonjour {inviteeName},
            </Text>
            
            <Text style={{ color: '#3b82f6', fontWeight: 'bold', fontSize: '16px', marginBottom: '8px' }}>
              Vous y êtes presque !
            </Text>
            <Text style={{ color: '#475569', fontSize: '16px', lineHeight: '24px', margin: '0' }}>
              Vous faites partie des premiers testeurs officiels choisis par <strong>{hostName}</strong>. 
              L'accès à la plateforme est actuellement sécurisé par un code nominatif que vous trouverez ci-dessous. Il vous donnera accès à la réunion <strong style={{ color: '#2563eb' }}>{roomName}</strong>.
            </Text>

            {/* CODE BÊTA */}
            <Section style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '8px', padding: '30px', margin: '30px 0', textAlign: 'center' }}>
              <Text style={{ color: '#1e3a8a', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', margin: '0 0 10px 0' }}>
                Votre Code d'Accès Bêta
              </Text>
              <Text style={{ color: '#1e40af', fontSize: '32px', fontFamily: 'monospace', fontWeight: 'bold', letterSpacing: '4px', margin: '0' }}>
                {betaCode}
              </Text>
              <Hr style={{ borderColor: '#93c5fd', margin: '20px auto', width: '50px' }} />
              <Text style={{ color: '#60a5fa', fontSize: '12px', fontStyle: 'italic', margin: '0' }}>
            À copier puis à coller lors de votre première connexion.
          </Text>
        </Section>

        {/* AVERTISSEMENT IMPORTANT */}
        <Section style={{ backgroundColor: '#fffbeb', border: '1px solid #fcd34d', borderLeft: '4px solid #f59e0b', borderRadius: '4px', padding: '20px', marginBottom: '30px' }}>
          <Text style={{ color: '#b45309', fontSize: '16px', fontWeight: 'bold', margin: '0 0 10px 0' }}>
            ⚠️ Avertissement Important
          </Text>
          <Text style={{ color: '#78350f', fontSize: '14px', lineHeight: '22px', margin: '0 0 15px 0' }}>
            Merci de <strong>ne pas vous connecter avant le vendredi 17 avril à 10h30</strong>. Une connexion prématurée pourrait engendrer des conflits de notre côté pendant la phase finale de développement.
          </Text>
          
          <Hr style={{ borderColor: '#fde68a', margin: '15px 0' }} />
          
          <Text style={{ color: '#92400e', fontSize: '14px', fontWeight: 'bold', margin: '0 0 10px 0' }}>
            🗓️ Calendrier de la Bêta (Début - Fin) :
          </Text>
          <Text style={{ color: '#78350f', fontSize: '13px', lineHeight: '24px', margin: '0' }}>
            <strong>France / Espagne / Italie :</strong> 17 Avril 10h30 — 24 Avril 00h30<br/>
            <strong>Portugal :</strong> 17 Avril 09h30 — 23 Avril 23h30<br/>
            <strong>États-Unis (Heure de l'Est) :</strong> 17 Avril 04h30 — 23 Avril 18h30<br/>
            <strong>Équateur :</strong> 17 Avril 03h30 — 23 Avril 17h30
          </Text>
        </Section>

        {/* INSTRUCTIONS DE COMPTE */}
            <Text style={{ color: '#1e3a8a', fontSize: '18px', fontWeight: 'bold', margin: '40px 0 20px 0' }}>
              La démarche à suivre :
            </Text>

            <Section style={{ padding: '20px', backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', marginBottom: '30px' }}>
              <Text style={{ color: '#334155', fontSize: '15px', lineHeight: '24px', margin: '0 0 15px 0' }}>
                <strong style={{ color: '#0f172a' }}>1. Créez votre compte :</strong><br/> 
                Inscrivez-vous sur la plateforme instantanément avec <strong>Google</strong> ou <strong>GitHub</strong>.
              </Text>
              <Hr style={{ borderColor: '#f1f5f9', margin: '15px 0' }} />
              <Text style={{ color: '#334155', fontSize: '15px', lineHeight: '24px', margin: '0 0 15px 0' }}>
                <strong style={{ color: '#0f172a' }}>Ou par e-mail classique :</strong><br/>
                Recevez un <strong>code à 6 chiffres</strong> par e-mail pour vérifier votre identité.
              </Text>
              <Hr style={{ borderColor: '#f1f5f9', margin: '15px 0' }} />
              <Text style={{ color: '#334155', fontSize: '15px', lineHeight: '24px', margin: '0' }}>
                <strong style={{ color: '#0f172a' }}>2. Validez le code bêta :</strong><br/>
                Collez ou saisissez le code exclusif écrit plus haut pour débloquer l'application.
              </Text>
            </Section>

            {/* MENTION DU PDF JOINT */}
            <Section style={{ backgroundColor: '#f0fdfa', border: '1px solid #ccfbf1', borderLeft: '4px solid #14b8a6', borderRadius: '4px', padding: '15px', marginBottom: '30px' }}>
              <Text style={{ color: '#0f766e', fontSize: '14px', lineHeight: '22px', margin: '0' }}>
                <strong>📎 Guide Bêta Inclus :</strong> Pour vous accompagner, nous avons glissé en <strong>pièce jointe de cet e-mail</strong> votre guide officiel au format PDF. Ouvrez-le pour découvrir vos missions de test exclusives !
              </Text>
            </Section>

            {/* BOUTONS D'ACTION */}
            <Section style={{ textAlign: 'center', marginBottom: '20px' }}>
              {/* Utilisation de balises a classiques pour une meilleure compatibilité des boutons côte à côte */}
              <a href={roomLink} style={{ backgroundColor: '#2563eb', color: '#ffffff', padding: '14px 24px', borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold', display: 'inline-block', margin: '10px 10px' }}>
                Rejoindre la réunion
              </a>
              <a href="https://visioconnect-1.vercel.app/" style={{ backgroundColor: '#ffffff', color: '#2563eb', border: '2px solid #2563eb', padding: '12px 24px', borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold', display: 'inline-block', margin: '10px 10px' }}>
                Découvrir le site
              </a>
            </Section>

            <Text style={{ color: '#94a3b8', fontSize: '12px', textAlign: 'center', marginTop: '30px' }}>
              Liens de secours :<br />
              Réunion : <Link href={roomLink} style={{ color: '#3b82f6', textDecoration: 'underline' }}>{roomLink}</Link><br />
              Site : <Link href="https://visioconnect-1.vercel.app/" style={{ color: '#3b82f6', textDecoration: 'underline' }}>https://visioconnect-1.vercel.app/</Link>
            </Text>
          </Section>

          {/* PIED DE PAGE */}
          <Section style={{ backgroundColor: '#f8fafc', padding: '30px', textAlign: 'center', borderTop: '1px solid #e2e8f0' }}>
            <Text style={{ color: '#64748b', fontSize: '14px', fontWeight: 'bold', margin: '0' }}>
              VisioConnect
            </Text>
            <Text style={{ color: '#94a3b8', fontSize: '12px', margin: '5px 0 20px 0' }}>
              Conçu pour une collaboration rapide, simple et sécurisée.
            </Text>
            <Text style={{ color: '#94a3b8', fontSize: '10px', margin: '0' }}>
              © {new Date().getFullYear()} VisioConnect. Vous recevez cet e-mail suite à une invitation directe.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default MeetingInviteEmail;
