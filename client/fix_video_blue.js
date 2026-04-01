const fs = require('fs');

let path = 'src/components/room/VideoParticipant.jsx';
let content = fs.readFileSync(path, 'utf8');

// The main video card skeleton back
content = content.replace(/background-color: \\#cbd5e1;/g, "background-color: #e2e8f0;"); 
// Placeholder when no video
content = content.replace(/background-color: \$\{THEME.cardBg\};/g, "background: linear-gradient(135deg, #f8fafc, #e2e8f0); border: 1px solid #cbd5e1;");

fs.writeFileSync(path, content);
