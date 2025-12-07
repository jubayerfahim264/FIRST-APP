# 🚀 Android Build Quick Start Guide

## Step 1: Setup (One-time)

```powershell
# Install EAS CLI globally
npm install -g eas-cli

# Navigate to project
cd E:\Project\FIRST_APP

# Login to Expo (free account at https://expo.dev)
eas login
```

## Step 2: Build Your APK

### Option A: Cloud Build (Recommended) ⭐

```powershell
npm run build:android
```

**Why choose cloud build:**
- ✅ No Android SDK needed
- ✅ Runs on Expo servers
- ✅ Always uses latest build tools
- ✅ Time: 10-15 minutes

### Option B: Local Build (Faster if cached)

```powershell
npm run build:android:local
```

**Requirements:**
- Android SDK installed
- 8GB+ RAM
- Time: 15-20 minutes first time, 5-10 min after

### Option C: Quick Development Build

```powershell
npm run build:android:dev
```

**For testing only - faster but larger**

## Step 3: Download & Install

Once build completes:

1. Visit https://expo.dev/builds
2. Click on your Android build
3. Download the APK file
4. Connect Android device via USB
5. Run:

```powershell
adb install -r downloaded-app.apk
```

## Step 4: Launch App

```powershell
# Start the app on device
adb shell am start -n com.firstapp.todos/.MainActivity

# Or just tap the app icon on your phone!
```

## 📊 Build Comparison

| Method | Size | Time | Needs SDK |
|--------|------|------|-----------|
| Cloud Build | 20-28 MB | 10-15 min | ❌ No |
| Local Build | 20-28 MB | 5-20 min | ✅ Yes |
| Dev Build | 25-35 MB | 8-12 min | ❌ No |

## ✨ Expected Results

✅ **Lightweight APK**: 20-28 MB  
✅ **Fast Installation**: < 1 minute  
✅ **Minimal Permissions**: Only needed ones  
✅ **Google AdMob Ready**: Monetization included  
✅ **Android 7.0+**: Broad device support  

## 🐛 Common Issues & Fixes

### Issue: "eas login failed"
```powershell
# Solution: Create free account at https://expo.dev, then try again
```

### Issue: "Build timeout"
```powershell
# Solution: Try again or use local build
eas build --timeout 3600 --platform android --buildType apk
```

### Issue: "APK won't install"
```powershell
# Solution: Uninstall old version first
adb uninstall com.firstapp.todos
adb install app-release.apk
```

### Issue: "Device not recognized"
```powershell
# Solution: Enable USB debugging on phone
# Settings > Developer Options > USB Debugging
adb devices  # Should show your device
```

## 📱 Install APK Without USB

Instead of USB, upload APK to cloud:

1. Upload APK to Google Drive, Dropbox, or email
2. Download on Android phone
3. Open file manager → tap APK → Install

## 🎯 What's Included in the APK

✅ Todo list app with local storage  
✅ Beautiful UI with animations  
✅ Google AdMob banner ads  
✅ Interstitial ads on task deletion  
✅ Light/dark theme support  
✅ Zero external dependencies (offline-first)  

## 📝 App Details

- **Package**: `com.firstapp.todos`
- **Version**: 1.0.0
- **Min Android**: 7.0 (API 24)
- **Target Android**: 14 (API 34)
- **Architectures**: arm64-v8a, armeabi-v7a

## 🔄 Update App Version

When you want to release v1.0.1:

```json
// In app.json
{
  "expo": {
    "version": "1.0.1"
  }
}
```

Then rebuild:
```powershell
npm run build:android
```

## 📞 Need Help?

- **Build logs**: Check https://expo.dev/builds
- **Expo docs**: https://docs.expo.dev
- **Android help**: https://developer.android.com

---

**You're ready! Build your APK now:**

```powershell
npm run build:android
```

⏱️ Total time: ~15 minutes

Happy building! 🎉
