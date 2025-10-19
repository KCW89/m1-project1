/**
 * ActionButton Component (PRE-BUILT - 100% Complete)
 *
 * A reusable button component with proper touch targets and variants.
 *
 * Features:
 * - 44px minimum touch target (iOS/Android standard)
 * - TouchableOpacity for smooth press feedback
 * - Primary (blue) and secondary (gray) variants
 * - Accessible labels
 *
 * Props:
 * - title: Button text
 * - onPress: Function to call when pressed
 * - variant: 'primary' or 'secondary' (default: 'primary')
 * - testID: For testing purposes
 *
 * You can use this component as-is! No changes needed.
 */

import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '../styles/colors';
import { buttonStyles } from '../styles/buttonStyles';

export default function ActionButton({
  title,
  onPress,
  variant = 'primary',
  testID
}) {
  return (
    <TouchableOpacity
      style={[
        buttonStyles.button,
        variant === 'secondary' && buttonStyles.secondaryButton
      ]}
      onPress={onPress}
      activeOpacity={0.7}
      testID={testID}
    >
      <Text style={[
        buttonStyles.buttonText,
        variant === 'secondary' && buttonStyles.secondaryButtonText
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
