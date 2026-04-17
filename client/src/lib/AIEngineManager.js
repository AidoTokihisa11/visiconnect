// Singleton Manager pour unifier le Worker et éviter la surcharge VRAM
// v4.1 - LAZY LOADING: Le Worker n'est créé qu'au moment de init() pour éviter le freeze mobile
export class AIEngineManager {
    static instance = null;

    constructor() {
        if (AIEngineManager.instance) {
            return AIEngineManager.instance;
        }
        
        // 🔥 FIX v4.1: Ne PAS créer le Worker ici !
        // Le Worker sera créé uniquement quand init() est appelé
        this.worker = null;
        this.isReady = false;
        this.callbacks = [];
        this.isInitializing = false;

        AIEngineManager.instance = this;
    }

    static getInstance() {
        if (!AIEngineManager.instance) {
            AIEngineManager.instance = new AIEngineManager();
        }
        return AIEngineManager.instance;
    }

    init() {
        // Évite les initialisations multiples
        if (this.isReady || this.isInitializing) {
            return;
        }
        
        this.isInitializing = true;
        
        // 🔥 Création LAZY du Worker - seulement quand vraiment nécessaire
        console.log("[AIEngineManager] Création lazy du Worker IA...");
        this.worker = new Worker(new URL('./videoWorker.js', import.meta.url), { type: 'module' });

        this.worker.onmessage = (e) => {
            if (e.data.type === 'READY') {
                this.isReady = true;
                this.isInitializing = false;
                this.callbacks.forEach(cb => cb(true));
                console.log("[AIEngineManager] Moteur IA distribué prêt.");
            }
            if (e.data.type === 'ERROR') {
                this.isInitializing = false;
                console.error("[AIEngineManager] Erreur Worker:", e.data.error);
            }
        };

        this.worker.postMessage({ type: 'INIT' });
    }

    onReady(callback) {
        if (this.isReady) {
            callback(true);
        } else {
            this.callbacks.push(callback);
        }
    }
    
    // Permet de savoir si l'IA est dispo sans déclencher le chargement
    static isAvailable() {
        return AIEngineManager.instance?.isReady || false;
    }
}
