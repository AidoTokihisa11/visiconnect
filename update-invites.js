const fs = require('fs');

let content = fs.readFileSync('C:/Users/theog/Desktop/visiconnect/scripts/send-invites.tsx', 'utf-8');

// 1. Remove fs and path imports
content = content.replace(/import \* as fs from 'fs';\nimport \* as path from 'path';\n/g, '');

// 2. Replace betaTesters array
const newTesters = `const betaTesters = [
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
];`;
content = content.replace(/const betaTesters = \[[\s\S]*?\];/g, newTesters);

// 3. Remove PDF attachment logic
content = content.replace(/\s*\/\/ Vérifier la pièce jointe[\s\S]*?console\.warn[^\n]*\n  \}\n/g, '');

// 4. Remove betaCode pass down in render
content = content.replace(/\s*betaCode=\{tester\.betaCode\}/g, '');

// 5. Update subject
content = content.replace(/'Votre accès exclusif à la Bêta de VisioConnect'/g, "'Mise à jour concernant la Bêta de VisioConnect'");

// 6. Remove attachments from resend options
content = content.replace(/,\s*attachments:\s+attachments\.length > 0 \? attachments : undefined/g, '');

fs.writeFileSync('C:/Users/theog/Desktop/visiconnect/scripts/send-invites.tsx', content);
