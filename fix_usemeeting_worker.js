const fs = require('fs');
let code = fs.readFileSync('client/src/hooks/useMeeting.js', 'utf8');

// Installer les imports du Manager
if (!code.includes("import { AIEngineManager } from '../lib/AIEngineManager';")) {
    code = "import { AIEngineManager } from '../lib/AIEngineManager';\n" + code;
}

// 1. Ajouter l'état "isAiReady"
const stateMarker = "const [isAIEnhanced, setIsAIEnhanced] = useState(false);";
if (!code.includes('const [isAiReady, setIsAiReady] = useState(false);')) {
    code = code.replace(stateMarker, `
    const [isAiReady, setIsAiReady] = useState(false);
    ${stateMarker}
    `);
}

// 2. Lancer le Pre-Warming dans un useEffect isolé 
const useEffectMarker = "useEffect(() => {\n    setupAntiFreezeListeners(room);";
if (!code.includes('AIEngineManager.getInstance().onReady(')) {
    code = code.replace(useEffectMarker, `
    // Pre-Warming de l'IA (Non Bloquant via Web Worker)
    useEffect(() => {
        const manager = new AIEngineManager();
        manager.onReady((ready) => setIsAiReady(ready));
        manager.init(); // Déclenche le téléchargement/compilation WASM en background absolu
    }, []);

    ${useEffectMarker}`);
}

// 3. Modifier la valeur de retour (Exports) pour UI 
if (!code.includes('isAiReady,')) {
    code = code.replace("return {\n    isAIEnhanced,", "return {\n    isAiReady,\n    isAIEnhanced,");
}

fs.writeFileSync('client/src/hooks/useMeeting.js', code);
