import * as React from 'react';
import * as fs from 'fs';
import * as path from 'path';
import { Resend } from 'resend';
import { render } from '@react-email/components';
import { MeetingInviteEmail } from '../emails/MeetingInviteEmail';

// Fail fast : on refuse de démarrer si la clé n'est pas fournie via l'environnement.
const RESEND_API_KEY = process.env.RESEND_API_KEY;
if (!RESEND_API_KEY) {
  console.error('❌ RESEND_API_KEY manquante. Renseignez-la dans votre .env avant d\'exécuter ce script.');
  process.exit(1);
}
const resend = new Resend(RESEND_API_KEY);

// LISTE DES BÊTA TESTEURS À PERSONNALISER
// Chaque entrée : nom complet, email, et code bêta unique
const betaTesters = [
  { name: "Anthony Deamim", email: "deamim.contact@gmail.com" },
  { name: "Maëlle Guillemet", email: "guillemet.maelle@gmail.com" },
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
        />
      );

      // 2. Envoyer l'email
      const pdfPath = path.resolve(process.cwd(), 'client/public/Guide_beta_VisioConnect.pdf');
      const pdfContent = fs.readFileSync(pdfPath);

      const response = await resend.emails.send({
        from: 'VisioConnect <contact@visioconnect.pro>',
        to: tester.email,
        subject: `Votre accès exclusif à la bêta fermée de VisioConnect, ${tester.name} !`,
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
