# Activity 01: Hello Mobile World - Template

Welcome to your first React Native activity template! This is a **working Expo app** that's **70% complete** and ready for you to customize.

## 🎯 What You'll Learn

By completing this activity, you will:
- Set up a React Native development environment with Expo
- Understand the basic structure of a mobile app
- Modify text, colors, and images in a working app
- Experience hot reload for rapid development

**Total Time**: 30 minutes
**Difficulty**: Beginner
**Concept**: Concept 01 - Introduction to Mobile Development

---

## ✨ What's Pre-Built (70%)

This template comes **ready to run** with:

- ✅ **Complete Expo app structure** with SDK 53
- ✅ **Working App.js** with View, Text, and Image components
- ✅ **WelcomeCard component** (fully functional)
- ✅ **Color system** (styles/colors.js)
- ✅ **Professional configuration** (app.json)
- ✅ **Hot reload enabled** (instant updates on save)

**Just install dependencies and run!**

---

## 📋 What You'll Complete (30%)

Look for these **TODO markers** in the code:

### TODO #1: Customize Welcome Message
**File**: `App.js` (line ~15)
**Task**: Change the welcome text to your own message
**Time**: 2 minutes

### TODO #2: Change App Color Theme
**File**: `styles/colors.js` (line ~27)
**Task**: Modify primary, background, and text colors
**Time**: 3 minutes

### TODO #3: Add Custom Image
**File**: `App.js` (line ~25)
**Task**: Replace the logo with your own image
**Time**: 5 minutes

### TODO #4: Create Additional Text Component
**File**: `App.js` (line ~33)
**Task**: Add new Text component below WelcomeCard
**Time**: 5 minutes

### TODO #5: Test Hot Reload
**File**: `App.js` (any line)
**Task**: Make changes and watch instant updates
**Time**: 5 minutes

---

## 🚀 Quick Start (5 Minutes)

### Step 1: Install Dependencies
```bash
# Navigate to this folder
cd activity-01-hello-mobile-world

# Install all packages (this will take ~30 seconds)
npm install --legacy-peer-deps
```

### Step 2: Start Development Server
```bash
# Start Expo
npx expo start

# You should see:
# ✓ Metro bundler ready
# ✓ QR code in terminal
```

### Step 3: Open on Your Device
1. **Install Expo Go** app (free on iOS/Android)
2. **Scan QR code** from terminal
3. **Wait for load** (~30 seconds first time)

**Alternative**: Press `w` to open in web browser

---

## 📁 Template Structure

```
activity-01-hello-mobile-world/
├── App.js                      # Main entry (YOU'LL EDIT: TODOs 1, 3, 4, 5)
├── app.json                    # Expo configuration (100% complete)
├── package.json                # Dependencies (100% complete)
├── babel.config.js             # Babel setup (100% complete)
├── components/
│   └── WelcomeCard.js          # Welcome display (100% complete ✅)
├── styles/
│   └── colors.js               # Color constants (YOU'LL EDIT: TODO 2)
└── assets/
    └── logo.png                # App logo (can replace)
```

---

## 👨‍💻 Complete the TODOs

### TODO #1: Customize Welcome Message (2 min)

**Open**: `App.js`
**Find**: Line ~15 with `<Text style={styles.title}>Welcome to React Native!</Text>`

**Change to**:
```javascript
<Text style={styles.title}>Hello, [Your Name]!</Text>
```

**Test**:
1. Save the file
2. App reloads automatically in ~2 seconds
3. You see your new message!

**Common Mistakes**:
- ❌ Forgetting `<Text>` wrapper → ✅ Always wrap text: `<Text>Hello</Text>`
- ❌ Missing closing tag → ✅ Close properly: `</Text>`

---

### TODO #2: Change Color Theme (3 min)

**Open**: `styles/colors.js`
**Find**: Line ~27 with color definitions

**Change to**:
```javascript
export const colors = {
  primary: '#FF6B6B',     // Try: '#4ECDC4', '#9B59B6'
  background: '#F7F7F7',  // Try: '#FFFFFF', '#EEF5FF'
  text: '#2C3E50',        // Try: '#000000', '#333333'
};
```

**Test**:
1. Save the file
2. App reloads automatically
3. New colors applied throughout!

**Color Ideas**:
- Purple theme: `primary: '#9B59B6'`
- Green theme: `primary: '#27AE60'`
- Teal theme: `primary: '#4ECDC4'`

