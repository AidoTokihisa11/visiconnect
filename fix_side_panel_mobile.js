const fs = require('fs');
const path = 'client/src/components/room/ui/SidePanel.jsx';

if (!fs.existsSync(path)) {
  console.log("No side panel component found at " + path);
  process.exit(0);
}

let code = fs.readFileSync(path, 'utf8');

code = code.replace(/const PanelContainer = styled\.div`[\s\S]*?`;/, `const PanelContainer = styled.div\`
  width: 380px;
  background-color: \${THEME.panelBg};
  border-left: 1px solid \${THEME.border};
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: transform 0.3s ease-in-out;
  box-shadow: -4px 0 20px rgba(0, 0, 0, 0.2);
  z-index: 50;

  @media (max-width: 768px) {
    position: fixed;
    top: 60px; /* Below the top header */
    bottom: 80px; /* Above the bottom bar */
    left: 0;
    right: 0;
    width: 100%;
    height: auto;
    border-left: none;
    border-radius: 20px 20px 0 0;
    transform: translateY(\${props => (props.$isOpen ? '0' : '120%')});
    box-shadow: 0 -4px 30px rgba(0, 0, 0, 0.5);
    background-color: \${THEME.background};
    z-index: 100;
  }
\`;`);

fs.writeFileSync(path, code);
