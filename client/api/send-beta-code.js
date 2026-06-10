const { Resend } = require('resend');
const { applyCors } = require('./_lib/cors');
const { rateLimit } = require('./_lib/rateLimit');
const { parseBody, schemas } = require('./_lib/schemas');

const ALLOWED_TESTERS = [
  { name: 'Alex Suárez', email: 'alex.suarez.garce@hotmail.com' },
  { name: 'Eduardo Guzman', email: 'drguzmangarces@gmail.com' },
  { name: 'Paulina Garces', email: 'paulygarces27@gmail.com' },
  { name: 'Cris Guzman', email: 'ggmariacris@gmail.com' },
  { name: 'Ma.Augusta Suarez', email: 'magusuarez@gmail.com' },
  { name: 'Jose Garces', email: 'josegarces70@hotmail.com' },
  { name: 'Paquito Garces', email: 'jgarces29@gmail.com' },
  { name: 'Leopold Brillet', email: 'leopold.brillet@gmail.com' },
  { name: 'Rozenn Guillemet', email: 'roz.guill07@gmail.com' },
  { name: 'Maxine M', email: 'kuroyasha.m@gmail.com' },
  { name: 'Jacqueline Guillemet', email: 'biotilande@sfr.fr' },
  { name: 'Marco Luciano', email: 'lucianomarco74@gmail.com' },
  { name: 'Amelie Durant', email: 'amelied68@gmail.com' },
  { name: 'Andreas Dohin', email: 'andreas.dohin@laposte.net' },
  { name: 'Yesmine Ben Dhaou', email: 'yesminebendhaou@gmail.com' },
  { name: 'Marine Seguret', email: 'msleeenss@gmail.com' },
  { name: 'Wisllor Pierre Saint', email: 'wisllor.pierresaint@gmail.com' },
  { name: 'Mickaël Guillemet', email: 'mikka@netcourrier.com' },
  { name: 'Maëlle Guillemet', email: 'guillemet.maelle@gmail.com' },
  { name: 'Alexandra Doucet', email: 'alexandra.durman8@gmail.com' },
  { name: 'Théo Garces', email: 'theogarces33@gmail.com' },
  { name: 'Isabelle Garces', email: 'isadgarces@gmail.com' },
];

const CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

function generateBetaCode() {
  const { randomInt } = require('crypto');
  const rand = (n) => {
    let s = '';
    for (let i = 0; i < n; i++) s += CHARS[randomInt(0, CHARS.length)];
    return s;
  };
  return `VC-${rand(4)}-${rand(4)}`;
}

module.exports = async function handler(req, res) {
  if (applyCors(req, res)) return;
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  // 3 demandes / 10 minutes / IP pour limiter l'\u00e9num\u00e9ration d'emails.
  if (rateLimit(req, res, { key: 'beta-code', windowMs: 10 * 60_000, max: 3 })) return;

  const data = parseBody(schemas.sendBetaCode, req, res);
  if (!data) return;

  const normalized = data.email.trim().toLowerCase();
  const tester = ALLOWED_TESTERS.find((t) => t.email.toLowerCase() === normalized);

  // R\u00e9ponse uniforme pour ne pas r\u00e9v\u00e9ler les emails enregistr\u00e9s
  if (!tester) {
    return res.status(200).json({ success: true });
  }

  const newCode = generateBetaCode();

  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY manquante dans les variables d'environnement.");
    return res.status(500).json({ error: 'Erreur de configuration serveur.' });
  }
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    await resend.emails.send({
      from: 'VisioConnect <contact@visioconnect.pro>',
      to: tester.email,
      subject: '🔑 Votre nouveau code bêta VisioConnect',
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 24px; background: #f8fafc; border-radius: 16px;">
          <div style="text-align: center; margin-bottom: 24px;">
            <div style="display: inline-block; background: #2563eb; border-radius: 12px; padding: 10px 18px; margin-bottom: 16px;">
              <span style="color: white; font-size: 18px; font-weight: 700;">VisioConnect</span>
            </div>
            <h1 style="color: #0f172a; font-size: 22px; font-weight: 700; margin: 0 0 8px;">Votre nouveau code bêta</h1>
            <p style="color: #64748b; font-size: 15px; margin: 0;">Bonjour ${tester.name}, voici votre code d'accès régénéré.</p>
          </div>
          <div style="background: white; border: 2px dashed #2563eb; border-radius: 12px; padding: 24px; text-align: center; margin-bottom: 24px;">
            <p style="color: #94a3b8; font-size: 11px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; margin: 0 0 8px;">Code d'accès bêta</p>
            <span style="font-family: monospace; font-size: 28px; font-weight: 800; color: #2563eb; letter-spacing: 4px;">${newCode}</span>
          </div>
          <p style="color: #64748b; font-size: 13px; text-align: center; margin: 0;">Copiez ce code et collez-le sur la page de la room pour accéder à VisioConnect.</p>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
          <p style="color: #94a3b8; font-size: 12px; text-align: center; margin: 0;">© 2026 VisioConnect — Accès bêta-testeur</p>
        </div>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Resend error:', err);
    return res.status(500).json({ error: "Erreur lors de l'envoi de l'email." });
  }
};
