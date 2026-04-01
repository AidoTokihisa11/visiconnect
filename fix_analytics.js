const fs = require('fs');
let path = 'client/src/components/room/AnalyticsPanel.jsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(/background-color: rgb\(15 23 42 \/ 0\.5\);/g, 'background-color: ${THEME.panelBg};');
content = content.replace(/color: white;/g, 'color: ${THEME.text};');
content = content.replace(/background: rgba\(255, 255, 255, 0\.1\);/g, 'background: ${THEME.border};');
content = content.replace(/background: rgba\(30, 41, 59, 0\.7\);/g, 'background: ${THEME.cardBg};');
content = content.replace(/border: 1px solid rgba\(255, 255, 255, 0\.05\);/g, 'border: 1px solid ${THEME.border};');
content = content.replace(/color: #94a3b8;/g, 'color: ${THEME.textDim};');
content = content.replace(/color: white;/g, 'color: ${THEME.text};');
content = content.replace(/background: rgba\(30, 41, 59, 0\.5\);/g, 'background: ${THEME.cardBg};');
content = content.replace(/color: #cbd5e1;/g, 'color: ${THEME.text};');
content = content.replace(/stroke="#334155"/g, 'stroke="#e2e8f0"');
content = content.replace(/backgroundColor: '#1e293b'/g, 'backgroundColor: "#ffffff"');
content = content.replace(/color: '#e2e8f0'/g, 'color: "#1e293b"');
content = content.replace(/background: 'rgba\(255,255,255,0\.03\)'/g, "background: '#f8fafc'");

// Add theme import
if (!content.includes('ROOM_THEME')) {
    content = content.replace(/import \{ motion \} from 'framer-motion';/, "import { motion } from 'framer-motion';\nimport { ROOM_THEME as THEME } from '../../styles/roomTheme';");
}

fs.writeFileSync(path, content);
