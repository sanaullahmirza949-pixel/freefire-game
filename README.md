# 🔥 Free Fire - Battle Royale Game

A fully functional browser-based battle royale game inspired by Free Fire with multiplayer gameplay mechanics.

![Free Fire Game](https://img.shields.io/badge/Game-Battle%20Royale-orange)
![License](https://img.shields.io/badge/License-MIT-blue)
![Status](https://img.shields.io/badge/Status-Complete-brightgreen)

## 🎮 Game Features

✅ **50 Player Battle Royale** - Start with 50 players and fight to be the last one standing
✅ **Dynamic Zone System** - Play through 5 phases as the safe zone shrinks
✅ **4 Unique Weapons** - M4A1, AWM, Shotgun, and Pistol with different mechanics
✅ **Real-time Combat** - Shoot, dodge, and survive
✅ **Health System** - Take damage from enemies and the shrinking zone
✅ **Weapon Pickups** - Collect weapons scattered across the map
✅ **Kill Feed** - Track your kills in real-time
✅ **Smooth Camera** - Camera follows your player
✅ **AI Enemies** - Intelligent enemy AI with combat behavior
✅ **Mobile Optimized** - Works on desktop and mobile devices

---

## 🚀 QUICK START (30 seconds)

### Play in Browser
```bash
# Simply open index.html in your browser
open index.html
```

### Build APK for Android

**Windows:**
```cmd
double-click build.bat
```

**macOS/Linux:**
```bash
chmod +x build.sh
./build.sh
```

---

## 🎯 How to Play

### Controls
| Action | Key |
|--------|-----|
| Move Forward | W or ↑ |
| Move Backward | S or ↓ |
| Move Left | A or ← |
| Move Right | D or → |
| Aim | Mouse Movement |
| Shoot | Mouse Click |

### Game Objective
1. ✅ Survive and eliminate other players
2. ✅ Collect weapons and ammunition
3. ✅ Stay inside the shrinking safe zone (red circle)
4. ✅ Be the last player alive
5. ✅ BOOYAH! Victory!

### Weapon Stats
| Weapon | Damage | Fire Rate | Ammo | Range | Best For |
|--------|--------|-----------|------|-------|----------|
| M4A1 | 25 | Fast | 30 | 800m | All-purpose |
| AWM | 80 | Slow | 5 | 2000m | Long-range |
| Shotgun | 60 | Medium | 8 | 200m | Close combat |
| Pistol | 15 | Very Fast | 15 | 300m | Emergency |

---

## 📱 Build APK (Android)

### Prerequisites
- Node.js & npm: https://nodejs.org/
- Java JDK 11+: https://www.oracle.com/java/technologies/downloads/
- Android SDK: https://developer.android.com/studio

### Installation Steps

#### 1️⃣ Install Cordova
```bash
npm install -g cordova
```

#### 2️⃣ Set Android SDK Path
**Windows:**
```cmd
setx ANDROID_HOME "C:\Users\YourUsername\AppData\Local\Android\Sdk"
```

**macOS/Linux:**
```bash
export ANDROID_HOME=~/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator:$ANDROID_HOME/tools:$ANDROID_HOME/tools/bin:$ANDROID_HOME/platform-tools
```

#### 3️⃣ Build APK
**Windows:**
```cmd
build.bat
```

**macOS/Linux:**
```bash
./build.sh
```

#### 4️⃣ Install on Device
```bash
# Enable USB Debugging on your Android device first
adb install -r platforms/android/app/build/outputs/apk/release/app-release.apk
```

### APK Output Location
```
cordova-freefire/platforms/android/app/build/outputs/apk/release/app-release.apk
```

---

## 🔧 Technical Details

### Architecture
- **Frontend**: HTML5 Canvas + Vanilla JavaScript
- **Game Engine**: Custom Canvas-based engine
- **Mobile**: Cordova/PhoneGap wrapper
- **Build System**: Gradle + Cordova CLI

### Performance
- 60 FPS gameplay
- Real-time collision detection
- Optimized rendering pipeline
- Responsive camera system
- Mobile optimized

### File Structure
```
freefire-game/
├── index.html          # Main game HTML
├── styles.css          # Game styling
├── game.js             # Game logic (14KB)
├── config.xml          # Cordova config
├── package.json        # NPM dependencies
├── build.sh            # macOS/Linux build script
├── build.bat           # Windows build script
├── SETUP_GUIDE.md      # Detailed setup guide
└── README.md           # This file
```

---

## 🎓 Game Mechanics

### Zone System
- Safe zone starts at map center
- Shrinks progressively (5 phases)
- Players outside zone take damage
- Final zone is extremely small

### Combat System
- Bullet physics with range
- Weapon damage varies by type
- Collision detection for hits
- Health bar damage visualization

### AI Behavior
- Random movement patterns
- Weapon collection
- Combat engagement
- Zone awareness

### Win Conditions
- Eliminate all other players
- Be the last player alive
- Achieve BOOYAH status!

---

## 🐛 Troubleshooting

### "ANDROID_HOME not set"
```bash
# Set environment variable
export ANDROID_HOME=/path/to/android/sdk
```

### "Gradle build failed"
```bash
cd cordova-freefire
cordova clean android
cordova build android --release
```

### "Device not detected"
```bash
# Check connected devices
adb devices

# Enable USB Debugging on your device:
# Settings > Developer Options > USB Debugging
```

### "Java version error"
```bash
# Use Java 11 specifically
export JAVA_HOME=/path/to/java11
```

---

## 📋 Supported Platforms

| Platform | Support | Notes |
|----------|---------|-------|
| Android | ✅ Yes | API 19+ (Android 4.4+) |
| iOS | ⏳ Soon | Native build coming |
| Web (Desktop) | ✅ Yes | Chrome, Firefox, Safari |
| Web (Mobile) | ✅ Yes | Chrome, Safari on mobile |

---

## 🎨 Game Elements

- **Green Rectangle** - Your player
- **Orange Rectangle** - Enemy AI
- **Yellow Squares** - Weapon pickups
- **Red Circle** - Safe zone boundary
- **Green Bar** - Your health
- **Kill Feed** - Recent eliminations

---

## 🌟 Future Enhancements

- [ ] Multiplayer networking (WebSocket)
- [ ] Power-ups and items
- [ ] Multiple maps
- [ ] Sound effects & music
- [ ] Particle effects & animations
- [ ] Leaderboard system
- [ ] Different game modes (Duos, Squads)
- [ ] Skins and cosmetics
- [ ] iOS support
- [ ] Server backend

---

## 📚 Resources

- [Cordova Documentation](https://cordova.apache.org/docs/en/latest/)
- [Android Studio Setup](https://developer.android.com/studio/install)
- [Google Play Console](https://play.google.com/console)
- [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)

---

## 💡 Tips & Tricks

1. **Early Game**: Land in areas with weapon spawns
2. **Mid Game**: Stay ahead of the zone
3. **Late Game**: High-ground advantage is key
4. **Weapon Choice**: Use AWM for long-range, Shotgun for close combat
5. **Health Management**: Keep moving to avoid being an easy target
6. **Zone Knowledge**: Always move towards the next safe zone early

---

## 📝 License

MIT License - See LICENSE file for details

This project is open source and free for educational and personal use.

---

## 👨‍💻 Credits

**Developer**: sanaullahmirza949-pixel

**Inspired by**: Free Fire (Garena)

---

## 🎉 Ready to Play?

### Desktop
```bash
open index.html
```

### Mobile (APK)
1. Run `build.bat` (Windows) or `./build.sh` (macOS/Linux)
2. Connect Android device via USB
3. Run `adb install -r <APK_PATH>`
4. Open the app and enjoy!

---

<div align="center">

### 🔥 **BOOYAH! GAME ON!** 🔥

**Download • Play • Dominate**

[⬇️ Download APK](#build-apk-android) | [🌐 Play Online](#quick-start-30-seconds) | [⭐ Star Repo](https://github.com/sanaullahmirza949-pixel/freefire-game)

---

Made with ❤️ by sanaullahmirza949-pixel

</div>
