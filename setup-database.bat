@echo off
echo =============================================
echo MYSQL DATABASE SETUP FOR HOSTEL MANAGEMENT
echo =============================================

echo.
echo [INFO] Testing MySQL connection...
echo [INFO] Using credentials: root / yugen842007
echo [INFO] Database: hostel

echo.
echo [STEP 1] Creating database if it doesn't exist...
mysql -u root -pyugen842007 -e "CREATE DATABASE IF NOT EXISTS hostel;" 2>nul

if %ERRORLEVEL% EQU 0 (
    echo ✅ Database 'hostel' created/verified successfully
) else (
    echo ❌ Failed to connect to MySQL or create database
    echo.
    echo Possible issues:
    echo 1. MySQL server is not running
    echo 2. Username/password is incorrect
    echo 3. MySQL is not installed or not in PATH
    echo.
    echo Please check:
    echo - MySQL service is running
    echo - Credentials are correct: root / yugen842007
    echo - MySQL is accessible from command line
    echo.
    pause
    exit /b 1
)

echo.
echo [STEP 2] Testing database connection...
mysql -u root -pyugen842007 -D hostel -e "SELECT 'Connection successful!' as status;" 2>nul

if %ERRORLEVEL% EQU 0 (
    echo ✅ Database connection test successful
) else (
    echo ❌ Database connection test failed
    pause
    exit /b 1
)

echo.
echo [STEP 3] Showing database info...
mysql -u root -pyugen842007 -D hostel -e "SELECT DATABASE() as current_database, USER() as current_user, VERSION() as mysql_version;"

echo.
echo ✅ Database setup completed successfully!
echo ✅ Ready to start Spring Boot application
echo.
pause
