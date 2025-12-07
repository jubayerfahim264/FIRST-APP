#!/bin/bash

# Android Build Script for FIRST_APP
# Usage: ./build-android.sh [profile]
# Profiles: production (default), preview, development

PROFILE=${1:-production}
PACKAGE_NAME="com.firstapp.todos"

echo "=========================================="
echo "FIRST_APP - Android Build Script"
echo "=========================================="
echo "Profile: $PROFILE"
echo "Package: $PACKAGE_NAME"
echo ""

# Check if eas-cli is installed
if ! command -v eas &> /dev/null; then
    echo "❌ EAS CLI not found. Installing..."
    npm install -g eas-cli
fi

# Check if logged in
echo "✓ Checking Expo login..."
eas whoami > /dev/null 2>&1
if [ $? -ne 0 ]; then
    echo "⚠️  Not logged in. Running: eas login"
    eas login
fi

# Clean and install dependencies
echo ""
echo "✓ Cleaning and installing dependencies..."
npm install

# Build APK
echo ""
echo "✓ Starting Android build (Profile: $PROFILE)..."
echo "This may take 10-15 minutes on first build..."
echo ""

eas build --platform android --buildType apk --profile $PROFILE

if [ $? -eq 0 ]; then
    echo ""
    echo "=========================================="
    echo "✅ Build successful!"
    echo "=========================================="
    echo ""
    echo "Your APK is ready. Visit https://expo.dev/builds to download."
    echo ""
    echo "To install on device:"
    echo "  adb install -r app-release.apk"
    echo ""
else
    echo ""
    echo "=========================================="
    echo "❌ Build failed!"
    echo "=========================================="
    echo ""
    echo "Check the logs above for details."
    exit 1
fi
