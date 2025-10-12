#!/bin/bash
echo "🚀 Setting up My Creative Studio App (M1 Project 01)..."

# Check for Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is required but not installed"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

# Check for npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm is required but not installed"
    echo "Please install npm (comes with Node.js)"
    exit 1
fi

# Display Node and npm versions
echo "📦 Node.js version: $(node --version)"
echo "📦 npm version: $(npm --version)"

# Check for Expo CLI globally, install if needed
if ! command -v expo &> /dev/null; then
    echo "📦 Installing Expo CLI globally..."
    npm install -g @expo/cli
else
    echo "✅ Expo CLI is already installed: $(expo --version)"
fi

# Install dependencies with legacy peer deps (for React Native compatibility)
echo "📦 Installing React Native dependencies..."
npm install --legacy-peer-deps

# Check if installation was successful
if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully!"
else
    echo "❌ Installation failed. Trying alternative approach..."
    npm install --force
    if [ $? -ne 0 ]; then
        echo "❌ Installation failed completely. Please check your Node.js/npm setup."
        exit 1
    fi
fi

# Start the Expo development server
echo "🚀 Starting My Creative Studio App..."
echo ""
echo "📱 This creative studio app includes:"
echo "  • Photo and video editing tools"
echo "  • Creative filters and effects"
echo "  • Media library management"
echo "  • Sharing capabilities"
echo ""
echo "💡 Testing options:"
echo "  • Press 'w' to open in web browser"
echo "  • Press 'a' to open in Android emulator"
echo "  • Press 'i' to open in iOS simulator"
echo "  • Scan QR code with Expo Go app on your phone"
echo ""
echo "🛑 Press Ctrl+C to stop the development server"
echo ""

# Start Expo (this will show QR code and development options)
npx expo start

# If expo start fails, try alternative
if [ $? -ne 0 ]; then
    echo "⚠️ Standard expo start failed, trying with tunnel mode..."
    npx expo start --tunnel
fi