# Activity 02: Button Counter

## 🎯 Learning Objectives

By completing this activity, you will:
- Use `useState` to manage application state
- Create reusable button components with proper touch targets
- Handle user interactions with `onPress` events
- Apply mobile-first styling principles (44px touch targets)
- Implement visual feedback based on state changes

**Total Time**: 45 minutes
**Difficulty**: Beginner
**Concept**: Components and Basic Styling

---

## 🚀 Quick Start (3 Steps)

### Step 1: Extract and Navigate
```bash
# Extract the ZIP file you downloaded
# Open terminal and navigate to the folder
cd activity-02-button-counter
```

### Step 2: Install Dependencies
```bash
# Install all required packages (takes ~30 seconds)
npm install --legacy-peer-deps
```

### Step 3: Start Development Server
```bash
# Start Expo
npx expo start

# Then:
# - Press 'w' to open in web browser, OR
# - Scan QR code with Expo Go app on your phone
```

**Success!** You should see a working app with two buttons (+ and -).

---

## ✨ What's Already Working (65%)

This template comes pre-built with:

### ✅ ActionButton Component (100% Complete)
- Reusable button with primary/secondary variants
- 44px minimum touch target (iOS/Android standard)
- Smooth press animations with TouchableOpacity
- **Location**: `components/ActionButton.js`
- **You can use this as-is!** No changes needed.

### ✅ Button Styling System (100% Complete)
- Centralized button styles
- Consistent design across all buttons
- Proper shadows for depth
- **Location**: `styles/buttonStyles.js`

### ✅ Color Theme (100% Complete)
- Primary, secondary, success, danger colors
- Neutral grays and backgrounds
- Easy to reference: `colors.primary`, `colors.danger`, etc.
- **Location**: `styles/colors.js`

### ✅ Helper Functions (100% Complete)
- Number formatting utilities
- Optional enhancements for extension challenges
- **Location**: `utils/helpers.js`

---

## 📋 Your Tasks (35% - 6 TODOs)

### TODO #1: Initialize Counter State (5 min)
**File**: `App.js` (line ~37)

**What to do**: Uncomment the useState line to create counter state.

**Code to uncomment**:
```javascript
const [count, setCount] = useState(0);
```

**Why this matters**: State is how React Native remembers data and re-renders when it changes. Without state, the counter won't update!

