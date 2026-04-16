const fs = require('fs');

let code = fs.readFileSync('client/src/hooks/useMeeting.js', 'utf8');

// 1. Add missing imports
if (!code.includes('import { AIVideoProcessor } from')) {
    code = "import { AIVideoProcessor } from '../lib/AIVideoEngine';\n" + code;
}

// 2. Add state
const stateMarker = "const [selectedDevices, setSelectedDevices] = useState(";
if (!code.includes('const [isAIEnhanced, setIsAIEnhanced] = useState')) {
    code = code.replace(stateMarker, `
    const [isAIEnhanced, setIsAIEnhanced] = useState(false);
    const [activeAiProcessor, setActiveAiProcessor] = useState(null);
    const [blurProcessor, setBlurProcessor] = useState(null);
    
    ${stateMarker}`);
}

// 3. Rewrite toggleBlur to cache the processor and not recreate it
const toggleBlurRegex = /const toggleBlur = useCallback[\s\S]*?\}, \[localParticipant, isBlurEnabled, blurRadius\]\);/g;

code = code.replace(toggleBlurRegex, `
const toggleBlur = useCallback(async (newRadius) => {
    if (!localParticipant) return;

    try {
      const videoTrack = localParticipant.getTrackPublication(Track.Source.Camera)?.videoTrack;
      if (!videoTrack || videoTrack.isMuted || !videoTrack.mediaStreamTrack) {
          console.warn("Flux inactif ou aucune source media. Flou bloqué.");
          return;
      }

      const targetRadius = typeof newRadius === 'number' ? newRadius : blurRadius;
      const shouldDisable = typeof newRadius !== 'number' ? isBlurEnabled : newRadius === 0;

      if (shouldDisable) {
         await videoTrack.setProcessor(null);
         setIsBlurEnabled(false);
         // If we are turning off blur, maybe clear the AI conflict flag too
      } else {
         // Prevent conflict: If AI is active, turn it off
         if (isAIEnhanced) {
             setIsAIEnhanced(false);
         }
         
         // Reuse existing processor if possible to prevent massive WASM reload freezes
         let processor = blurProcessor;
         if (!processor) {
             // Let UI render first before blocking thread
             await new Promise(resolve => setTimeout(resolve, 50));
             processor = BackgroundBlur(targetRadius);
             setBlurProcessor(processor);
         }
         
         await videoTrack.setProcessor(processor);
         setIsBlurEnabled(true);
         
         if (typeof newRadius === 'number') {
             setBlurRadius(newRadius);
         }
      }
    } catch (err) {
      console.error('Failed to toggle blur', err);
    }
}, [localParticipant, isBlurEnabled, blurRadius, blurProcessor, isAIEnhanced]);

const toggleAIVideoEngine = useCallback(async () => {
    if (!localParticipant) return;

    try {
      const videoTrack = localParticipant.getTrackPublication(Track.Source.Camera)?.videoTrack;
      if (!videoTrack || videoTrack.isMuted || !videoTrack.mediaStreamTrack) {
          console.warn("Flux inactif ou aucune source media. IA bloquée.");
          return;
      }

      if (isAIEnhanced) {
          // Disable AI 
          await videoTrack.setProcessor(null);
          setIsAIEnhanced(false);
      } else {
          // Prevent conflict: If Blur is active, turn it off
          if (isBlurEnabled) {
              setIsBlurEnabled(false);
          }

          // Let UI render first
          await new Promise(resolve => setTimeout(resolve, 50));
          
          let processor = activeAiProcessor;
          if (!processor) {
              processor = new AIVideoProcessor();
              setActiveAiProcessor(processor);
          }
          await videoTrack.setProcessor(processor);
          setIsAIEnhanced(true);
      }
    } catch (err) {
      console.error('Failed to toggle AI Engine', err);
    }
}, [localParticipant, isAIEnhanced, activeAiProcessor, isBlurEnabled]);
`);

// 4. Return new properties in useMeeting hook
const returnMarker = "return {\n    room,";
if (!code.includes('isAIEnhanced,')) {
    code = code.replace("return {", "return {\n    isAIEnhanced,\n    toggleAIVideoEngine,\n");
}

fs.writeFileSync('client/src/hooks/useMeeting.js', code);
