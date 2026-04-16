const fs = require('fs');

let contentParticipant = fs.readFileSync('C:/Users/theog/Desktop/visiconnect/client/src/components/room/VideoParticipant.jsx', 'utf-8');

// Add React.memo to VideoParticipant
if (!contentParticipant.includes('export const VideoParticipant = React.memo(')) {
    contentParticipant = contentParticipant.replace('export const VideoParticipant = ({', 'export const VideoParticipant = React.memo(({');
    // Find the end of the component
    contentParticipant = contentParticipant.replace(/\);\n};\n?$/, ');\n});\n');
    fs.writeFileSync('C:/Users/theog/Desktop/visiconnect/client/src/components/room/VideoParticipant.jsx', contentParticipant);
}

let contentGrid = fs.readFileSync('C:/Users/theog/Desktop/visiconnect/client/src/components/room/VideoGrid.jsx', 'utf-8');
// Fix track.publication.sid which might cause unmounts if it's undefined initially
contentGrid = contentGrid.replace(/const key = \`\$\{track\.participant\.identity\}-\$\{track\.publication\?\.sid \|\| track\.source\}\`;/g, 
"const key = `${track.participant.identity}-${track.source}`;");
fs.writeFileSync('C:/Users/theog/Desktop/visiconnect/client/src/components/room/VideoGrid.jsx', contentGrid);

