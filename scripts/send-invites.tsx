import * as React from 'react';
import { Resend } from 'resend';
import { render } from '@react-email/components';
import { MeetingInviteEmail } from '../emails/MeetingInviteEmail';

// Le token Resend actuel (ou process.env.RESEND_API_KEY)
const resend = new Resend('re_f7CXkPZ1_FouifSQZycKkbcStAoZkGgW8');

// LISTE DES BÊTA TESTEURS À PERSONNALISER
const betaTesters = [
  { name: "Rozenn Guillemet", email: "roz.guill07@gmail.com", betaCode: "VC-QDKZ-JP8F" },
];

async function sendInvites() {
  console.log(`��� Début de l'envoi des invitations bêta pour ${betaTesters.length} utilisateur(s)...`);
  for (const tester of betaTesters) {
    try {
      console.log(`⏳ Envoi à ${tester.name} (${tester.email})...`);
      
      // 1. Rendre l'email avec les données personnalisées du testeur
      const emailHtml = await render(
        <MeetingInviteEmail 
          inviteeName={tester.name} 
        />
      );

      // 2. Envoyer l'email
      const response = await resend.emails.send({
        from: 'VisioConnect <contact@visioconnect.pro>',
        to: tester.email,
        subject: 'Mise à jour concernant la Bêta de VisioConnect',
        html: emailHtml
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
