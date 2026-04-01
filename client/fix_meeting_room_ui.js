const fs = require('fs');

let path = 'src/components/room/MeetingRoom.jsx';
let content = fs.readFileSync(path, 'utf8');

// The main room wrapper
content = content.replace(/background: white;/g, "background: linear-gradient(135deg, #f0f4f8 0%, #e2e8f0 100%);");
content = content.replace(/background-color: \$\{THEME.bg\};/g, "background-color: #f1f5f9;"); 

// Right panel tweaks
content = content.replace(/background-color: \$\{THEME.cardBg\};/g, "background-color: #ffffff;"); 
// Let's add a slight shadow / tint to the entire panel
content = content.replace(/border-left: 1px solid \$\{THEME.border\};/g, "border-left: 1px solid #cbd5e1; box-shadow: -4px 0 20px rgba(37, 99, 235, 0.05);");

fs.writeFileSync(path, content);
