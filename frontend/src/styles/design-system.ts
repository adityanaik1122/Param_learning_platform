// Premium SaaS Design System - Linear/Vercel Style

export const colors = {
  // Elevation Layers
  sidebar: '#08090A',
  background: '#0B0E14',
  elevated: '#16191F',
  
  // Borders
  border: '#22272E',
  borderHover: '#2D3139',
  
  // Typography
  textPrimary: '#F8FAFC',
  textSecondary: '#94A3B8',
  textTertiary: '#64748B',
  
  // Accent - Vivid Violet (4.5:1 contrast compliant)
  accent: '#8B5CF6',
  accentHover: '#7C3AED',
  accentSubtle: 'rgba(139, 92, 246, 0.1)',
  accentBorder: 'rgba(139, 92, 246, 0.2)',
  
  // Status Colors
  success: '#10B981',
  successSubtle: 'rgba(16, 185, 129, 0.1)',
  error: '#EF4444',
  errorSubtle: 'rgba(239, 68, 68, 0.1)',
  warning: '#F59E0B',
  warningSubtle: 'rgba(245, 158, 11, 0.1)',
};

export const spacing = {
  sectionGap: '24px',
  cardPadding: '16px',
  buttonPadding: '10px 16px',
};

export const typography = {
  lineHeight: {
    tight: '1.2',
    normal: '1.5',
    relaxed: '1.625',
    loose: '1.8',
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
};

export const borderRadius = {
  standard: '10px',
  small: '6px',
  large: '12px',
};

export const effects = {
  transition: 'all 0.2s ease',
  activeBar: `3px solid ${colors.accent}`,
};
