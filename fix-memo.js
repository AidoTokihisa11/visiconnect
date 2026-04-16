const fs = require('fs');

let content = fs.readFileSync('C:/Users/theog/Desktop/visiconnect/client/src/components/room/VideoParticipant.jsx', 'utf-8');

// Replace start
content = content.replace(/export const VideoParticipant = React\.memo\(\(\{/, 'export const VideoParticipant = ({'); // Restore first
content = content.replace(/export const VideoParticipant = \(\{/, 'export const VideoParticipant = React.memo(({');

// Replace end
content = content.replace(/    <\/CardContainer>\r?\n  \);\r?\n\};\r?\n?/g, '    </CardContainer>\n  );\n});\n');

fs.writeFileSync('C:/Users/theog/Desktop/visiconnect/client/src/components/room/VideoParticipant.jsx', content);

