// Thème amélioré avec des couleurs plus chaleureuses
export const theme = {
  // Couleurs principales - gardons les beaux dégradés
  primary: {
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    gradientAlt: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #06b6d4 100%)',
    main: '#667eea',
    dark: '#5a67d8',
    light: '#9f7aea'
  },

  // Blancs cassés pour plus de chaleur
  backgrounds: {
    primary: '#fefefe', // Blanc très légèrement cassé (pas pur)
    secondary: '#fafbfc', // Blanc cassé avec une pointe de bleu très subtile
    tertiary: '#f7f9fb', // Blanc cassé plus prononcé
    warm: '#fdfcfb', // Blanc avec une micro pointe de chaud
    card: 'rgba(255, 255, 255, 0.95)', // Cards avec transparence
    glass: 'rgba(255, 255, 255, 0.9)' // Effet verre
  },

  // Gris chauds au lieu de gris froids
  grays: {
    50: '#fafafb',
    100: '#f4f5f7',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827'
  },

  // Textes avec plus de chaleur
  text: {
    primary: '#1e293b', // Légèrement plus chaud que le noir pur
    secondary: '#475569',
    tertiary: '#64748b',
    muted: '#94a3b8',
    white: '#ffffff'
  },

  // Bordures subtiles
  borders: {
    light: '#f1f5f9',
    medium: '#e2e8f0',
    dark: '#cbd5e1'
  },

  // Ombres douces
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    warm: '0 4px 6px -1px rgba(102, 126, 234, 0.1), 0 2px 4px -1px rgba(102, 126, 234, 0.06)'
  },

  // Couleurs d'accent chaleureuses
  accents: {
    blue: '#3b82f6',
    green: '#10b981',
    yellow: '#f59e0b',
    orange: '#f97316',
    red: '#ef4444',
    purple: '#8b5cf6',
    pink: '#ec4899'
  },

  // Spacing
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem'
  },

  // Border radius
  radius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    '2xl': '1.5rem',
    full: '9999px'
  },

  // Transitions
  transitions: {
    fast: '0.15s ease-out',
    base: '0.2s ease-out',
    slow: '0.3s ease-out'
  }
};

// Variables CSS globales pour utilisation facile
export const cssVariables = `
  :root {
    --bg-primary: ${theme.backgrounds.primary};
    --bg-secondary: ${theme.backgrounds.secondary};
    --bg-tertiary: ${theme.backgrounds.tertiary};
    --bg-warm: ${theme.backgrounds.warm};
    --bg-card: ${theme.backgrounds.card};
    --bg-glass: ${theme.backgrounds.glass};
    
    --text-primary: ${theme.text.primary};
    --text-secondary: ${theme.text.secondary};
    --text-tertiary: ${theme.text.tertiary};
    --text-muted: ${theme.text.muted};
    
    --primary-gradient: ${theme.primary.gradient};
    --primary-gradient-alt: ${theme.primary.gradientAlt};
    --primary-main: ${theme.primary.main};
    
    --border-light: ${theme.borders.light};
    --border-medium: ${theme.borders.medium};
    --border-dark: ${theme.borders.dark};
    
    --shadow-sm: ${theme.shadows.sm};
    --shadow-base: ${theme.shadows.base};
    --shadow-md: ${theme.shadows.md};
    --shadow-lg: ${theme.shadows.lg};
    --shadow-xl: ${theme.shadows.xl};
    --shadow-warm: ${theme.shadows.warm};
    
    --radius-sm: ${theme.radius.sm};
    --radius-md: ${theme.radius.md};
    --radius-lg: ${theme.radius.lg};
    --radius-xl: ${theme.radius.xl};
    --radius-2xl: ${theme.radius['2xl']};
    
    --transition-fast: ${theme.transitions.fast};
    --transition-base: ${theme.transitions.base};
    --transition-slow: ${theme.transitions.slow};
  }
`;

export default theme;