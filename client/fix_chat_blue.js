const fs = require('fs');
let path = 'src/components/room/MeetingChat.jsx';
let content = fs.readFileSync(path, 'utf8');

// Update chat scrollbar and panel backgrounds to be more distinctive
content = content.replace(/background-color: \$\{THEME.panelBg\};/g, "background-color: '#f8fafc'; // slightly off-white for depth");
content = content.replace(/background-color: #ffffff;/g, "background-color: '#ffffff';");

// Update chat bubbles for "others" to have a nicer gentle blue background
content = content.replace(/THEME.accentSoft\)\};/g, "THEME.accentSoft)};");
content = content.replace(/background: \$\{\(props\) => \(props\.\$isMe \? \`linear-gradient\(135deg, \$\{THEME\.accent\}, #0043a8\)\` : THEME\.accentSoft\)\};/g, 
  "background: ${(props) => (props.$isMe ? `linear-gradient(135deg, ${THEME.accent}, #1d4ed8)` : '#e0e7ff')};");
content = content.replace(/border: 1px solid \$\{\(props\) => \(props\.\$isMe \? 'transparent' : THEME\.border\)\};/g, 
  "border: 1px solid ${(props) => (props.$isMe ? 'transparent' : '#bfdbfe')};"); // softer blue border
content = content.replace(/color: \$\{\(props\) => \(props\.\$isMe \? '#ffffff' : THEME\.text\)\};/g, 
  "color: ${(props) => (props.$isMe ? '#ffffff' : '#1e3a8a')};"); // Deep blue text for better contrast in soft blue bubble

fs.writeFileSync(path, content);
