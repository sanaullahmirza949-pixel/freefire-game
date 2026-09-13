@echo off
REM Free Fire Game - APK Build Script for Windows
REM This script builds the game into an APK file

echo.
echo ================================
echo Free Fire Game - APK Builder
echo ================================
echo.

REM Check if PhoneGap/Cordova is installed
where phonegap >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo WARNING: PhoneGap CLI not found. Installing...
    call npm install -g phonegap
)

echo Building APK...
echo.

REM Build for Android
call phonegap build android --release

echo.
echo APK Build Complete!
echo.
echo APK Location: platforms\android\app\build\outputs\apk\release\
echo.
echo To install on your device:
echo   adb install -r platforms\android\app\build\outputs\apk\release\app-release.apk
echo.

pause
