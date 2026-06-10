/**
 * Carbonix Design System — Color Tokens
 *
 * Brand palette: Deep navy surfaces with purple accents (#BD93F9).
 * Referenced by all components for consistent theming.
 */

export const Colors = {
  // Brand
  primary: '#BD93F9',
  primaryDark: '#9B6FD8',
  primaryLight: '#D4B8FF',

  // Surfaces (Dark Mode)
  background: '#0A0F1C',
  surface: '#111827',
  surfaceElevated: '#1A1F2E',
  card: '#1E2533',

  // Text
  textPrimary: '#FFFFFF',
  textSecondary: '#94A3B8',
  textMuted: '#64748B',

  // Semantic
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',

  // Carbon Rating
  ratingLow: '#10B981',      // Green
  ratingMedium: '#F59E0B',   // Amber
  ratingHigh: '#F97316',     // Orange
  ratingCritical: '#EF4444', // Red

  // Providers
  aws: '#FF9900',
  gcp: '#4285F4',
  azure: '#0078D4',

  // Borders
  border: '#1E293B',
  borderFocused: '#BD93F9',

  // Misc
  overlay: 'rgba(0, 0, 0, 0.5)',
  transparent: 'transparent',
} as const;
