const fs = require('fs');
const path = 'client/src/components/room/MeetingChat.jsx';
let c = fs.readFileSync(path, 'utf8');

// Replace scrollbar
c = c.replace(
  /background-color: rgba\(30, 41, 59, 1\);/g,
  `background-color: ${'\\${THEME.border}'};`
);

// Replace bubble backgrounds & borders
c = c.replace(
  /background: \$\{\(props\) => \(props\.\$isMe \? `linear-gradient\(135deg, \$\{THEME\.accent\}, #4f46e5\)` : 'rgba\(30, 41, 59, 0\.6\)'\)\};/,
  `background: ${(props) => (props.$isMe ? \`linear-gradient(135deg, \${THEME.accent}, #2563eb)\` : THEME.accentSoft)};`
);

c = c.replace(
  /border: 1px solid \$\{\(props\) => \(props\.\$isMe \? 'transparent' : 'rgba\(51, 65, 85, 0\.5\)'\)\};/,
  `border: 1px solid ${(props) => (props.$isMe ? 'transparent' : THEME.border)};`
);

// Replace InputWrapper background & border
c = c.replace(
  /background-color: rgba\(15, 23, 42, 0\.6\);/,
  `background-color: #ffffff;`
);

c = c.replace(
  /border: 1px solid rgba\(51, 65, 85, 0\.8\);/,
  `border: 1px solid ${'\\${THEME.border}'};`
);

// Replace Input Wrapper focus 
c = c.replace(
  /box-shadow: 0 0 0 3px rgba\(79, 70, 229, 0\.15\);/,
  `box-shadow: 0 0 0 3px ${'\\${THEME.ring}'};`
);

c = c.replace(
  /background-color: rgba\(15, 23, 42, 0\.9\);/,
  `background-color: #ffffff;`
);

// Replace SendButton defaults
c = c.replace(
  /background: \$\{\(props\) => \(props\.\$active \? THEME\.accent : 'rgba\(51, 65, 85, 0\.5\)'\)\};/,
  `background: ${(props) => (props.$active ? THEME.accent : THEME.accentSoft)};`
);

c = c.replace(
  /&:hover \{\s+background: \$\{\(props\) => \(props\.\$active \? '#4338ca' : 'rgba\(51, 65, 85, 0\.5\)'\)\};/m,
  `&:hover {\n    background: ${(props) => (props.$active ? THEME.accentHover : THEME.border)};`
);

fs.writeFileSync(path, c);
