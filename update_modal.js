const fs = require('fs');
const path = './client/src/components/CreateMeetingModal.jsx';

let code = fs.readFileSync(path, 'utf8');

// Replace handleSubmit logic
code = code.replace(
  '  const handleSubmit = () => {\n    // Ici on intégrerait avec l\'API\n    onClose();\n  };',
  `  const handleSubmit = () => {\n    const meetingId = Math.random().toString(36).slice(2, 11);\n    window.location.href = "/room/" + meetingId;\n    onClose();\n  };`
);

// Replace create meeting button
code = code.replace(
  'return `https://visio-pro.com/room/${meetingId}`;',
  'return `${window.location.origin}/room/${formData.title ? "room-" + Math.random().toString(36).slice(2,8) : "demo-pro-room"}`;'
);

fs.writeFileSync(path, code);
console.log('Modal updated.');
