@echo off
echo ========================================
echo QUICK DEVELOPMENT SETUP
echo ========================================

echo.
echo [1/3] Clean install frontend dependencies...
cd frontend
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del package-lock.json
npm install
cd ..

echo.
echo [2/3] Compile backend...
call mvnw clean compile
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Backend compilation failed!
    pause
    exit /b 1
)

echo.
echo [3/3] Setup complete!
echo ✅ Ready to run the application
echo.
echo Next steps:
echo 1. Ensure MySQL is running
echo 2. Run: run-integrated-app.bat
echo.
pause
