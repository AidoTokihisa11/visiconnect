const fs = require('fs');

let content = fs.readFileSync('C:/Users/theog/Desktop/visiconnect/scripts/send-invites.tsx', 'utf-8');

// 1. Comment out the successful emails
content = content.replace(/const betaTesters = \[[\s\S]*?\];/, `const betaTesters = [
  // Déjà envoyés (commentés pour éviter les doublons) :
  // { name: "Andreas Dohin", email: "andreassan654@gmail.com", betaCode: "VC-QDKZ-JP8F" },
  // { name: "Yesmine Ben Dhaou", email: "yesminebendhaou@gmail.com", betaCode: "VC-JBQ4-LQDP" },
  // { name: "Leopold Brillet", email: "leopold.brillet@gmail.com", betaCode: "VC-XM53-IH7S" },
  // { name: "Alexandra Doucet", email: "alexandra.durman8@gmail.com", betaCode: "VC-H8RF-R1RT" },
  // { name: "Wisllor PIERRE SAINT", email: "kevallionkpg@gmail.com", betaCode: "VC-149B-PMSQ" },
  // { name: "Marine SEGURET", email: "msleeenss@gmail.com", betaCode: "VC-OPDK-JQ84" },
  // { name: "Maxine M", email: "kuroyasha.m@gmail.com", betaCode: "VC-GINM-6UDA" },
  // { name: "Maëlle Guillemet", email: "guillemet.maelle@gmail.com", betaCode: "VC-WLLZ-9Y0O" },
  // { name: "Isabelle DUCASSE", email: "isadgarces@gmail.com", betaCode: "VC-V8W2-VH59" },
  // { name: "Jacqueline Guillemet", email: "biotilande@sfr.fr", betaCode: "VC-AXDI-IGT5" },

  // Reste à envoyer (qui a échoué à cause du rate limit) :
  { name: "Mickaël Guillemet", email: "groovemachinenation@gmail.com", betaCode: "VC-IP4Q-SFSZ" }
];`);

// 2. Add delay
if (!content.includes('const delay')) {
  content = content.replace('for (const tester of betaTesters) {', 
    'const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));\n\n  for (const tester of betaTesters) {\n    await delay(300); // Pause de 300ms (max 5 requêtes par seconde)\n');
}

fs.writeFileSync('C:/Users/theog/Desktop/visiconnect/scripts/send-invites.tsx', content);
