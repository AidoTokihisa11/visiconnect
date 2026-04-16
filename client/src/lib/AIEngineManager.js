// Singleton Manager pour unifier le Worker et éviter la surcharge VRAM
export class AIEngineManager {
    static instance = null;

    constructor() {
        if (AIEngineManager.instance) {
            return AIEngineManager.instance;
        }
        
        this.worker = new Worker(new URL('./videoWorker.js', import.meta.url), { type: 'module' });
        this.isReady = false;
        this.callbacks = [];

        this.worker.onmessage = (e) => {
            if (e.data.type === 'READY') {
                this.isReady = true;
                this.callbacks.forEach(cb => cb(true));
                console.log("[AIEngineManager] Moteur IA distribué prêt.");
            }
        };

        AIEngineManager.instance = this;
    }

    static getInstance() {
        if (!AIEngineManager.instance) {
            AIEngineManager.instance = new AIEngineManager();
        }
        return AIEngineManager.instance;
    }

    init() {
        if (!this.isReady) {
            this.worker.postMessage({ type: 'INIT' });
        }
    }

    onReady(callback) {
        if (this.isReady) {
            callback(true);
        } else {
            this.callbacks.push(callback);
        }
    }
}
