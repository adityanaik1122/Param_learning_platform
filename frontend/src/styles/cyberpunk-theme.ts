// Cyberpunk Theme - Matching Screenshot Colors
// Dark navy/purple theme with bright purple accents

export const cyberpunkTheme = {
  // Background colors
  bg: {
    primary: '#0F1419',        // Dark navy/black (sidebar)
    secondary: '#1A1F2E',      // Dark blue-gray (main background)
    elevated: '#1E2433',       // Slightly elevated surfaces
    card: '#1E2433',           // Card backgrounds
    hover: '#252B3A',          // Hover state background
  },

  // Border colors
  border: {
    default: 'rgba(45, 53, 72, 0.6)',
    hover: 'rgba(45, 53, 72, 0.8)',
    focus: 'rgba(139, 92, 246, 0.5)',
    subtle: 'rgba(45, 53, 72, 0.4)',
  },

  // Text colors
  text: {
    primary: '#E5E7EB',        // Light gray
    secondary: '#9CA3AF',      // Medium gray
    tertiary: '#6B7280',       // Darker gray
    muted: '#4B5563',          // Very muted
  },

  // Accent colors
  accent: {
    purple: '#8B5CF6',         // Bright purple (primary accent)
    purpleLight: '#A78BFA',    // Light purple
    purpleDark: '#7C3AED',     // Dark purple (hover)
    gold: '#FBBF24',           // Gold/orange accent
  },

  // Status colors
  status: {
    success: '#10B981',
    successDark: '#059669',
    error: '#EF4444',
    warning: '#F59E0B',
    info: '#3B82F6',
  },

  // Gradients
  gradient: {
    purple: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
    success: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
    disabled: 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)',
  },

  // Effects
  shadow: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.3)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.3)',
    purple: '0 0 20px rgba(139, 92, 246, 0.3)',
    purpleGlow: '0 0 30px rgba(139, 92, 246, 0.5)',
  },

  // Opacity values
  opacity: {
    subtle: 'rgba(139, 92, 246, 0.1)',
    light: 'rgba(139, 92, 246, 0.15)',
    medium: 'rgba(139, 92, 246, 0.25)',
    strong: 'rgba(139, 92, 246, 0.4)',
  },

  // Transitions
  transition: {
    fast: 'all 0.15s ease',
    normal: 'all 0.3s ease',
    slow: 'all 0.5s ease',
  },
};

// CSS Variables for global use
export const cyberpunkCSSVars = `
  :root {
    --bg-primary: #0F1419;
    --bg-secondary: #1A1F2E;
    --bg-elevated: #1E2433;
    --bg-hover: #252B3A;
    
    --border-default: rgba(45, 53, 72, 0.6);
    --border-hover: rgba(45, 53, 72, 0.8);
    --border-focus: rgba(139, 92, 246, 0.5);
    
    --text-primary: #E5E7EB;
    --text-secondary: #9CA3AF;
    --text-tertiary: #6B7280;
    
    --accent-purple: #8B5CF6;
    --accent-purple-light: #A78BFA;
    --accent-purple-dark: #7C3AED;
    --accent-gold: #FBBF24;
    
    --status-success: #10B981;
    --status-error: #EF4444;
    --status-warning: #F59E0B;
    
    --shadow-purple: 0 0 20px rgba(139, 92, 246, 0.3);
    --transition-normal: all 0.3s ease;
  }
`;

export default cyberpunkTheme;