**Resources**: Find colors at [Coolors.co](https://coolors.co/)

**Common Mistakes**:
- ❌ Missing `#` symbol: `FF0000` → ✅ Include hash: `#FF0000`
- ❌ Wrong format: `rgb(255,0,0)` → ✅ Use hex: `#FF0000`

---

### TODO #3: Add Custom Image (5 min)

**Open**: `App.js`
**Find**: Line ~25 with `<Image source={require('./assets/logo.png')} />`

**Option A - Web Image**:
```javascript
<Image
  source={{ uri: 'https://picsum.photos/200/200' }}
  style={styles.logo}
/>
```

**Option B - Local Image**:
1. Add your image to `assets/` folder (e.g., `my-photo.png`)
2. Update code:
```javascript
<Image
  source={require('./assets/my-photo.png')}
  style={styles.logo}
/>
```

**Test**:
1. Save the file
2. New image displays!

**Free Image Sources**:
- [Unsplash](https://unsplash.com/) - Professional photos
- [Picsum Photos](https://picsum.photos/) - Placeholder images

**Common Mistakes**:
- ❌ Wrong syntax: `source="url"` → ✅ Use object: `source={{ uri: "url" }}`
- ❌ Broken URL → ✅ Test URL in browser first

---

### TODO #4: Create Additional Text (5 min)

**Open**: `App.js`
**Find**: Line ~33 with comment `{/* TODO #4: Create additional text component */}`

**Add below**:
```javascript
<Text style={styles.subtitle}>
  This is my first React Native app!
</Text>
```

**Try Adding Multiple**:
```javascript
<Text style={styles.subtitle}>
  This is my first React Native app!
</Text>
<Text style={styles.subtitle}>
  I'm learning mobile development with Expo.
</Text>
```

**Test**:
1. Save the file
2. New text appears below card!

**Common Mistakes**:
- ❌ Forgetting `style` prop → ✅ Apply style: `style={styles.subtitle}`
- ❌ Multiple root elements → ✅ Wrap in `<View>` if needed

---

### TODO #5: Test Hot Reload (5 min)

**Instructions**:
1. Make **any change** to text in `App.js`
2. **Save the file** (Cmd+S / Ctrl+S)
3. **Watch magic**: App updates in ~2 seconds without full reload!

**Try These Changes**:
- Change welcome message text
- Modify colors in `colors.js`
- Add more text components
- Change image source

**Hot Reload Benefits**:
- ⚡ **Fast iteration**: No manual reload needed
- 🎯 **Instant feedback**: See changes immediately
- 💪 **Productivity boost**: Save hours of development time

**If Hot Reload Breaks**:
- Press `r` in terminal to reload manually
- Press `Cmd+D` (iOS) or `Cmd+M` (Android) for dev menu
- Run `npx expo start --clear` to clear cache

---

## ✅ Success Checklist

Your activity is complete when:

- [ ] Custom welcome message displays (TODO #1)
- [ ] Color theme is applied throughout (TODO #2)
- [ ] Custom image loads correctly (TODO #3)
- [ ] Additional text appears below card (TODO #4)
- [ ] Hot reload works smoothly (TODO #5)
- [ ] No errors in terminal/console
- [ ] No red error screens in app

---

## 🎨 What You've Learned

**Core Concepts**:
- ✅ **Expo Setup**: How to start a React Native project
- ✅ **Basic Components**: View, Text, Image
- ✅ **Styling**: StyleSheet and color systems
- ✅ **Hot Reload**: Rapid development workflow
- ✅ **Component Composition**: Using pre-built components

**Key Skills**:
- Setting up React Native development environment
- Modifying UI text and images
- Customizing color themes
- Understanding component structure
- Using hot reload for fast iteration

---

## 🚀 Extension Challenges (Optional)

Completed all TODOs? Try these:

### Beginner Extensions
- [ ] Add multiple color themes and switch between them
- [ ] Create a second WelcomeCard with different content
- [ ] Add emoji icons to your text

### Intermediate Extensions
- [ ] Change font sizes in the stylesheet
- [ ] Add backgroundColor to the container
- [ ] Create a custom component similar to WelcomeCard

### Advanced Extensions
- [ ] Rearrange elements using flexDirection
- [ ] Add multiple images in a row
- [ ] Create a grid layout with multiple cards

---

## 🔗 Related Activities

This template connects to:
- **Activity 02**: Button Counter (builds on styling)
- **Activity 03**: Todo List (uses component patterns)
- **Project 01**: Creative Studio (uses this foundation)

---

## 📚 Resources

**Documentation**:
- [React Native Text](https://reactnative.dev/docs/text)
- [React Native Image](https://reactnative.dev/docs/image)
- [Expo SDK 53](https://docs.expo.dev/versions/v53.0.0/)

**Tutorials**:
- [React Native Express](http://www.reactnativeexpress.com/)
- [Expo Snack - Try online](https://snack.expo.dev/)

**Troubleshooting**:
- [Expo Troubleshooting](https://docs.expo.dev/troubleshooting/overview/)
- Network error? Ensure phone and computer on same WiFi

---

## 📤 Submission

When you're done:
1. Take **2-4 screenshots** of your completed app
2. Submit via: [Activity Submission Form](https://forms.gle/a7HFJG6iv4iNdLRk6)
3. Include brief reflection: What did you learn?

**Required**:
- [ ] All 5 TODOs completed
- [ ] App runs without errors
- [ ] Screenshots showing customizations

**Optional** (extra credit):
- [ ] At least 1 extension challenge
- [ ] Creative color/layout customization

---

## 💡 Common Issues & Solutions

**Issue**: "Cannot find module 'expo'"
**Solution**: Run `npm install --legacy-peer-deps` again

**Issue**: "Network error" on device
**Solution**: Ensure phone and computer on same WiFi network

**Issue**: "Metro bundler failed to start"
**Solution**: Run `npx expo start --clear` to clear cache

**Issue**: Red error screen in app
**Solution**: Check terminal for error details, ensure all tags are closed

---

**🎉 Congratulations!**

You've completed your first React Native template! You now understand:
- How mobile apps are structured
- How to modify UI components
- How hot reload accelerates development

**Next Steps**:
1. Submit your work
2. Complete Exit Ticket for Lesson 01
3. Move on to Activity 02: Button Counter

---

*Activity 01 Template | M1: Mobile Apps I Love | Expo SDK 53 | React Native 0.79.5*
