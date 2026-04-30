import * as React from 'react';
import * as fs from 'fs';
import * as path from 'path';
import { Resend } from 'resend';
import { render } from '@react-email/components';
import { MeetingInviteEmail } from '../emails/MeetingInviteEmail';

// Le token Resend actuel (ou process.env.RESEND_API_KEY)
const resend = new Resend('re_f7CXkPZ1_FouifSQZycKkbcStAoZkGgW8');

// LISTE DES BÊTA TESTEURS À PERSONNALISER
// Chaque entrée : nom complet, email, et code bêta unique
const betaTesters = [
  { name: "Marlène Avonture", email: "avonture.marlene@gmail.com", betaCode: "VC-VXWX-O47D" },
  { name: "Gab Maxxx", email: "gabmaxx@gmail.com", betaCode: "VC-YCXT-4XEH" },
  { name: "Anthony De Amim", email: "deamim.contact@gmail.com", betaCode: "VC-NIUV-LT9V" },
];

async function sendInvites() {
  console.log(`\n🚀 Début de l'envoi des invitations bêta pour ${betaTesters.length} utilisateur(s)...`);
  
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  for (const tester of betaTesters) {
    await delay(300); // Pause de 300ms (max de requêtes)
    
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
      const pdfPath = path.resolve(process.cwd(), 'server/public/Guide_officiel__Bta_Prive_VisioConnect.pdf');
      const pdfContent = fs.readFileSync(pdfPath);

      const response = await resend.emails.send({
        from: 'VisioConnect <contact@visioconnect.pro>',
        to: tester.email,
        subject: `🔑 Votre accès bêta VisioConnect est actif — Code : ${tester.betaCode}`,
        html: emailHtml,
        attachments: [
          {
            filename: 'Guide_Beta_VisioConnect.pdf',
            content: pdfContent,
          }
        ]
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
