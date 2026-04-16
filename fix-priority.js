const fs = require('fs');

let path = 'C:/Users/theog/Desktop/visiconnect/client/src/hooks/LiveKitEngine.js';
let content = fs.readFileSync(path, 'utf8');

// Replace Track.Priority.High with 'high'
content = content.replace(/Track\.Priority\.High/g, "'high'");

fs.writeFileSync(path, content);
