const { Resend } = require('resend');
const { applyCors } = require('./_lib/cors');
const { rateLimit } = require('./_lib/rateLimit');
const { parseBody, schemas } = require('./_lib/schemas');

const OWNER_EMAIL = 'theo.garces.aido@gmail.com';

const PROFILE_LABELS = {
  developer: 'Développeur·se',
  designer: 'Designer UX/UI',
  pm: 'Product Manager',
  founder: 'Fondateur·trice',
  other: 'Autre',
};

const USAGE_LABELS = {
  'team-meetings': "Réunions d'équipe",
  'client-calls': 'Appels clients',
  education: 'Enseignement / formation',
  'dev-collab': 'Collaboration dev',
  other: 'Autre',
};

module.exports = async function handler(req, res) {
  if (applyCors(req, res)) return;
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  // 5 candidatures max / heure / IP
  if (rateLimit(req, res, { key: 'beta-apply', windowMs: 60 * 60_000, max: 5 })) return;

  const data = parseBody(schemas.betaApply, req, res);
  if (!data) return;

  const {
    firstName,
    lastName,
    email,
    profile,
    profileCustom,
    usage,
    usageCustom,
    tools,
    motivation,
  } = data;

  if (profile === 'other' && (!profileCustom || !profileCustom.trim())) {
    return res.status(400).json({ error: 'Veuillez préciser votre profil.' });
  }
  if (usage === 'other' && (!usageCustom || !usageCustom.trim())) {
    return res.status(400).json({ error: 'Veuillez préciser votre usage.' });
  }

  const fullName = `${firstName.trim()} ${lastName.trim()}`;
  const cleanEmail = email.trim().toLowerCase();
  const toolsStr =
    Array.isArray(tools) && tools.length > 0 ? tools.join(', ') : 'Aucun / pas encore';
  const profileLabel = profile === 'other' ? profileCustom.trim() : PROFILE_LABELS[profile];
  const usageLabel = usage === 'other' ? usageCustom.trim() : USAGE_LABELS[usage];
  const cleanMotivation = motivation.trim();

  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY manquante dans les variables d'environnement");
    return res.status(500).json({ error: 'Erreur de configuration serveur.' });
  }
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    // 1. Notification email to Théo
    await resend.emails.send({
      from: 'VisioConnect <contact@visioconnect.pro>',
      to: OWNER_EMAIL,
      subject: `🙋 Nouvelle candidature bêta — ${fullName}`,
      html: `
        <div style="font-family: -apple-system, system-ui, sans-serif; max-width: 580px; margin: 0 auto; padding: 32px 20px; background: #f8fafc;">
          <div style="background: linear-gradient(135deg, #1d4ed8, #2563eb); border-radius: 14px; padding: 24px 28px; margin-bottom: 20px;">
            <div style="font-size: 11px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: rgba(255,255,255,0.65); margin-bottom: 6px;">VisioConnect · Candidature bêta</div>
            <h1 style="color: white; font-size: 22px; font-weight: 700; margin: 0; line-height: 1.3;">Nouvelle candidature reçue</h1>
            <p style="color: rgba(255,255,255,0.75); font-size: 14px; margin: 8px 0 0;">${fullName} · ${cleanEmail}</p>
          </div>

          <div style="background: white; border-radius: 12px; padding: 24px 28px; margin-bottom: 16px; border: 1px solid #e2e8f0;">
            <h2 style="font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #94a3b8; margin: 0 0 18px;">Informations</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; color: #64748b; font-size: 13px; width: 130px; font-weight: 500;">Nom complet</td>
                <td style="padding: 10px 0; color: #0f172a; font-size: 14px; font-weight: 600;">${fullName}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; color: #64748b; font-size: 13px; font-weight: 500;">Email</td>
                <td style="padding: 10px 0;"><a href="mailto:${cleanEmail}" style="color: #2563eb; font-size: 14px; text-decoration: none;">${cleanEmail}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; color: #64748b; font-size: 13px; font-weight: 500;">Profil</td>
                <td style="padding: 10px 0; color: #0f172a; font-size: 14px;">${profileLabel}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; color: #64748b; font-size: 13px; font-weight: 500;">Usage prévu</td>
                <td style="padding: 10px 0; color: #0f172a; font-size: 14px;">${usageLabel}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #64748b; font-size: 13px; font-weight: 500;">Outils actuels</td>
                <td style="padding: 10px 0; color: #0f172a; font-size: 14px;">${toolsStr}</td>
              </tr>
            </table>
          </div>

          <div style="background: white; border-radius: 12px; padding: 24px 28px; border: 1px solid #e2e8f0;">
            <h2 style="font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #94a3b8; margin: 0 0 12px;">Motivation</h2>
            <p style="color: #334155; font-size: 14px; line-height: 1.75; margin: 0; white-space: pre-wrap;">${cleanMotivation}</p>
          </div>

          <div style="text-align: center; margin-top: 20px;">
            <a href="mailto:${cleanEmail}" style="display: inline-block; background: #2563eb; color: white; font-size: 13px; font-weight: 600; padding: 10px 22px; border-radius: 10px; text-decoration: none;">Répondre à ${firstName}</a>
          </div>
          <p style="color: #cbd5e1; font-size: 11px; text-align: center; margin: 20px 0 0;">© 2026 VisioConnect — candidature reçue via visioconnect.pro</p>
        </div>
      `,
    });

    // 2. Confirmation email to the applicant
    await resend.emails.send({
      from: 'Théo · VisioConnect <contact@visioconnect.pro>',
      to: cleanEmail,
      subject: 'Ta candidature est bien reçue — VisioConnect',
      html: `
        <div style="font-family: -apple-system, system-ui, sans-serif; max-width: 520px; margin: 0 auto; padding: 32px 20px; background: #f8fafc;">
          <div style="text-align: center; margin-bottom: 28px;">
            <div style="display: inline-block; background: #2563eb; border-radius: 10px; padding: 10px 22px; margin-bottom: 20px;">
              <span style="color: white; font-size: 15px; font-weight: 700; letter-spacing: -0.3px;">VisioConnect</span>
            </div>
            <h1 style="color: #0f172a; font-size: 24px; font-weight: 700; margin: 0 0 10px; line-height: 1.3;">Candidature reçue, merci ${firstName} !</h1>
            <p style="color: #64748b; font-size: 15px; margin: 0; line-height: 1.6;">J'ai bien reçu ta demande pour participer à la Vague 2 de la bêta.</p>
          </div>

          <div style="background: white; border-radius: 12px; padding: 24px 26px; margin-bottom: 16px; border: 1px solid #e2e8f0;">
            <p style="color: #334155; font-size: 15px; line-height: 1.8; margin: 0 0 14px;">
              Je lis chaque candidature moi-même, sans filtre automatique. Si tu es sélectionné(e) parmi les 15 personnes de cette vague, tu recevras un email directement de ma part avec ton code d'accès et les instructions.
            </p>
            <p style="color: #334155; font-size: 15px; line-height: 1.8; margin: 0;">
              Je ferai la sélection dans les prochains jours. En attendant, n'hésite pas à me répondre directement sur cet email si tu as des questions.
            </p>
          </div>

          <div style="background: #eff6ff; border-radius: 12px; padding: 18px 24px; margin-bottom: 16px; border: 1px solid #bfdbfe;">
            <p style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #3b82f6; margin: 0 0 10px;">Récap de ta candidature</p>
            <p style="color: #1e40af; font-size: 13px; margin: 0; line-height: 1.8;">
              <strong>Profil :</strong> ${profileLabel}<br/>
              <strong>Usage prévu :</strong> ${usageLabel}<br/>
              <strong>Outils actuels :</strong> ${toolsStr}
            </p>
          </div>

          <div style="text-align: center; padding: 10px 0;">
            <p style="color: #475569; font-size: 14px; font-style: italic; margin: 0 0 4px;">— Théo, développeur de VisioConnect</p>
            <p style="color: #94a3b8; font-size: 12px; margin: 0;">contact@visioconnect.pro</p>
          </div>

          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 22px 0;" />
          <p style="color: #cbd5e1; font-size: 11px; text-align: center; margin: 0;">© 2026 VisioConnect · Tu reçois cet email car tu as candidaté via visioconnect.pro</p>
        </div>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Resend error:', err);
    return res
      .status(500)
      .json({ error: "Erreur lors de l'envoi des emails. Veuillez réessayer." });
  }
};
