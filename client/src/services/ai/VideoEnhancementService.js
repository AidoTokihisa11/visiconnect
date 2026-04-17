/**
 * VideoEnhancementService - Amélioration visuelle côté client
 * 
 * Utilise CSS filters et Canvas pour simuler une amélioration
 * de la netteté sans GPU externe
 */

class VideoEnhancementService {
  constructor() {
    this.settings = {
      sharpness: 0,      // -100 à 100
      contrast: 0,       // -100 à 100
      brightness: 0,     // -100 à 100
      saturation: 0,     // -100 à 100
      warmth: 0,         // -100 à 100 (température couleur)
    };
    this.enabled = false;
    this.presets = {
      natural: { sharpness: 10, contrast: 5, brightness: 0, saturation: 5, warmth: 0 },
      vivid: { sharpness: 20, contrast: 15, brightness: 5, saturation: 20, warmth: 10 },
      cinema: { sharpness: 5, contrast: 20, brightness: -5, saturation: -10, warmth: -10 },
      lowLight: { sharpness: 15, contrast: -10, brightness: 20, saturation: 0, warmth: 15 },
      professional: { sharpness: 5, contrast: 5, brightness: 0, saturation: 0, warmth: 0 },
    };
  }

  /**
   * Génère le CSS filter string
   */
  getCSSFilter() {
    if (!this.enabled) return 'none';

    const { contrast, brightness, saturation } = this.settings;
    
    const filters = [];
    
    // Contraste: 100 = normal, range 50-150
    if (contrast !== 0) {
      filters.push(`contrast(${100 + contrast}%)`);
    }
    
    // Luminosité: 100 = normal, range 50-150
    if (brightness !== 0) {
      filters.push(`brightness(${100 + brightness}%)`);
    }
    
    // Saturation: 100 = normal, range 0-200
    if (saturation !== 0) {
      filters.push(`saturate(${100 + saturation}%)`);
    }
    
    // Température via sepia + hue-rotate
    if (this.settings.warmth !== 0) {
      const warmth = this.settings.warmth;
      if (warmth > 0) {
        filters.push(`sepia(${warmth / 2}%)`);
      } else {
        filters.push(`hue-rotate(${warmth / 5}deg)`);
      }
    }

    return filters.length > 0 ? filters.join(' ') : 'none';
  }

  /**
   * Génère les styles inline pour un élément vidéo
   */
  getVideoStyles() {
    const filter = this.getCSSFilter();
    
    // Sharpness via CSS (subtle effect)
    const sharpness = this.settings.sharpness;
    let textShadow = 'none';
    
    // Pour la netteté, on utilise un léger contour
    // Note: L'effet est subtil car CSS n'a pas de vrai filtre de netteté
    if (sharpness > 0 && this.enabled) {
      const intensity = sharpness / 200;
      textShadow = `0 0 ${intensity}px rgba(0,0,0,0.5)`;
    }

    return {
      filter,
      // backdrop-filter pour un effet de netteté légèrement différent
      WebkitFilter: filter,
      imageRendering: sharpness > 20 ? 'crisp-edges' : 'auto',
    };
  }

  /**
   * Applique un preset
   */
  applyPreset(presetName) {
    if (this.presets[presetName]) {
      this.settings = { ...this.presets[presetName] };
      this.enabled = true;
      return true;
    }
    return false;
  }

  /**
   * Met à jour un paramètre
   */
  setSetting(key, value) {
    if (key in this.settings) {
      this.settings[key] = Math.max(-100, Math.min(100, value));
    }
  }

  /**
   * Active/désactive les améliorations
   */
  setEnabled(enabled) {
    this.enabled = enabled;
  }

  /**
   * Réinitialise aux valeurs par défaut
   */
  reset() {
    this.settings = {
      sharpness: 0,
      contrast: 0,
      brightness: 0,
      saturation: 0,
      warmth: 0,
    };
  }

  /**
   * Traitement Canvas avancé (optionnel, plus gourmand)
   * Pour un vrai sharpening, on utilise une convolution
   */
  processCanvasFrame(sourceCanvas, targetCanvas) {
    if (!this.enabled || this.settings.sharpness === 0) {
      return false;
    }

    const ctx = targetCanvas.getContext('2d');
    const width = sourceCanvas.width;
    const height = sourceCanvas.height;

    targetCanvas.width = width;
    targetCanvas.height = height;

    // Applique d'abord les filtres CSS
    ctx.filter = this.getCSSFilter();
    ctx.drawImage(sourceCanvas, 0, 0);

    // Sharpening via convolution (uniquement si demandé et pas trop gourmand)
    if (this.settings.sharpness > 30) {
      const imageData = ctx.getImageData(0, 0, width, height);
      const sharpened = this._applySharpen(imageData, this.settings.sharpness / 100);
      ctx.putImageData(sharpened, 0, 0);
    }

    return true;
  }

  /**
   * Applique un kernel de sharpening
   */
  _applySharpen(imageData, intensity) {
    const { data, width, height } = imageData;
    const output = new Uint8ClampedArray(data);

    // Kernel de sharpening simple
    const kernel = [
      0, -intensity, 0,
      -intensity, 1 + 4 * intensity, -intensity,
      0, -intensity, 0,
    ];

    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        for (let c = 0; c < 3; c++) {
          let sum = 0;
          for (let ky = -1; ky <= 1; ky++) {
            for (let kx = -1; kx <= 1; kx++) {
              const idx = ((y + ky) * width + (x + kx)) * 4 + c;
              sum += data[idx] * kernel[(ky + 1) * 3 + (kx + 1)];
            }
          }
          output[(y * width + x) * 4 + c] = Math.min(255, Math.max(0, sum));
        }
      }
    }

    return new ImageData(output, width, height);
  }

  /**
   * Retourne les presets disponibles
   */
  getPresets() {
    return Object.keys(this.presets);
  }

  /**
   * Retourne les paramètres actuels
   */
  getSettings() {
    return { ...this.settings, enabled: this.enabled };
  }
}

// Singleton
let instance = null;

export const getVideoEnhancementService = () => {
  if (!instance) {
    instance = new VideoEnhancementService();
  }
  return instance;
};

export default VideoEnhancementService;
