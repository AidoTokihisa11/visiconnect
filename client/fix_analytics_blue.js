const fs = require('fs');

let path = 'src/components/room/AnalyticsPanel.jsx';
let content = fs.readFileSync(path, 'utf8');

// Ensure nice blue cards for analytics
content = content.replace(/background: \$\{THEME\.cardBg\};/g, "background: #ffffff; box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.05);");
content = content.replace(/border: 1px solid \$\{THEME\.border\};/g, "border: 1px solid #e0e7ff;");
content = content.replace(/backgroundColor: "#ffffff"/g, "backgroundColor: '#ffffff'");

fs.writeFileSync(path, content);
