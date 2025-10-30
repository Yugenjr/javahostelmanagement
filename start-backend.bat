@echo off
cls
echo ============================================
echo   HOSTEL MANAGEMENT SYSTEM - STARTUP
echo ============================================
echo.

echo [Step 1/4] Checking MySQL Service Status...
sc query mysql80 | find "RUNNING" >nul
if %errorlevel% equ 0 (
    echo [OK] MySQL service is running
) else (
    echo [WARNING] MySQL service is not running
    echo [ACTION] Attempting to start MySQL service...
    net start mysql80
    if %errorlevel% equ 0 (
        echo [OK] MySQL service started successfully
    ) else (
        echo [ERROR] Failed to start MySQL service
        echo Please run this script as Administrator
        pause
        exit /b 1
    )
)
echo.

echo [Step 2/4] Testing MySQL Connection...
echo Testing connection to MySQL with username: root
mysql -h localhost -P 3306 -u root -pyugen842007 -e "SELECT VERSION();" >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] MySQL connection successful!
) else (
    echo [ERROR] Cannot connect to MySQL
    echo.
    echo Possible issues:
    echo - Password might be incorrect
    echo - MySQL not installed properly
    echo - Port 3306 blocked
    echo.
    echo Please verify your MySQL installation and credentials
    pause
    exit /b 1
)
echo.

echo [Step 3/4] Creating Database...
mysql -h localhost -P 3306 -u root -pyugen842007 -e "CREATE DATABASE IF NOT EXISTS hostel_db;" 2>nul
if %errorlevel% equ 0 (
    echo [OK] Database 'hostel_db' is ready
) else (
    echo [WARNING] Database creation failed, but backend will try to create it
)
echo.

echo [Step 4/4] Starting Spring Boot Backend...
echo This will take 15-30 seconds...
echo.
echo Backend will start on: http://localhost:8081
echo Press Ctrl+C to stop the backend server
echo.
echo ============================================
echo.

call mvnw.cmd spring-boot:run

pause

