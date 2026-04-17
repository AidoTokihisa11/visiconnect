const fs = require('fs');
const path = 'client/src/components/room/MeetingRoom.jsx';

let code = fs.readFileSync(path, 'utf8');

// Update SidePanel styles
code = code.replace(/const SidePanel = styled\(motion\.div\)`[\s\S]*?`;/, `const SidePanel = styled(motion.div)\`
  width: \${props => props.wide ? '600px' : '400px'};
  background-color: \${THEME.panelBg};
  border-left: 1px solid #cbd5e1;
  display: flex;
  flex-direction: column;
  height: 100%;
  box-shadow: -8px 0 24px rgba(29, 78, 216, 0.16);
  z-index: 50;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;

  @media (max-width: 768px) {
    width: 100%;
    /* Keep it slightly above the mobile bottom bar */
    height: calc(100% - 90px);
    border-radius: 20px 20px 0 0;
    box-shadow: 0 -4px 30px rgba(0, 0, 0, 0.3);
    top: auto;
    bottom: 90px;
    z-index: 55;
    border-left: none;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }
\`;`);


// Update WhiteboardOverlay styles
code = code.replace(/const WhiteboardOverlay = styled\(motion\.div\)`[\s\S]*?`;/, `const WhiteboardOverlay = styled(motion.div)\`
  position: absolute;
  top: 72px; /* Height of header */
  left: 0;
  right: 0;
  bottom: 80px; /* Desktop bottom bar height */
  background: \${THEME.bg};
  z-index: 40;

  @media (max-width: 768px) {
    top: 60px; /* Mobile header height */
    bottom: 90px; /* Mobile bottom bar */
  }
\`;`);

fs.writeFileSync(path, code);
