/**
 * Activity 02: Button Counter
 *
 * Learning Objectives:
 * - Use useState to manage counter state
 * - Create reusable button components
 * - Handle touch interactions with onPress
 * - Apply mobile-first styling (44px touch targets)
 *
 * What's Pre-Built (65%):
 * ✅ ActionButton component with variants
 * ✅ Layout structure and styling
 * ✅ Color theme system
 * ✅ Helper functions
 *
 * Your Tasks (35%):
 * ⚠️ TODO #1: Initialize counter state
 * ⚠️ TODO #2: Create increment function
 * ⚠️ TODO #3: Create decrement function
 * ⚠️ TODO #4: Build CounterDisplay component
 * ⚠️ TODO #5: Build ResetButton component
 * ⚠️ TODO #6: Add visual feedback (color based on count)
 */

import { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import ActionButton from './components/ActionButton';
import CounterDisplay from './components/CounterDisplay';
import ResetButton from './components/ResetButton';
import { colors } from './styles/colors';

export default function App() {
  // TODO #1: Initialize counter state with useState
  // Hint: const [count, setCount] = useState(0);
  // Uncomment the line below:
  // const [count, setCount] = useState(0);

  // TODO #2: Create increment function
  // This function should increase the count by 1
  const handleIncrement = () => {
    // Your code here
    // Hint: Use setCount to update the state
  };

  // TODO #3: Create decrement function
  // This function should decrease the count by 1
  const handleDecrement = () => {
    // Your code here
    // Hint: Similar to increment, but subtract instead
  };

  // Function to reset counter to 0
  const handleReset = () => {
    // This is pre-built for you
    // Uncomment when TODO #1 is complete:
    // setCount(0);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.content}>
        {/* Header */}
        <Text style={styles.title}>Button Counter</Text>
        <Text style={styles.subtitle}>Tap the buttons to change the count</Text>

        {/* TODO #4: CounterDisplay component will be added here */}
        {/* Uncomment when CounterDisplay.js is complete:
        <CounterDisplay
          count={count}
        />
        */}

        {/* Button Container */}
        <View style={styles.buttonContainer}>
          {/* Pre-built ActionButton - Primary variant (blue) */}
          <ActionButton
            title="+"
            onPress={handleIncrement}
            testID="increment-button"
          />

          {/* Pre-built ActionButton - Secondary variant (gray) */}
          <ActionButton
            title="-"
            onPress={handleDecrement}
            variant="secondary"
            testID="decrement-button"
          />
        </View>

        {/* TODO #5: ResetButton component will be added here */}
        {/* Uncomment when ResetButton.js is complete:
        <ResetButton onPress={handleReset} />
        */}

        {/* Instructions */}
        <View style={styles.instructionsBox}>
          <Text style={styles.instructionsTitle}>📝 Your Tasks:</Text>
          <Text style={styles.instructionsText}>1. Complete TODO #1-3 in this file</Text>
          <Text style={styles.instructionsText}>2. Build CounterDisplay component</Text>
          <Text style={styles.instructionsText}>3. Build ResetButton component</Text>
          <Text style={styles.instructionsText}>4. Add color feedback for count</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.gray,
    marginBottom: 40,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 40,
  },
  instructionsBox: {
    marginTop: 60,
    padding: 20,
    backgroundColor: colors.lightGray,
    borderRadius: 12,
    width: '100%',
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  instructionsText: {
    fontSize: 14,
    color: colors.gray,
    marginBottom: 6,
  },
});
