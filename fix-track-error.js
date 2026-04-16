const fs = require('fs');
const pf = 'C:/Users/theog/Desktop/visiconnect/client/src/components/room/VideoParticipant.jsx';
let content = fs.readFileSync(pf, 'utf8');

content = content.replace(
  /track=\{trackRef\?\.publication\?\.track \?\? trackRef\?\.track \?\? trackRef\}/g,
  "track={trackRef?.publication?.videoTrack ?? trackRef?.publication?.track ?? trackRef?.track ?? (typeof trackRef?.attach === 'function' ? trackRef : null)}"
);

fs.writeFileSync(pf, content);
