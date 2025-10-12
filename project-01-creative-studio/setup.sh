#!/bin/bash

# Project 01: My Creative Studio - React Native + Expo Setup
# M1: Mobile Apps I Love

echo "🎨 My Creative Studio - React Native + Expo Setup"
echo "================================================="
echo ""

# Check if script is run from correct directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the project-01-creative-studio directory"
    echo "   Expected: cd Template Solution/project-01-creative-studio && ./setup.sh"
    exit 1
fi

echo "🎓 DISCOVERY LEARNING OBJECTIVES:"
echo "   • Build cross-platform mobile apps with React Native"
echo "   • Integrate device capabilities (camera, media library)"
echo "   • Master state management and navigation patterns"
echo "   • Create professional UI/UX for mobile platforms"
echo ""

echo "📚 Key Technologies (Weeks 1-8):"
echo "   → React Native fundamentals & component architecture"
echo "   → Expo SDK for device APIs (camera, media, storage)"
echo "   → React Navigation for multi-screen apps"
echo "   → AsyncStorage for local data persistence"
echo ""

# Check for Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found"
    echo "   Please install Node.js from: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js detected: $(node --version)"
echo ""

# Check for Expo CLI (optional but recommended)
if ! command -v expo &> /dev/null; then
    echo "⚠️  Expo CLI not found globally"
    echo "   Installing locally for this project..."
    echo "   (For global install: npm install -g @expo/cli)"
    echo ""
fi

# Check for node_modules
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies (this may take 2-3 minutes)..."
    echo ""

    # Try standard install first
    npm install --legacy-peer-deps

    # If it fails, try with force
    if [ $? -ne 0 ]; then
        echo "⚠️  Standard install failed, trying with --force..."
        npm install --force

        if [ $? -ne 0 ]; then
            echo "❌ npm install failed"
            echo "   Please check your internet connection and try again"
            exit 1
        fi
    fi

    echo "✅ Dependencies installed successfully!"
    echo ""
else
    echo "✅ Dependencies already installed"
    echo ""
fi

echo "📁 Project Structure:"
echo "   • Entry point: App.js"
echo "   • Screens: src/screens/ (7 screens total)"
echo "   • Components: src/components/ (reusable UI)"
echo "   • Utils: src/utils/ (helpers, constants)"
echo ""

echo "📱 Testing Options:"
echo "   1. Expo Go App (Recommended)"
echo "      - Install 'Expo Go' on your iOS/Android device"
echo "      - Scan QR code to test instantly"
echo "   "
echo "   2. iOS Simulator (Mac only)"
echo "      - Press 'i' after starting to launch"
echo "   "
echo "   3. Android Emulator"
echo "      - Press 'a' after starting to launch"
echo "   "
echo "   4. Web Preview (Limited features)"
echo "      - Press 'w' after starting to open in browser"
echo ""

echo "🎨 App Features (Week 1-8 Implementation):"
echo "   • Photo/Video Capture: Camera integration"
echo "   • Basic Editing: Crop, rotate, filters"
echo "   • Gallery Management: Albums and organization"
echo "   • Community: Share creations"
echo "   • Profile: User settings"
echo ""

echo "🚀 Starting Expo development server..."
echo ""
echo "   → Server will start with QR code"
echo "   → Scan with Expo Go app to test on device"
echo "   → Press Ctrl+C to stop the server"
echo ""
echo "================================================="
echo ""

# Start the development server
npx expo start

# If expo start fails, try alternative
if [ $? -ne 0 ]; then
    echo "⚠️  Standard expo start failed, trying with tunnel mode..."
    npx expo start --tunnel
fi
