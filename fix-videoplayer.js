const fs = require('fs');

let vpPath = 'C:/Users/theog/Desktop/visiconnect/client/src/components/room/VideoParticipant.jsx';
let content = fs.readFileSync(vpPath, 'utf8');

// We add VideoPlayer inside the VideoParticipant instead of the original LiveKit VideoTrack.

const videoPlayerComponent = `
export const VideoPlayer = React.memo(({ track, isLocal = false, videoFit = 'cover' }) => {
  const videoEl = React.useRef(null);

  React.useEffect(() => {
    if (!videoEl.current || !track) return;

    const el = videoEl.current;

    // 1. Attachement natif WebRTC (Contourne l'attribut srcObject de React)
    const attachedElement = track.attach(el);

    // 2. Offloading GPU (Force la création d'un calque de composition matériel)
    attachedElement.style.willChange = 'transform, opacity';
    attachedElement.style.backfaceVisibility = 'hidden';
    attachedElement.style.objectFit = videoFit;
    
    // Accélération 3D : L'utilisation de translateZ(0) pousse le rendu sur le GPU
    attachedElement.style.transform = isLocal 
      ? 'scaleX(-1) translateZ(0)' // Mode miroir pour la caméra locale
      : 'translateZ(0)';

    // Cleanup critique : Évite la surcharge du garbage collector et les fuites de mémoire
    return () => {
      if (track) {
        track.detach(el);
      }
      // Réinitialise le flux pour s'assurer que l'élément vidéo est purgé
      el.srcObject = null;
    };
  }, [track, isLocal, videoFit]);

  return (
    <div 
      className="video-container-zero-render" 
      style={{ 
        width: '100%', 
        height: '100%', 
        backgroundColor: '#050505',
        contain: 'strict'
      }}
    >
      <video 
        ref={videoEl} 
        autoPlay 
        playsInline 
        muted={isLocal} 
        style={{ width: '100%', height: '100%', display: 'block' }}
      />
    </div>
  );
});

VideoPlayer.displayName = 'VideoPlayer';
`;

if(!content.includes('export const VideoPlayer')) {
  // Replace <VideoTrack /> with <VideoPlayer />
  content = content.replace(
    /<VideoTrack[\s\S]*?\/>/,
    `<VideoPlayer
          track={trackRef?.publication?.track ?? trackRef?.track ?? trackRef}
          isLocal={isLocal}
          videoFit={videoFit}
        />`
  );
  
  // Add our VideoPlayer before VideoParticipant
  content = content.replace('export const VideoParticipant', videoPlayerComponent + '\nexport const VideoParticipant');

  // Strip VideoTrack import just in case
  // Keep it actually, but ensure Track is imported if needed, actually we just pass track to VideoPlayer so no livekit-client import needed if it's already a Track.
  fs.writeFileSync(vpPath, content);
}
