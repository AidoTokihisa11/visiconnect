const fs = require('fs');
const path = require('path');

function replaceInFile(filePath, replacements) {
    let content = fs.readFileSync(filePath, 'utf8');
    for (const [search, replace] of replacements) {
        content = content.replace(search, replace);
    }
    fs.writeFileSync(filePath, content);
}

// 1. MeetingRoom.jsx
replaceInFile('src/components/room/MeetingRoom.jsx', [
    [/background: linear-gradient.*/g, 'background: ${THEME.bg};'],
    [/background-color: #f1f5f9;/g, 'background-color: ${THEME.bg};'],
    [/background-color: #ffffff;/g, 'background-color: ${THEME.cardBg};'],
]);

// 2. BottomControlBar.jsx
replaceInFile('src/components/room/BottomControlBar.jsx', [
    [/background-color: rgba\(255, 255, 255, 0.85\);/g, 'background-color: ${THEME.panelBg};'],
    [/border-top: 1px solid rgba\(226, 232, 240, 0.8\);/g, 'border-top: 1px solid ${THEME.border};'],
    [/background-color: \$\{props => props\.\$active \? props\.\$activeColor \|\| THEME\.accent : '#f1f5f9'\};/g, 'background-color: ${props => props.$active ? props.$activeColor || THEME.accent : THEME.cardBg};'],
    [/background-color: \$\{props => props\.\$active \? props\.\$activeColor : '#e2e8f0'\};/g, 'background-color: ${props => props.$active ? props.$activeColor : THEME.border};'],
]);

// 3. AnalyticsPanel.jsx
replaceInFile('src/components/room/AnalyticsPanel.jsx', [
    [/background: #ffffff;/g, 'background: ${THEME.cardBg};'],
    [/background: '#f8fafc'/g, "background: THEME.panelBg"],
    [/color: '#64748b'/g, "color: THEME.textDim"],
]);

// 4. VideoParticipant.jsx
replaceInFile('src/components/room/VideoParticipant.jsx', [
    [/background-color: #e2e8f0;/g, 'background-color: ${THEME.cardBg};'],
    [/background: linear-gradient.*/g, 'background: ${THEME.cardBg}; border: 1px solid ${THEME.border};'],
    [/background-color: rgba\(255, 255, 255, 0.95\);/g, 'background-color: ${THEME.panelBg};'],
]);

// 5. MeetingChat.jsx
replaceInFile('src/components/room/MeetingChat.jsx', [
    [/background-color: '#f8fafc';/g, "background-color: ${THEME.panelBg};"],
    [/background-color: '#ffffff';/g, "background-color: ${THEME.cardBg};"],
    [/background: \$\{\(props\) => \(props\.\$isMe \? `linear-gradient\(.*?\)` : '#e0e7ff'\)\};/g, "background: ${(props) => (props.$isMe ? THEME.accent : THEME.cardBg)};"],
    ["color: ${(props) => (props.$isMe ? '#ffffff' : '#1e293b')};", "color: ${(props) => (props.$isMe ? '#ffffff' : THEME.text)};"]
]);

console.log("Colors fixed!");
