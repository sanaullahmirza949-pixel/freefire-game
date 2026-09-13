# Free Fire Game - Setup & Build Guide

## Prerequisites

Before building the APK, make sure you have the following installed:

### For All Platforms
- **Node.js & npm** - [Download here](https://nodejs.org/)
- **Java Development Kit (JDK)** - [Download here](https://www.oracle.com/java/technologies/downloads/)
- **Android SDK** - [Download Android Studio](https://developer.android.com/studio)

### For macOS
- **Xcode** - Install from App Store
- **CocoaPods** - Install via: `sudo gem install cocoapods`

### For Windows
- **Visual Studio** - [Download here](https://visualstudio.microsoft.com/downloads/)

---

## Installation Steps

### 1. Install Cordova/PhoneGap

```bash
npm install -g cordova
npm install -g phonegap
```

### 2. Set Up Android SDK

Set the `ANDROID_HOME` environment variable:

**Windows:**
```bash
setx ANDROID_HOME "C:\Users\YourUsername\AppData\Local\Android\Sdk"
```

**macOS/Linux:**
```bash
export ANDROID_HOME=~/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

### 3. Install Android Platform

```bash
cordova platform add android
```

### 4. Install Dependencies

```bash
cd freefire-game
npm install
```

---

## Building the APK

### Option 1: Using Build Script

**Linux/macOS:**
```bash
chmod +x build-apk.sh
./build-apk.sh
```

**Windows:**
```cmd
build-apk.bat
```

### Option 2: Manual Build

```bash
# Debug APK
cordova build android

# Release APK (Recommended)
cordova build android --release

# With more options
phonegap build android --release --verbose
```

### Output Location

The APK file will be generated at:
```
platforms/android/app/build/outputs/apk/release/app-release.apk
```

---

## Installing on Device

### Option 1: Using ADB (Android Debug Bridge)

```bash
adb install -r platforms/android/app/build/outputs/apk/release/app-release.apk
```

### Option 2: Manual Installation

1. Copy the APK file to your device
2. Go to Settings → Security
3. Enable "Unknown Sources"
4. Open the APK file and tap Install

### Option 3: Play Store Upload

To upload to Google Play Store:
1. Create a Google Play Developer account
2. Sign the APK with your keystore
3. Follow the Google Play deployment guide

---

## Signing the APK (For Production)

### Create a Keystore

```bash
keytool -genkey -v -keystore freefire-game.keystore -keyalg RSA -keysize 2048 -validity 10000 -alias freefire-alias
```

### Sign the APK

```bash
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore freefire-game.keystore \
  platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk freefire-alias
```

### Align the APK

```bash
zipalign -v 4 platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk \
  freefire-game-signed.apk
```

---

## Troubleshooting

### Issue: "ANDROID_HOME not found"
**Solution:** Set the ANDROID_HOME environment variable (see step 2 above)

### Issue: "Gradle build failed"
**Solution:** 
```bash
cordova clean android
cordova build android --release
```

### Issue: "Device not connected"
**Solution:** 
- Enable USB Debugging on your device
- Install ADB drivers
- Run `adb devices` to verify connection

### Issue: "Java version mismatch"
**Solution:** Use Java 11:
```bash
export JAVA_HOME=/path/to/java11
```

---

## Quick Start Commands

```bash
# Install all dependencies
npm install && cordova platform add android

# Build debug APK
cordova build android

# Build release APK
cordova build android --release

# Install on device
adb install -r platforms/android/app/build/outputs/apk/release/app-release.apk

# Run on device
cordova run android

# Run on emulator
cordova emulate android
```

---

## Resources

- [Cordova Documentation](https://cordova.apache.org/docs/en/latest/)
- [PhoneGap Build](https://build.phonegap.com/)
- [Android Studio Setup](https://developer.android.com/studio/install)
- [Google Play Console](https://play.google.com/console)

---

## Notes

- The game works best on Android 6.0+ devices
- Minimum SDK: API 19 (Android 4.4)
- Target SDK: API 30 (Android 11+)
- Recommended resolution: 1080x1920 or higher

---

**Happy Gaming! 🎮🔥**
