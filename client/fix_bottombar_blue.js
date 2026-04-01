const fs = require('fs');

let path = 'src/components/room/BottomControlBar.jsx';
let content = fs.readFileSync(path, 'utf8');

// The bottom bar wrapper
content = content.replace(/background-color: rgba\(255, 255, 255, 0\.95\);/g, "background-color: rgba(255, 255, 255, 0.85); backdrop-filter: blur(12px); border-top: 1px solid rgba(226, 232, 240, 0.8);");

// Buttons should be a soft blue instead of just grey when inactive
content = content.replace(/background-color: \$\{props => props\.\$active \? props\.\$activeColor \|\| THEME\.accent : THEME\.accentSoft\};/g, 
  "background-color: ${props => props.$active ? props.$activeColor || THEME.accent : '#f1f5f9'};");

// Default colors on hover for inactive buttons should glow blue slightly
content = content.replace(/background-color: \$\{props => props\.\$active \? props\.\$activeColor : THEME\.border\};/g, 
  "background-color: ${props => props.$active ? props.$activeColor : '#e2e8f0'};");

fs.writeFileSync(path, content);
