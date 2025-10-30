@echo off
cls
echo ========================================
echo   FRONTEND TROUBLESHOOTING
echo ========================================
echo.

echo [1] Checking if frontend server is running...
netstat -ano | findstr :3000 >nul
if %errorlevel% equ 0 (
    echo [OK] Frontend server is running on port 3000
) else (
    echo [ERROR] Frontend server is NOT running!
    echo Please run: npm start
    pause
    exit /b 1
)
echo.

echo [2] Checking if backend server is running...
netstat -ano | findstr :8081 >nul
if %errorlevel% equ 0 (
    echo [OK] Backend server is running on port 8081
) else (
    echo [WARNING] Backend server is NOT running on port 8081!
    echo Pages might not load properly
)
echo.

echo [3] Checking browser cache...
echo IMPORTANT: Clear your browser cache and cookies!
echo.
echo Press Ctrl+Shift+Delete in your browser to open cache clearing
echo Or use Incognito/Private mode
echo.

echo [4] Opening browser console instructions...
echo.
echo After login, open browser DevTools:
echo - Press F12 or Ctrl+Shift+I
echo - Go to Console tab
echo - Look for any RED errors
echo - Check Network tab for failed requests
echo.

echo [5] Testing localhost access...
curl -s http://localhost:3000 >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] Frontend is accessible
) else (
    echo [ERROR] Cannot access frontend at localhost:3000
)
echo.

curl -s http://localhost:8081 >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] Backend is accessible
) else (
    echo [ERROR] Cannot access backend at localhost:8081
)
echo.

echo ========================================
echo   TROUBLESHOOTING COMPLETE
echo ========================================
echo.
echo If pages still don't open after login:
echo.
echo 1. Clear browser cache completely
echo 2. Try incognito/private mode
echo 3. Check browser console for errors (F12)
echo 4. Restart both frontend and backend
echo 5. Check that token is stored in localStorage
echo.
echo Opening frontend in default browser...
timeout /t 2 /nobreak >nul

start http://localhost:3000

echo.
pause

