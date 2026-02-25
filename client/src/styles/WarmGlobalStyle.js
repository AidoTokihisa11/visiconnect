import { createGlobalStyle } from 'styled-components';

export const WarmGlobalStyle = createGlobalStyle`
  /* Variables CSS pour les couleurs chaudes */
  :root {
    /* Blancs cassés chauds */
    --warm-white: #fefefe;
    --warm-gray-50: #fafbfc;
    --warm-gray-100: #f7f9fb;
    --warm-gray-200: #f1f5f9;
    --warm-gray-300: #e5e9ef;
    
    /* Couleurs de texte plus douces */
    --text-primary: #1e293b;
    --text-secondary: #475569;
    --text-tertiary: #64748b;
    --text-muted: #94a3b8;
    
    /* Ombres plus douces */
    --shadow-warm-sm: 0 1px 2px 0 rgba(102, 126, 234, 0.03);
    --shadow-warm-md: 0 4px 6px -1px rgba(102, 126, 234, 0.06);
    --shadow-warm-lg: 0 10px 15px -3px rgba(102, 126, 234, 0.08);
    
    /* Bordures plus subtiles */
    --border-warm: rgba(102, 126, 234, 0.08);
    --border-warm-hover: rgba(102, 126, 234, 0.12);
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: var(--warm-white);
    color: var(--text-primary);
    line-height: 1.6;
    overflow-x: hidden;
  }

  /* Amélioration des éléments de formulaire */
  input, textarea, select {
    font-family: inherit;
    background: var(--warm-gray-50);
    border: 1px solid var(--border-warm);
    border-radius: 8px;
    transition: all 0.2s ease;
    
    &:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
      background: var(--warm-white);
    }
  }

  /* Amélioration des boutons */
  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    border-radius: 8px;
    transition: all 0.2s ease;
    
    &:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }
  }

  /* Cards avec style amélioré */
  .warm-card {
    background: rgba(254, 254, 254, 0.95);
    backdrop-filter: blur(10px);
    border: 1px solid var(--border-warm);
    border-radius: 12px;
    box-shadow: var(--shadow-warm-md);
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-warm-lg);
      border-color: var(--border-warm-hover);
    }
  }

  /* Liens avec style amélioré */
  a {
    color: #667eea;
    text-decoration: none;
    transition: color 0.2s ease;
    
    &:hover {
      color: #5a67d8;
    }
  }

  /* Scrollbar personnalisée pour plus de chaleur */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: var(--warm-gray-100);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(102, 126, 234, 0.3);
    border-radius: 4px;
    transition: background 0.2s ease;
    
    &:hover {
      background: rgba(102, 126, 234, 0.5);
    }
  }

  /* Sélection de texte avec couleur chaude */
  ::selection {
    background: rgba(102, 126, 234, 0.2);
    color: var(--text-primary);
  }

  /* Focus ring plus chaleureux */
  *:focus-visible {
    outline: 2px solid rgba(102, 126, 234, 0.5);
    outline-offset: 2px;
  }

  /* Animations plus fluides */
  * {
    scroll-behavior: smooth;
  }

  /* Amélioration typographique */
  h1, h2, h3, h4, h5, h6 {
    color: var(--text-primary);
    font-weight: 600;
    line-height: 1.3;
    letter-spacing: -0.025em;
  }

  p {
    color: var(--text-secondary);
    line-height: 1.7;
  }

  /* Classe utilitaire pour les sections alternées */
  .section-warm-bg {
    background: linear-gradient(135deg, var(--warm-gray-50) 0%, var(--warm-gray-100) 100%);
    position: relative;
    
    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at 30% 20%, rgba(102, 126, 234, 0.02) 0%, transparent 50%);
      pointer-events: none;
    }
  }
`;

export default WarmGlobalStyle;