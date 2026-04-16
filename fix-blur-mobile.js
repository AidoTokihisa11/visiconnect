const fs = require('fs');

let umPath = 'C:/Users/theog/Desktop/visiconnect/client/src/hooks/useMeeting.js';
let content = fs.readFileSync(umPath, 'utf8');

// Modify the blur loading function to adapt to weak devices
const newBlurInit = `const isMobile = typeof window !== 'undefined' && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent || '');
           const isWeakDevice = typeof navigator !== 'undefined' && (navigator.hardwareConcurrency <= 4);
           // On mobile/low-end, instruct the model to run faster/lower accuracy
           const blur = BackgroundBlur(targetRadius, { delegate: isMobile || isWeakDevice ? 'cpu' : 'gpu' }); // sometimes gpu is unavailable or causes overhead on weak devices, actually livekit handles it but let's just create blur.`;

// Wait, backgroundBlur args:
// export declare const BackgroundBlur: (radius?: number, options?: BlurOptions) => ProcessorWrapper;
// It doesn't take delegate directly like that in all versions. 
// Just ensuring the video track is 540p (from the useLivekit config) usually fixes the blur freezing because evaluating 540p takes ~1/4th the time of 1080p.

// Since the capture resolution is now max 540p, that might be enough to prevent freezing.
// But let's also wrap the blur processor initialization in a setTimeout/RequestAnimationFrame to unblock UI thread.

if(!content.includes('const initBlur = async () => {')) {
  content = content.replace(
    'const blur = BackgroundBlur(targetRadius);',
    `// Delay the heavy WebAssembly/TensorFlow initialization to let React render the UI first
           await new Promise(resolve => setTimeout(resolve, 50));
           const blur = BackgroundBlur(targetRadius);`
  );
  fs.writeFileSync(umPath, content);
}
