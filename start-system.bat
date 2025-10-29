@echo off
cls
echo ================================================================
echo   HOSTEL MANAGEMENT SYSTEM - COMPLETE STARTUP
echo ================================================================
echo.
echo This script will:
echo 1. Check and start MySQL service
echo 2. Start the Spring Boot backend (port 8081)
echo 3. Start the React frontend (port 3000)
echo.
echo Press any key to continue or Ctrl+C to cancel...
pause >nul
cls

echo ================================================================
echo   STEP 1: MySQL Service
echo ================================================================
echo.

sc query mysql80 | find "RUNNING" >nul
if %errorlevel% equ 0 (
    echo [OK] MySQL service is already running
) else (
    echo [ACTION] Starting MySQL service...
    net start mysql80
    if %errorlevel% equ 0 (
        echo [OK] MySQL service started
    ) else (
        echo [ERROR] Failed to start MySQL service
        echo Please run this script as Administrator
        pause
        exit /b 1
    )
)

timeout /t 2 /nobreak >nul
echo.
echo [INFO] Testing MySQL connection...
mysql -h localhost -P 3306 -u root -pyugen842007 -e "CREATE DATABASE IF NOT EXISTS hostel_db;" 2>nul
if %errorlevel% equ 0 (
    echo [OK] MySQL connection successful! Database ready.
) else (
    echo [WARNING] MySQL connection test failed
    echo Backend will attempt to connect anyway...
)

echo.
echo ================================================================
echo   STEP 2: Starting Backend (Spring Boot on port 8081)
echo ================================================================
echo.
echo Please wait 15-20 seconds for backend to start...
echo.

start "Hostel Backend" cmd /k "cd /d %~dp0 && echo Starting backend... && mvnw.cmd spring-boot:run"

echo [INFO] Backend is starting in a new window...
echo [INFO] Waiting 20 seconds for backend to initialize...
timeout /t 20 /nobreak

echo.
echo ================================================================
echo   STEP 3: Starting Frontend (React on port 3000)
echo ================================================================
echo.

cd frontend

if not exist node_modules (
    echo [WARNING] node_modules not found!
    echo [ACTION] Installing dependencies...
    call npm install
    if %errorlevel% neq 0 (
        echo [ERROR] Failed to install npm packages
        pause
        exit /b 1
    )
)

echo [INFO] Starting React development server...
echo.

start "Hostel Frontend" cmd /k "cd /d %~dp0frontend && echo Starting frontend... && npm start"

timeout /t 5 /nobreak

cls
echo ================================================================
echo   SYSTEM STARTED SUCCESSFULLY!
echo ================================================================
echo.
echo Backend:  http://localhost:8081
echo Frontend: http://localhost:3000
echo.
echo The frontend will open automatically in your browser...
echo.
echo To stop the application:
echo 1. Close the backend window (Spring Boot)
echo 2. Close the frontend window (React)
echo.
echo ================================================================
echo.
echo READY TO USE!
echo.
echo Default Accounts:
echo   Admin:   admin / admin123
echo   Warden:  warden / warden123
echo   Student: student1 / student123
echo.
echo Create new accounts via Postman (see POSTMAN_API_GUIDE.md)
echo.
echo ================================================================
echo.

start http://localhost:3000

echo Press any key to exit this window...
pause >nul

