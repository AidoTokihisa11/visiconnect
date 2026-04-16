const fs = require('fs');
const pf = 'C:/Users/theog/Desktop/visiconnect/client/src/components/room/VideoParticipant.jsx';
let content = fs.readFileSync(pf, 'utf8');

// Remove VideoPlayer component
content = content.replace(/export const VideoPlayer = React\.memo\(\(\{[\s\S]*?VideoPlayer\.displayName = 'VideoPlayer';\n*/, '');

// Restore VideoTrack logic in VideoParticipant
content = content.replace(/<VideoPlayer[\s\S]*?\/>/, `<VideoTrack
          trackRef={trackRef}
          playsInline={true}
          disablePictureInPicture={true}
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: videoFit,
            transform: 'translateZ(0)', 
            willChange: 'transform, opacity',
            backfaceVisibility: 'hidden'
          }} 
        />`);

fs.writeFileSync(pf, content);