**Test it**: After uncommenting, save the file. The app should reload without errors (you won't see visual changes yet).

---

### TODO #2: Create Increment Function (8 min)
**File**: `App.js` (line ~43)

**What to do**: Make the + button work by updating count.

**Implementation**:
```javascript
const handleIncrement = () => {
  setCount(count + 1);
};
```

**Key concepts**:
- Always use setter function (`setCount`) to update state
- Never mutate state directly (`count++` won't work!)
- State updates trigger re-renders automatically

**Test it**: The + button should increase the count (once you complete TODO #4 to see the display).

---

### TODO #3: Create Decrement Function (8 min)
**File**: `App.js` (line ~49)

**What to do**: Make the - button work by decreasing count.

**Implementation**:
```javascript
const handleDecrement = () => {
  setCount(count - 1);
};
```

**Test it**: The - button should decrease the count. The counter can go negative (that's okay for now!).

---

### TODO #4: Build CounterDisplay Component (12 min)
**File**: `components/CounterDisplay.js`

**What to do**: Create a component that displays the count with large, readable text.

**Complete implementation**:
```javascript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../styles/colors';

export default function CounterDisplay({ count, color }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Count</Text>
      <Text style={[styles.count, { color: color || colors.primary }]}>
        {count}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  label: {
    fontSize: 16,
    color: colors.gray,
    marginBottom: 8,
  },
  count: {
    fontSize: 64,
    fontWeight: 'bold',
  },
});
```

**Then, in App.js**: Uncomment the CounterDisplay usage (line ~73).

**Test it**: You should see a large number displaying the count. Try pressing + and - to see it update!

---

### TODO #5: Build ResetButton Component (10 min)
**File**: `components/ResetButton.js`

**What to do**: Create a red button that resets the counter to 0.

**Complete implementation**:
```javascript
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '../styles/colors';

export default function ResetButton({ onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>Reset</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.danger,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
```

**Then, in App.js**:
1. Uncomment the `handleReset` function body (line ~56)
2. Uncomment the ResetButton usage (line ~91)

**Test it**: You should see a red "Reset" button. Clicking it should return the count to 0.

---

### TODO #6: Add Visual Feedback (10 min)
**File**: `App.js` (line ~75)

**What to do**: Change the counter color based on value (green for positive, red for negative, blue for zero).

**Implementation**: Update the CounterDisplay usage:
```javascript
<CounterDisplay
  count={count}
  color={count > 0 ? colors.success : count < 0 ? colors.danger : colors.primary}
/>
```

**How it works**:
- Uses ternary operator (compact if/else): `condition ? true : false`
- Checks count > 0 → green
- Else checks count < 0 → red
- Otherwise (count === 0) → blue

**Test it**:
- Positive count = green
- Negative count = red
- Zero = blue

---

## 🧪 Testing Your Work

### Functional Checklist
- [ ] App loads without errors
- [ ] Counter starts at 0
- [ ] + button increases count by 1
- [ ] - button decreases count by 1
- [ ] Counter can go negative (no limits)
- [ ] Reset button returns count to 0
- [ ] Count color changes: green (positive), red (negative), blue (zero)
- [ ] All buttons are easy to tap (44px touch targets)

### Common Issues

**Issue**: "useState is not defined"
**Solution**: Check that you have `import { useState } from 'react';` at the top of App.js

**Issue**: "Cannot read property 'success' of undefined"
**Solution**: Make sure you imported colors: `import { colors } from './styles/colors';`

**Issue**: Buttons don't do anything
**Solution**: Check that handleIncrement and handleDecrement are calling `setCount()`

**Issue**: Count doesn't display
**Solution**: Verify you uncommented the CounterDisplay usage in App.js

---

## 🚀 Extension Challenges

### Beginner Extensions
1. **Add Step Size**: Allow incrementing by 5 or 10 instead of just 1
   - Add buttons for +5 and +10
   - Hint: Pass the step value to handler functions

2. **Disable at Limits**: Prevent count from going below 0 or above 100
   - Add conditional logic before updating state
   - Gray out buttons when limits reached

### Intermediate Extensions
1. **History Feature**: Track all changes and display a list
   - Use another state array: `[history, setHistory]`
   - Push each change to the array
   - Display with FlatList

2. **Custom Step Input**: Add a text input to set custom step size
   - Use TextInput component
   - Convert input text to number

### Advanced Extensions
1. **Smooth Animations**: Add fade-in effect when count changes
   - Use Animated API from React Native
   - Animate opacity on count change

2. **Sound Effects**: Play a sound on button press
   - Install expo-av: `npx expo install expo-av`
   - Play different sounds for +, -, and reset

---

## 📚 Key Concepts Review

### useState Hook
**What it is**: A React hook that adds state to functional components.

**Syntax**: `const [value, setValue] = useState(initialValue)`

**Why it matters**: Without state, your app can't remember or react to changes. State triggers re-renders when updated.

**Common mistake**: Mutating state directly
```javascript
// ❌ Wrong
count = count + 1;

// ✅ Correct
setCount(count + 1);
```

### Event Handlers
**What they are**: Functions that run when user interactions happen.

**Syntax**: `onPress={handlePress}` (pass function reference, not call it!)

**Common mistake**: Calling function instead of passing reference
```javascript
// ❌ Wrong - executes immediately
<Button onPress={handlePress()} />

// ✅ Correct - executes on press
<Button onPress={handlePress} />
```

### Component Props
**What they are**: Data passed from parent to child components.

**Why they matter**: Makes components reusable and composable.

**Example**: `<CounterDisplay count={5} color="red" />`

---

## 🔗 How This Connects to Projects

**Project 1 (M1)**: Uses these button patterns and state management concepts extensively.

**Project 2 (M1)**: Extends state management to more complex data structures.

**Real-world apps**: Every interactive app uses state and events. You're building the foundation!

---

## 📤 Submission

### Requirements
- [ ] All 6 TODOs completed
- [ ] App runs without errors
- [ ] Screenshots showing different counter states (at least 2)

### How to Submit
1. Take screenshots of your working app
2. (Optional) Export code as ZIP
3. Submit via [Activity Submission Form](https://forms.gle/a7HFJG6iv4iNdLRk6)

---

## 💡 Reflection Questions

1. **Understanding**: Explain useState in your own words. Why can't we just use regular variables?

2. **Application**: How would you use state to build a "like" button for social media posts?

3. **Challenges**: What was most difficult about managing state? How did you overcome it?

---

**🎉 Congratulations on completing Activity 02!**

You've mastered:
- ✅ State management with useState
- ✅ Event handling with onPress
- ✅ Component composition
- ✅ Mobile-first styling

**Next Steps**:
1. Complete the Exit Ticket for Lesson 02
2. Try at least one extension challenge
3. Move on to Activity 03: Todo List (working with arrays!)

---

*Activity 02 | M1: Mobile Apps I Love | React Native & Expo SDK 53*
