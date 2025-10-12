// App-wide constants and configuration

export const APP_CONFIG = {
  name: 'My Creative Studio',
  version: '1.0.0',
  buildNumber: '1',
};

export const COLORS = {
  primary: '#6366f1',
  primaryDark: '#4f46e5',
  primaryLight: '#a5b4fc',
  secondary: '#8b5cf6',
  secondaryDark: '#7c3aed',
  secondaryLight: '#c4b5fd',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
  
  // Background colors
  background: '#f8fafc',
  surface: '#ffffff',
  surfaceSecondary: '#f1f5f9',
  
  // Text colors
  textPrimary: '#1f2937',
  textSecondary: '#374151',
  textTertiary: '#6b7280',
  textDisabled: '#9ca3af',
  
  // Border colors
  border: '#e5e7eb',
  borderLight: '#f3f4f6',
  
  // Shadow colors
  shadow: 'rgba(0, 0, 0, 0.1)',
  shadowLight: 'rgba(0, 0, 0, 0.05)',
};

export const SIZES = {
  // Spacing
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  
  // Border radius
  radius: 8,
  radiusSm: 4,
  radiusMd: 12,
  radiusLg: 16,
  radiusXl: 24,
  radiusRound: 50,
  
  // Font sizes
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 28,
    title: 32,
  },
  
  // Icon sizes
  icon: {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 32,
    xl: 48,
    xxl: 64,
  },
};

export const FONTS = {
  regular: 'System',
  medium: 'System',
  bold: 'System',
  light: 'System',
};

export const SHADOWS = {
  small: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
};

export const CAMERA_CONFIG = {
  quality: 0.8,
  aspect: [4, 3],
  allowsEditing: true,
  mediaTypes: 'photo',
  maxDuration: 60,
  videoQuality: '720p',
};

export const EDITOR_CONFIG = {
  maxImageSize: 4096,
  supportedFormats: ['jpg', 'jpeg', 'png', 'webp'],
  defaultQuality: 0.8,
  maxFilters: 10,
  maxLayers: 20,
};

export const SOCIAL_CONFIG = {
  maxPostLength: 1000,
  maxImageCount: 10,
  maxCommentLength: 500,
  maxHashtags: 30,
};

export const STORAGE_KEYS = {
  userPreferences: 'user_preferences',
  recentProjects: 'recent_projects',
  savedTemplates: 'saved_templates',
  userSettings: 'user_settings',
  authToken: 'auth_token',
};

export const API_ENDPOINTS = {
  base: 'https://api.mycreativestudio.com',
  auth: '/auth',
  projects: '/projects',
  templates: '/templates',
  users: '/users',
  community: '/community',
  ai: '/ai',
};

export const ERROR_MESSAGES = {
  network: 'Network error. Please check your connection.',
  unauthorized: 'You are not authorized to perform this action.',
  notFound: 'The requested resource was not found.',
  serverError: 'Server error. Please try again later.',
  validation: 'Please check your input and try again.',
  permission: 'Permission denied. Please check your settings.',
  unknown: 'An unknown error occurred. Please try again.',
};

export const SUCCESS_MESSAGES = {
  saved: 'Changes saved successfully!',
  uploaded: 'File uploaded successfully!',
  deleted: 'Item deleted successfully!',
  created: 'Item created successfully!',
  updated: 'Item updated successfully!',
  shared: 'Item shared successfully!',
};

export const VALIDATION_RULES = {
  username: {
    minLength: 3,
    maxLength: 20,
    pattern: /^[a-zA-Z0-9_]+$/,
  },
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  password: {
    minLength: 8,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]/,
  },
};

export const ANIMATION_CONFIG = {
  duration: 300,
  easing: 'ease-in-out',
  spring: {
    tension: 100,
    friction: 8,
  },
};

export const LIMITS = {
  maxFileSize: 50 * 1024 * 1024, // 50MB
  maxProjectSize: 100 * 1024 * 1024, // 100MB
  maxTemplateCount: 100,
  maxProjectCount: 1000,
  maxCollaborators: 10,
  maxComments: 1000,
};

export const FEATURES = {
  free: {
    maxProjects: 10,
    maxStorage: 1 * 1024 * 1024 * 1024, // 1GB
    maxTemplates: 20,
    aiFeatures: false,
    collaboration: false,
    exportFormats: ['jpg', 'png'],
  },
  premium: {
    maxProjects: 1000,
    maxStorage: 100 * 1024 * 1024 * 1024, // 100GB
    maxTemplates: 1000,
    aiFeatures: true,
    collaboration: true,
    exportFormats: ['jpg', 'png', 'pdf', 'svg', 'video'],
  },
};
