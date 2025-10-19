/**
 * Button Styles (PRE-BUILT - 100% Complete)
 *
 * Centralized button styling following mobile-first design principles.
 *
 * Key Features:
 * - 44px minimum touch target (iOS/Android accessibility guideline)
 * - Proper padding for comfortable tapping
 * - Primary and secondary variants
 * - Consistent styling across all buttons
 *
 * Use these styles with ActionButton component!
 */

import { StyleSheet } from 'react-native';
import { colors } from './colors';

export const buttonStyles = StyleSheet.create({
  // Primary button style (blue)
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 12,
    minHeight: 44,           // iOS/Android touch target guideline
    minWidth: 88,            // Minimum width for comfortable tapping
    justifyContent: 'center',
    alignItems: 'center',

    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,

    // Shadow for Android
    elevation: 3,
  },

  // Primary button text
  buttonText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '600',
  },

  // Secondary button style (gray)
  secondaryButton: {
    backgroundColor: colors.gray,
  },

  // Secondary button text
  secondaryButtonText: {
    color: '#FFFFFF',
  },
});
