const fs = require('fs');
let code = fs.readFileSync('client/src/hooks/useMeeting.js', 'utf8');

code = code.replace('return {\n    isAIEnhanced,\n    toggleAIVideoEngine,\n token, error };', 'return { token, error };');

if (!code.includes('isAIEnhanced,\n    toggleAIVideoEngine,')) {
    code = code.replace(/return \{\n    room,/, "return {\n    isAIEnhanced,\n    toggleAIVideoEngine,\n    room,");
}

fs.writeFileSync('client/src/hooks/useMeeting.js', code);
