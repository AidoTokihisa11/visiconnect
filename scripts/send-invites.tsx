import * as React from 'react';
import { Resend } from 'resend';
import { render } from '@react-email/components';
import { MeetingInviteEmail } from '../emails/MeetingInviteEmail';
import * as fs from 'fs';
import * as path from 'path';

// Le token Resend actuel (ou process.env.RESEND_API_KEY)
const resend = new Resend('re_f7CXkPZ1_FouifSQZycKkbcStAoZkGgW8');

// LISTE DES BÊTA TESTEURS À PERSONNALISER
const betaTesters = [
  { name: "Andreas Dohin", email: "andreassan654@gmail.com", betaCode: "VC-QDKZ-JP8F" },
  { name: "Yesmine Ben Dhaou", email: "yesminebendhaou@gmail.com", betaCode: "VC-JBQ4-LQDP" },
  { name: "Leopold Brillet", email: "leopold.brillet@gmail.com", betaCode: "VC-XM53-IH7S" },
  { name: "Alexandra Doucet", email: "alexandra.durman8@gmail.com", betaCode: "VC-H8RF-R1RT" },
  { name: "Wisllor PIERRE SAINT", email: "kevallionkpg@gmail.com", betaCode: "VC-149B-PMSQ" },
  { name: "Marine SEGURET", email: "msleeenss@gmail.com", betaCode: "VC-OPDK-JQ84" },
  { name: "Maxine M", email: "kuroyasha.m@gmail.com", betaCode: "VC-GINM-6UDA" },
  { name: "Maëlle Guillemet", email: "guillemet.maelle@gmail.com", betaCode: "VC-WLLZ-9Y0O" },
  { name: "Isabelle DUCASSE", email: "isadgarces@gmail.com", betaCode: "VC-V8W2-VH59" },
  { name: "Jacqueline Guillemet", email: "biotilande@sfr.fr", betaCode: "VC-AXDI-IGT5" },
  { name: "Mickaël Guillemet", email: "groovemachinenation@gmail.com", betaCode: "VC-IP4Q-SFSZ" }
];

async function sendInvites() {
  console.log(`��� Début de l'envoi des invitations bêta pour ${betaTesters.length} utilisateur(s)...`);

  // Vérifier la pièce jointe
  const pdfPath = path.join(__dirname, '../server/public/Guide_Beta_VisioConnect.pdf');
  const attachments = [];
  if (fs.existsSync(pdfPath)) {
    const pdfBuffer = fs.readFileSync(pdfPath);
    attachments.push({
      filename: 'Guide_Beta_VisioConnect.pdf',
      content: pdfBuffer,
    });
    console.log(`��� Pièce jointe PDF trouvée !`);
  } else {
    console.warn(`⚠️ Attention : PDF non trouvé (${pdfPath})`);
  }

  for (const tester of betaTesters) {
    try {
      console.log(`⏳ Envoi à ${tester.name} (${tester.email})...`);
      
      // 1. Rendre l'email avec les données personnalisées du testeur
      const emailHtml = await render(
        <MeetingInviteEmail 
          inviteeName={tester.name} 
          betaCode={tester.betaCode} 
        />
      );

      // 2. Envoyer l'email
      const response = await resend.emails.send({
        from: 'VisioConnect <contact@visioconnect.pro>',
        to: tester.email,
        subject: 'Votre accès exclusif à la Bêta de VisioConnect',
        html: emailHtml,
        attachments: attachments.length > 0 ? attachments : undefined
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      console.log(`✅ Succès pour ${tester.name} ! (ID: ${response.data?.id || 'Envoyé'})`);    
    } catch (error) {
      console.error(`❌ Échec pour ${tester.name}:`, error);
    }
  }
  
  console.log('��� Terminé !');
}

sendInvites();
