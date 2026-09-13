#!/bin/bash

# Free Fire Game APK Builder
# Complete automated APK build script for Android

set -e

echo "╔══════════════════════════════════════╗"
echo "║  FREE FIRE GAME - APK BUILDER v1.0  ║"
echo "╚══════════════════════════════════════╝"
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check Node.js
echo -e "${BLUE}→ Checking Node.js installation...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}✗ Node.js not found. Please install Node.js first.${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Node.js found: $(node -v)${NC}"

# Check npm
echo -e "${BLUE}→ Checking npm...${NC}"
if ! command -v npm &> /dev/null; then
    echo -e "${RED}✗ npm not found.${NC}"
    exit 1
fi
echo -e "${GREEN}✓ npm found: $(npm -v)${NC}"

# Install Cordova if not present
echo -e "${BLUE}→ Checking Cordova...${NC}"
if ! command -v cordova &> /dev/null; then
    echo -e "${YELLOW}⚠ Installing Cordova CLI...${NC}"
    npm install -g cordova
fi
echo -e "${GREEN}✓ Cordova found${NC}"

# Create Cordova project
echo -e "${BLUE}→ Setting up Cordova project...${NC}"
if [ ! -d "cordova-freefire" ]; then
    echo -e "${YELLOW}⚠ Creating new Cordova project...${NC}"
    cordova create cordova-freefire com.freefire.game "FreeFire"
fi

cd cordova-freefire

# Add Android platform
echo -e "${BLUE}→ Adding Android platform...${NC}"
if ! cordova platform ls | grep -q "android"; then
    cordova platform add android@latest
fi

# Copy game files
echo -e "${BLUE}→ Copying game files...${NC}"
cp ../index.html www/
cp ../game.js www/
cp ../styles.css www/
cp ../config.xml .

# Update config.xml for better mobile experience
echo -e "${BLUE}→ Updating configuration...${NC}"

# Build APK
echo -e "${BLUE}→ Building APK (this may take several minutes)...${NC}"
echo ""

cordova build android --release

echo ""
echo -e "${GREEN}╔════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║  ✓ APK BUILD COMPLETED SUCCESSFULLY   ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════╝${NC}"
echo ""

APK_PATH="platforms/android/app/build/outputs/apk/release/app-release.apk"
if [ -f "$APK_PATH" ]; then
    echo -e "${GREEN}✓ APK Location:${NC}"
    echo "  $(pwd)/$APK_PATH"
    echo ""
    ls -lh "$APK_PATH"
    echo ""
    echo -e "${BLUE}📦 Installation Instructions:${NC}"
    echo ""
    echo -e "${YELLOW}1. Enable USB Debugging:${NC}"
    echo "   Settings → Developer Options → USB Debugging"
    echo ""
    echo -e "${YELLOW}2. Connect your Android device via USB${NC}"
    echo ""
    echo -e "${YELLOW}3. Run the following command:${NC}"
    echo "   adb install -r $(pwd)/$APK_PATH"
    echo ""
    echo -e "${YELLOW}4. Or manually install:${NC}"
    echo "   - Copy APK to your device"
    echo "   - Open file manager and install"
    echo ""
    echo -e "${BLUE}🎮 Ready to play! BOOYAH!${NC}"
else
    echo -e "${RED}✗ APK not found. Build may have failed.${NC}"
    exit 1
fi
