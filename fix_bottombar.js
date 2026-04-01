const fs = require('fs');

let path = 'client/src/components/room/BottomControlBar.jsx';
let content = fs.readFileSync(path, 'utf8');

// Replace dark nav backgrounds
content = content.replace(/background-color: rgba\(12, 35, 64, 0\.95\);/, 'background-color: rgba(255, 255, 255, 0.95);');
content = content.replace(/background-color: \$\{props => props\.\$active \? props\.\$activeColor : '#214875'\};/, "background-color: ${props => props.$active ? props.$activeColor : THEME.border};");
content = content.replace(/color: \$\{props => props\.\$active \? '#fff' : THEME\.text\};/, "color: ${props => props.$active ? '#fff' : THEME.text};");

fs.writeFileSync(path, content);
