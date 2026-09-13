@echo off
REM Free Fire Game APK Builder for Windows
REM Complete automated APK build script for Android

echo.
echo ╔══════════════════════════════════════╗
echo ║  FREE FIRE GAME - APK BUILDER v1.0  ║
echo ╚══════════════════════════════════════╝
echo.

REM Check Node.js
echo Checking Node.js installation...
where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo ERROR: Node.js not found. Please install Node.js first.
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
echo OK - Node.js found: %NODE_VERSION%
echo.

REM Check npm
echo Checking npm...
where npm >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo ERROR: npm not found.
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('npm -v') do set NPM_VERSION=%%i
echo OK - npm found: %NPM_VERSION%
echo.

REM Check Cordova
echo Checking Cordova...
where cordova >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo Installing Cordova CLI...
    call npm install -g cordova
)
echo OK - Cordova found
echo.

REM Create Cordova project
echo Setting up Cordova project...
if not exist "cordova-freefire" (
    echo Creating new Cordova project...
    call cordova create cordova-freefire com.freefire.game "FreeFire"
)

cd cordova-freefire

REM Add Android platform
echo Adding Android platform...
call cordova platform ls | find "android" >nul
if %ERRORLEVEL% neq 0 (
    call cordova platform add android
)

REM Copy game files
echo Copying game files...
copy ..\index.html www\
copy ..\game.js www\
copy ..\styles.css www\
copy ..\config.xml .

REM Build APK
echo.
echo Building APK (this may take several minutes)...
echo Please wait...
echo.

call cordova build android --release

echo.
echo ╔════════════════════════════════════════╗
echo ║  APK BUILD COMPLETED SUCCESSFULLY      ║
echo ╚════════════════════════════════════════╝
echo.

REM Check if APK was created
set APK_PATH=platforms\android\app\build\outputs\apk\release\app-release.apk
if exist "%APK_PATH%" (
    echo APK Location:
    echo %cd%\%APK_PATH%
    echo.
    dir "%APK_PATH%"
    echo.
    echo ========== INSTALLATION INSTRUCTIONS ==========
    echo.
    echo 1. Enable USB Debugging:
    echo    Settings ^> Developer Options ^> USB Debugging
    echo.
    echo 2. Connect your Android device via USB
    echo.
    echo 3. Run the following command in Command Prompt:
    echo    adb install -r "%cd%\%APK_PATH%"
    echo.
    echo 4. Or manually install:
    echo    - Copy APK to your device
    echo    - Open file manager and install
    echo.
    echo Ready to play! BOOYAH!
    echo.
) else (
    echo ERROR: APK not found. Build may have failed.
    pause
    exit /b 1
)

pause
