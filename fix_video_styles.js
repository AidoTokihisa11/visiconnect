const fs = require('fs');

// Fix VideoGrid.jsx
let gridPath = 'client/src/components/room/VideoGrid.jsx';
let gridContent = fs.readFileSync(gridPath, 'utf8');
gridContent = gridContent.replace(/background-color: rgba\(30, 41, 59, 1\);/, 'background-color: \\#cbd5e1;');
fs.writeFileSync(gridPath, gridContent);


// Fix VideoParticipant.jsx
let partPath = 'client/src/components/room/VideoParticipant.jsx';
let partContent = fs.readFileSync(partPath, 'utf8');

partContent = partContent.replace(/background-color: #0b203b;/, 'background-color: \\#cbd5e1;');
partContent = partContent.replace(/background-color: rgba\(12, 35, 64, 0\.92\);/g, 'background-color: rgba(255, 255, 255, 0.95);');

// adjust box shadow for badges
partContent = partContent.replace(/box-shadow: 0 4px 6px -1px rgba\(0, 0, 0, 0\.1\), 0 2px 4px -1px rgba\(0, 0, 0, 0\.06\);/, 'box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);');

fs.writeFileSync(partPath, partContent);
