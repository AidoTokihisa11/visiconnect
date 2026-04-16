const fs = require('fs');

let umPath = 'C:/Users/theog/Desktop/visiconnect/client/src/hooks/useMeeting.js';
let content = fs.readFileSync(umPath, 'utf8');

if (!content.includes('setupAntiFreezeListeners')) {
  content = "import { setupAntiFreezeListeners } from './LiveKitEngine';\n" + content;
  
  // Inject inside the hook 
  content = content.replace(
    'const room = useRoomContext();',
    `const room = useRoomContext();\n\n  // WebRTC Anti-Freeze Optimization\n  useEffect(() => {\n    setupAntiFreezeListeners(room);\n  }, [room]);`
  );
  
  fs.writeFileSync(umPath, content);
}
