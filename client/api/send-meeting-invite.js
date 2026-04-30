const { Resend } = require('resend');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  const { email, name, meetingId, meetingTitle, meetingLink, date, startTime } = req.body || {};

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return res.status(400).json({ error: 'Email invalide.' });
  }
  if (!meetingLink) {
    return res.status(400).json({ error: 'Lien de réunion manquant.' });
  }

  const resend = new Resend(process.env.RESEND_API_KEY || 're_f7CXkPZ1_FouifSQZycKkbcStAoZkGgW8');
  const displayName = name || email.split('@')[0];
  const title = meetingTitle || 'Réunion VisiConnect';

  let dateInfo = '';
  if (date) {
    const d = new Date(date);
    const formatted = d.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    dateInfo = `<p style="margin:4px 0; color:#64748b; font-size:14px;">📅 ${formatted}${startTime ? ' à ' + startTime : ''}</p>`;
  }

  try {
    await resend.emails.send({
      from: 'VisiConnect <contact@visioconnect.pro>',
      to: email,
      subject: `📹 Invitation : ${title}`,
      html: `
        <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 520px; margin: 0 auto; background: #f8faff; padding: 32px 24px; border-radius: 20px;">

          <!-- Logo / Brand -->
          <div style="text-align: center; margin-bottom: 28px;">
            <div style="display: inline-block; background: #2563eb; border-radius: 12px; padding: 10px 20px;">
              <span style="color: white; font-size: 18px; font-weight: 700; letter-spacing: -0.5px;">VisiConnect</span>
            </div>
          </div>

          <!-- Card -->
          <div style="background: white; border-radius: 16px; border: 1px solid #dbeafe; padding: 28px; box-shadow: 0 4px 20px rgba(37,99,235,0.08);">
            <h1 style="color: #0f172a; font-size: 20px; font-weight: 700; margin: 0 0 6px;">Vous êtes invité(e) à une réunion</h1>
            <p style="color: #64748b; font-size: 14px; margin: 0 0 20px;">Bonjour ${displayName}, vous avez été invité(e) à rejoindre :</p>

            <div style="background: #eff6ff; border-left: 4px solid #2563eb; border-radius: 8px; padding: 14px 16px; margin-bottom: 20px;">
              <p style="margin: 0 0 4px; color: #1e40af; font-weight: 700; font-size: 16px;">📹 ${title}</p>
              ${dateInfo}
              <p style="margin: 4px 0 0; color: #64748b; font-size: 13px; font-family: monospace;">ID : ${meetingId || ''}</p>
            </div>

            <!-- CTA Button -->
            <div style="text-align: center; margin: 24px 0 16px;">
              <a href="${meetingLink}" style="display: inline-block; background: linear-gradient(135deg, #2563eb, #1d4ed8); color: white; text-decoration: none; padding: 14px 32px; border-radius: 12px; font-weight: 700; font-size: 16px; letter-spacing: -0.2px; box-shadow: 0 4px 14px rgba(37,99,235,0.35);">
                Rejoindre la réunion →
              </a>
            </div>

            <p style="color: #94a3b8; font-size: 12px; text-align: center; margin: 12px 0 0;">
              Ou copiez ce lien : <span style="color: #2563eb;">${meetingLink}</span>
            </p>
          </div>

          <p style="color: #94a3b8; font-size: 12px; text-align: center; margin-top: 20px;">
            © ${new Date().getFullYear()} VisiConnect · Cet email vous a été envoyé automatiquement
          </p>
        </div>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Resend invite error:', err);
    return res.status(500).json({ error: "Erreur lors de l'envoi de l'invitation." });
  }
};
