import * as React from 'react';
import { Resend } from 'resend';
import { render } from '@react-email/components';
import { MeetingInviteEmail } from '../emails/MeetingInviteEmail';

// Le token Resend actuel (ou process.env.RESEND_API_KEY)
const resend = new Resend('re_f7CXkPZ1_FouifSQZycKkbcStAoZkGgW8');

// LISTE DES BÊTA TESTEURS À PERSONNALISER
const betaTesters = [
  { name: "Alex Suárez", email: "alex.suarez.garce@hotmail.com" },
  { name: "Eduardo Guzman", email: "drguzmangarces@gmail.com" },
  { name: "Paulina Garces", email: "paulygarces27@gmail.com" },
  { name: "Cris Guzman", email: "ggmariacris@gmail.com" },
  { name: "Ma.Augusta Suarez", email: "magusuarez@gmail.com" },
  { name: "Jose Garces", email: "josegarces70@hotmail.com" },
  { name: "Paquito Garces", email: "jgarces29@gmail.com" },
  { name: "Leopold Brillet", email: "leopold.brillet@gmail.com" },
  { name: "rozenn Guillemet", email: "roz.guill07@gmail.com" },
  { name: "Maxine M", email: "kuroyasha.m@gmail.com" },
  { name: "Jacqueline Guillemet", email: "biotilande@sfr.fr" },
  { name: "Marco Luciano", email: "Lucianomarco74@gmail.com" },
  { name: "Amelie Durant", email: "Amelied68@gmail.com" },
  { name: "Andreas Dohin", email: "andreas.dohin@laposte.net" },
  { name: "Yesmine Ben Dhaou", email: "Yesminebendhaou@gmail.com" },
  { name: "Marine SEGURET", email: "msleeenss@gmail.com" },
  { name: "Wisllor PIERRE SAINT", email: "wisllor.pierresaint@gmail.com" },
  { name: "Mickaël Guillemet", email: "mikka@netcourrier.com" },
  { name: "Maëlle Guillemet", email: "guillemet.maelle@gmail.com" },
  { name: "Alexandra Doucet", email: "Alexandra.durman8@gmail.com" },
  { name: "Théo Garces", email: "theogarces33@gmail.com" },
  { name: "Isabelle Garces", email: "isadgarces@gmail.com" }
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
