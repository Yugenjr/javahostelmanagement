@echo off
echo ========================================
echo   FAST FRONTEND SETUP
echo ========================================

echo.
echo [1/3] Cleaning up old installations...
if exist node_modules (
    echo Removing old node_modules...
    rmdir /s /q node_modules
)

if exist package-lock.json (
    echo Removing package-lock.json...
    del package-lock.json
)

echo.
echo [2/3] Installing minimal dependencies...
echo This should be much faster now!

npm install --no-optional --no-audit --no-fund

echo.
echo [3/3] Starting development server...
npm start

echo.
echo ========================================
echo   FAST SETUP COMPLETE!
echo ========================================
