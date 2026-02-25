// Palette de couleurs ultra-performante et moderne
export const modernPalette = {
  // Bleus principaux - Plus sophistiqués et uniques
  primary: {
    50: '#f0f9ff',   // Bleu glacier très clair
    100: '#e0f2fe',  // Bleu ciel léger
    200: '#bae6fd',  // Bleu azur
    300: '#7dd3fc',  // Bleu cyan
    400: '#38bdf8',  // Bleu électrique
    500: '#0ea5e9',  // Bleu principal moderne
    600: '#0284c7',  // Bleu intense
    700: '#0369a1',  // Bleu profond
    800: '#075985',  // Bleu marine
    900: '#0c4a6e',  // Bleu nuit
  },

  // Blancs et neutres ultra-raffinés
  neutral: {
    0: '#ffffff',      // Blanc pur
    25: '#fefefe',     // Blanc cassé subtil
    50: '#fafbfc',     // Blanc glacier
    75: '#f7f9fc',     // Blanc nuage
    100: '#f4f6f8',    // Gris perle très clair
    200: '#e4e7eb',    // Gris argent
    300: '#d1d5db',    // Gris clair
    400: '#9ca3af',    // Gris moyen
    500: '#6b7280',    // Gris
    600: '#4b5563',    // Gris foncé
    700: '#374151',    // Charbon clair
    800: '#1f2937',    // Charbon
    900: '#111827',    // Noir charbon
  },

  // Couleurs d'accent sophistiquées
  accent: {
    blue: '#3b82f6',      // Bleu royal
    indigo: '#6366f1',    // Indigo moderne
    purple: '#8b5cf6',    // Violet premium
    cyan: '#06b6d4',      // Cyan électrique
    teal: '#14b8a6',      // Teal moderne
    emerald: '#10b981',   // Émeraude
    lime: '#84cc16',      // Lime énergique
    amber: '#f59e0b',     // Ambre doré
    orange: '#f97316',    // Orange premium
    red: '#ef4444',       // Rouge moderne
    pink: '#ec4899',      // Rose premium
  },

  // Gradients ultra-modernes
  gradients: {
    primary: 'linear-gradient(135deg, #0ea5e9 0%, #3b82f6 50%, #6366f1 100%)',
    secondary: 'linear-gradient(135deg, #06b6d4 0%, #0ea5e9 100%)',
    accent: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 50%, #3b82f6 100%)',
    warm: 'linear-gradient(135deg, #f59e0b 0%, #f97316 50%, #ec4899 100%)',
    cool: 'linear-gradient(135deg, #06b6d4 0%, #14b8a6 100%)',
    glass: 'linear-gradient(135deg, rgba(14, 165, 233, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%)',
    hero: 'linear-gradient(135deg, #fafbfc 0%, #f0f9ff 50%, #e0f2fe 100%)',
  },

  // Ombres ultra-sophistiquées
  shadows: {
    xs: '0 1px 2px 0 rgba(14, 165, 233, 0.05)',
    sm: '0 1px 3px 0 rgba(14, 165, 233, 0.1), 0 1px 2px 0 rgba(14, 165, 233, 0.06)',
    md: '0 4px 6px -1px rgba(14, 165, 233, 0.1), 0 2px 4px -1px rgba(14, 165, 233, 0.06)',
    lg: '0 10px 15px -3px rgba(14, 165, 233, 0.1), 0 4px 6px -2px rgba(14, 165, 233, 0.05)',
    xl: '0 20px 25px -5px rgba(14, 165, 233, 0.1), 0 10px 10px -5px rgba(14, 165, 233, 0.04)',
    glow: '0 0 20px rgba(14, 165, 233, 0.3)',
    hover: '0 8px 25px rgba(14, 165, 233, 0.15)',
  },

  // États et interactions
  states: {
    hover: 'rgba(14, 165, 233, 0.05)',
    active: 'rgba(14, 165, 233, 0.1)',
    focus: 'rgba(14, 165, 233, 0.2)',
    disabled: 'rgba(107, 114, 128, 0.5)',
  }
};

// Variables CSS pour utilisation globale
export const modernCSSVariables = `
  :root {
    /* Couleurs principales */
    --primary-50: ${modernPalette.primary[50]};
    --primary-100: ${modernPalette.primary[100]};
    --primary-200: ${modernPalette.primary[200]};
    --primary-300: ${modernPalette.primary[300]};
    --primary-400: ${modernPalette.primary[400]};
    --primary-500: ${modernPalette.primary[500]};
    --primary-600: ${modernPalette.primary[600]};
    --primary-700: ${modernPalette.primary[700]};
    --primary-800: ${modernPalette.primary[800]};
    --primary-900: ${modernPalette.primary[900]};
    
    /* Neutres */
    --neutral-0: ${modernPalette.neutral[0]};
    --neutral-25: ${modernPalette.neutral[25]};
    --neutral-50: ${modernPalette.neutral[50]};
    --neutral-100: ${modernPalette.neutral[100]};
    --neutral-200: ${modernPalette.neutral[200]};
    --neutral-300: ${modernPalette.neutral[300]};
    --neutral-400: ${modernPalette.neutral[400]};
    --neutral-500: ${modernPalette.neutral[500]};
    --neutral-600: ${modernPalette.neutral[600]};
    --neutral-700: ${modernPalette.neutral[700]};
    --neutral-800: ${modernPalette.neutral[800]};
    --neutral-900: ${modernPalette.neutral[900]};
    
    /* Gradients */
    --gradient-primary: ${modernPalette.gradients.primary};
    --gradient-secondary: ${modernPalette.gradients.secondary};
    --gradient-accent: ${modernPalette.gradients.accent};
    --gradient-hero: ${modernPalette.gradients.hero};
    --gradient-glass: ${modernPalette.gradients.glass};
    
    /* Ombres */
    --shadow-xs: ${modernPalette.shadows.xs};
    --shadow-sm: ${modernPalette.shadows.sm};
    --shadow-md: ${modernPalette.shadows.md};
    --shadow-lg: ${modernPalette.shadows.lg};
    --shadow-xl: ${modernPalette.shadows.xl};
    --shadow-glow: ${modernPalette.shadows.glow};
    --shadow-hover: ${modernPalette.shadows.hover};
    
    /* États */
    --state-hover: ${modernPalette.states.hover};
    --state-active: ${modernPalette.states.active};
    --state-focus: ${modernPalette.states.focus};
  }
`;

export default modernPalette;