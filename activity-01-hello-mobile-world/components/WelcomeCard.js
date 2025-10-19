import { StyleSheet, View, Text } from 'react-native';
import { colors } from '../styles/colors';

/**
 * WelcomeCard Component
 *
 * This is a pre-built component that's 100% complete!
 * You can use it as-is or study how it works.
 *
 * Features:
 * - Displays a styled card with welcome information
 * - Uses colors from the colors.js file
 * - Demonstrates component composition
 */
export default function WelcomeCard() {
  return (
    <View style={styles.card}>
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>📱</Text>
      </View>

      <Text style={styles.cardTitle}>Your First Mobile App</Text>

      <Text style={styles.cardDescription}>
        This template is 70% complete and ready to customize.
        Look for TODO markers to add your personal touch!
      </Text>

      <View style={styles.badge}>
        <Text style={styles.badgeText}>✨ Beginner Friendly</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    marginVertical: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    maxWidth: 340,
    width: '100%',
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  icon: {
    fontSize: 48,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 12,
  },
  cardDescription: {
    fontSize: 15,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 16,
  },
  badge: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: 'center',
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
  },
});
