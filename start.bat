echo ========================================
echo   STARTUP COMPLETE!
echo ========================================
echo.
echo Backend: http://localhost:8080
echo Frontend: http://localhost:3000
echo.
echo Use these credentials to login:
echo Username: admin
echo Password: admin123
echo.
echo Press any key to exit...
pause > nul
@echo off
echo ========================================
echo   HOSTEL MANAGEMENT SYSTEM STARTUP
echo ========================================

echo.
echo [1/4] Starting MySQL Database...
echo Please ensure MySQL is running on localhost:3306
echo Database: hostel_management
echo Username: root
echo Password: root
echo.
pause

echo [2/4] Building Backend...
call mvn clean compile
if %ERRORLEVEL% neq 0 (
    echo Backend build failed!
    pause
    exit /b 1
)

echo.
echo [3/4] Starting Backend Server...
start "Backend Server" cmd /k "mvn spring-boot:run"

echo.
echo [4/4] Starting Frontend...
cd frontend
if not exist node_modules (
    echo Installing frontend dependencies...
    call npm install
)

start "Frontend Server" cmd /k "npm start"

echo.
