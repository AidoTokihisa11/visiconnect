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
  {
    name: "rozenn guillemet",
    email: "theogarces33@gmail.com",
    betaCode: "VC-4G5I-NN83"
  },
  // Tu peux ajouter d'autres testeurs ici :
  // { name: "Alice", email: "alice@exemple.com", betaCode: "VC-ALI-4567" },
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
