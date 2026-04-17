const fs = require('fs');
const path = 'client/src/hooks/LiveKitEngine.js';

let code = fs.readFileSync(path, 'utf8');

// There is another problem: createLocalVideoTrack doesn't exist on livekit-client
// Also 'priority: "high"' inside publishTrack options might cause issues. We need to import VideoQuality instead of hardcoding 2 (although 2 works).

code = code.replace(/import \{ RoomEvent, VideoPresets, Track, createLocalVideoTrack \} from 'livekit-client';/, 
`import { RoomEvent, VideoPresets, Track, createLocalVideoTrack, VideoQuality } from 'livekit-client';`);

// Fix publication.setVideoQuality to use Enum just to be clean
code = code.replace(/publication\.setVideoQuality\(2\); \/\/ VideoQuality\.HIGH/, 
`publication.setVideoQuality(VideoQuality.HIGH);`);

fs.writeFileSync(path, code);
