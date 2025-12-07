# 🚀 QUICK REFERENCE - Build Your Android APK

## ⚡ 30-Second Build

```powershell
npm install -g eas-cli
eas login
npm run build:android
```

**Done!** APK builds in 10-15 minutes.

## 📥 Installation (After Build)

```powershell
# 1. Download APK from https://expo.dev/builds
# 2. Connect phone via USB
# 3. Run:
adb install -r app-release.apk
```

## 📱 App Details

```
Package Name: com.firstapp.todos
Version: 1.0.0
Min SDK: Android 7.0 (API 24)
APK Size: 20-28 MB
Build Time: 10-15 minutes
```

## 📊 Build Options

| Command | Time | Size | For |
|---------|------|------|-----|
| `npm run build:android` | 10-15 min | 20-28 MB | Production |
| `npm run build:android:preview` | 8-12 min | 22-30 MB | Testing |
| `npm run build:android:dev` | 5-10 min | 25-35 MB | Development |
| `npm run build:android:local` | 15-20 min | 20-25 MB | Local machine |

## 🎯 Prerequisites

✅ Free Expo account (https://expo.dev)  
✅ Node.js installed  
✅ No Android SDK needed (cloud build)  

## 💾 What's Included

- ✅ Todo list app
- ✅ Local data storage
- ✅ Beautiful UI with animations
- ✅ Google AdMob ads (monetization)
- ✅ Light/dark theme

## 🔄 Update Version

```json
{
  "expo": {
    "version": "1.0.1"
  }
}
```

Then rebuild: `npm run build:android`

## 🐛 Quick Fixes

**Build fails?**
```powershell
eas build --platform android --buildType apk
```

**Won't install?**
```powershell
adb uninstall com.firstapp.todos
adb install -r app.apk
```

**Need logs?**
Visit: https://expo.dev/builds

## 📚 Full Guides

- [ANDROID_BUILD_STEPS.md](./ANDROID_BUILD_STEPS.md) - Step-by-step
- [ANDROID_BUILD.md](./ANDROID_BUILD.md) - Technical details
- [ANDROID_OPTIMIZATION.md](./ANDROID_OPTIMIZATION.md) - Optimization

## 💰 Monetization Ready

Your Google AdMob IDs are configured:
- Banner Ads: `ca-app-pub-3781453093578120/5843272434`
- Interstitial: `ca-app-pub-3781453093578120/5668830856`
- Rewarded: `ca-app-pub-3781453093578120/6905890901`

Ads show automatically once APK is installed!

## ✨ Key Features

- Add/Edit/Delete tasks
- Task notes/details
- Progress tracking
- Smooth animations
- Offline-first (no internet needed)
- AdMob monetization

---

**Next Step**: `npm run build:android`

Built with Expo & React Native 🚀
