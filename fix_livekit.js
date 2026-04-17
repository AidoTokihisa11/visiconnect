const fs = require('fs');
const path = 'client/src/hooks/LiveKitEngine.js';

let code = fs.readFileSync(path, 'utf8');

code = code.replace(/track\.setVideoPriority\('high'\);/, `// track.setVideoPriority('high'); // Removed: setVideoPriority is not a function on RemoteTrack. Use publication.setVideoQuality(VideoQuality.HIGH) if needed.
      if (typeof publication.setVideoQuality === 'function') {
        publication.setVideoQuality(2); // VideoQuality.HIGH
      }`);

fs.writeFileSync(path, code);
