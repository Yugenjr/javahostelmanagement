@echo off
echo =============================================
echo MYSQL DATABASE SETUP FOR HOSTEL MANAGEMENT
echo =============================================

echo.
echo [INFO] Testing MySQL connection...
echo [INFO] Using credentials: root / yugen842007
echo [INFO] Database: hostel

echo.
echo [STEP 1] Attempting to find MySQL installation...

REM Try common MySQL installation paths
set "MYSQL_PATH="
if exist "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" (
    set "MYSQL_PATH=C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe"
    echo ✅ Found MySQL at: C:\Program Files\MySQL\MySQL Server 8.0\bin\
)
if exist "C:\Program Files\MySQL\MySQL Server 8.4\bin\mysql.exe" (
    set "MYSQL_PATH=C:\Program Files\MySQL\MySQL Server 8.4\bin\mysql.exe"
    echo ✅ Found MySQL at: C:\Program Files\MySQL\MySQL Server 8.4\bin\
)
if exist "C:\Program Files\MySQL\MySQL Server 9.0\bin\mysql.exe" (
    set "MYSQL_PATH=C:\Program Files\MySQL\MySQL Server 9.0\bin\mysql.exe"
    echo ✅ Found MySQL at: C:\Program Files\MySQL\MySQL Server 9.0\bin\
)
if exist "C:\Program Files (x86)\MySQL\MySQL Server 8.0\bin\mysql.exe" (
    set "MYSQL_PATH=C:\Program Files (x86)\MySQL\MySQL Server 8.0\bin\mysql.exe"
    echo ✅ Found MySQL at: C:\Program Files (x86)\MySQL\MySQL Server 8.0\bin\
)
if exist "C:\xampp\mysql\bin\mysql.exe" (
    set "MYSQL_PATH=C:\xampp\mysql\bin\mysql.exe"
    echo ✅ Found MySQL at: C:\xampp\mysql\bin\
)
if exist "C:\wamp64\bin\mysql\mysql8.0.31\bin\mysql.exe" (
    set "MYSQL_PATH=C:\wamp64\bin\mysql\mysql8.0.31\bin\mysql.exe"
    echo ✅ Found MySQL at: C:\wamp64\bin\mysql\mysql8.0.31\bin\
)

if not defined MYSQL_PATH (
    echo ❌ MySQL not found in common installation paths
    echo.
    echo Please install MySQL or ensure it's running. Common options:
    echo 1. Download MySQL from: https://dev.mysql.com/downloads/mysql/
    echo 2. Install XAMPP: https://www.apachefriends.org/
    echo 3. Install WAMP: https://www.wampserver.com/
    echo.
    echo Or manually set the MySQL path by editing this script.
    pause
    exit /b 1
)

echo.
echo [STEP 2] Creating database if it doesn't exist...
"%MYSQL_PATH%" -u root -pyugen842007 -e "CREATE DATABASE IF NOT EXISTS hostel;" 2>nul

if %ERRORLEVEL% EQU 0 (
    echo ✅ Database 'hostel' created/verified successfully
) else (
    echo ❌ Failed to connect to MySQL or create database
    echo.
    echo Troubleshooting steps:
    echo 1. Check if MySQL service is running:
    echo    - Press Win+R, type 'services.msc', find MySQL service
    echo    - Or run: net start mysql80 (adjust version number)
    echo.
    echo 2. Verify credentials in MySQL Workbench or command line
    echo.
    echo 3. If password is different, update application.properties
    echo.
    echo 4. Try connecting manually:
    echo    "%MYSQL_PATH%" -u root -p
    echo.
    pause
    exit /b 1
)

echo.
echo [STEP 3] Testing database connection...
"%MYSQL_PATH%" -u root -pyugen842007 -D hostel -e "SELECT 'Connection successful!' as status;" 2>nul

if %ERRORLEVEL% EQU 0 (
    echo ✅ Database connection test successful
) else (
    echo ❌ Database connection test failed
    pause
    exit /b 1
)

echo.
echo [STEP 4] Showing database info...
"%MYSQL_PATH%" -u root -pyugen842007 -D hostel -e "SELECT DATABASE() as current_database, USER() as current_user, VERSION() as mysql_version;"

echo.
echo ✅ Database setup completed successfully!
echo ✅ Ready to start Spring Boot application
echo.
echo Next steps:
echo 1. Run: mvn spring-boot:run
echo 2. Backend will be available at: http://localhost:8080
echo 3. Use Postman with the API endpoints from POSTMAN_REQUESTS.md
echo.
pause
