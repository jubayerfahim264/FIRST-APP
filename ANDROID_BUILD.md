# Android Build Optimization Guide

This app is optimized for minimal APK size on Android. Follow these steps to build a lightweight APK.

## Prerequisites

```powershell
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login
```

## Build Commands

### Option 1: Build Lightweight APK (Recommended)

```powershell
cd E:\Project\FIRST_APP

# Build production APK (smallest size)
eas build --platform android --buildType apk

# Or for preview build
eas build --platform android --buildType preview
```

### Option 2: Local Build (Requires Android SDK)

```powershell
# Build locally (if you have Android SDK installed)
eas build --platform android --local
```

### Option 3: Quick Development Build

```powershell
# For faster testing
eas build --platform android --buildType apk --profile development
```

## Size Optimization Settings

The following optimizations are already configured in `app.json`:

✅ **Disabled Features**:
- `newArchEnabled: false` - Uses stable React Native architecture
- `reactCompiler: false` - Standard compiler (faster build)

✅ **Android Optimizations**:
- `minSdkVersion: 24` - Android 7.0+ (wider device support)
- `compileSdkVersion: 34` - Latest stable SDK
- `targetSdkVersion: 34` - Latest target
- Removed unnecessary icon resources (background & monochrome)

✅ **Bundle Optimizations**:
- Minimal dependencies
- Tree-shaking enabled
- Metro bundler optimization

## Expected APK Size

- **Baseline**: ~25-35 MB (with all dependencies)
- **Optimized**: ~20-28 MB (with above settings)

## Installation on Device

Once the build completes:

```powershell
# Download the APK from EAS dashboard, then:
adb install app-release.apk
```

Or if using development build:

```powershell
# Use Expo Go or development client
```

## Monitoring APK Size

Check build logs on EAS dashboard:
1. Go to https://expo.dev/builds
2. Select your Android build
3. View logs and artifact size

## Further Size Reduction Tips

If you need to reduce size further:

1. **Remove unused assets**: Delete images in `assets/` folder
2. **Minify JS**: Already enabled in production builds
3. **Proguard/R8**: Automatically enabled for release builds
4. **Split APKs**: Build separate APKs for different architectures
5. **Reduce dependencies**: Remove unused npm packages

## Current Dependencies

```json
{
  "core": [
    "react@19.1.0",
    "react-native@0.81.5",
    "expo@~54.0.27",
    "expo-router@~6.0.17"
  ],
  "storage": [
    "@react-native-async-storage/async-storage@^1.18.2"
  ],
  "ui": [
    "react-native-reanimated@~4.1.1"
  ],
  "ads": [
    "google-mobile-ads-react-native@^12.0.0"
  ]
}
```

All are essential - none can be removed without breaking functionality.

## Build Time

Expected build times:
- First build: 10-15 minutes
- Subsequent builds: 5-10 minutes

## Troubleshooting

**Build fails with "Out of memory"**:
- ✅ Already configured in eas.json with `-Xmx4096m`

**APK too large**:
- Check for debug symbols (release builds should be ~20-30 MB)
- Verify proguard is enabled

**Installation fails**:
- Use `adb install -r app-release.apk` to replace existing app
- Check device has enough free space

## Testing the Build

```powershell
# Install and run on Android emulator
adb install -r ./app-release.apk
adb shell am start -n com.firstapp.todos/.MainActivity
```

## Package Details

- **Package Name**: `com.firstapp.todos`
- **Min SDK**: API 24 (Android 7.0)
- **Target SDK**: API 34 (Android 14)
- **Arch**: Universal (arm64-v8a + armeabi-v7a)

---

Built with ❤️ for minimal Android footprint
