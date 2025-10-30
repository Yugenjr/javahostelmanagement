@echo off
cls
echo ========================================
echo   LOADING SAMPLE DATA INTO DATABASE
echo ========================================
echo.

cd /d C:\Users\Yugendra\Downloads\Hostelmanagement\Hostelmanagement

echo [INFO] This will insert sample data into your MySQL database.
echo [INFO] Make sure MySQL is running and you have the correct password.
echo.

set /p MYSQL_PASSWORD="Enter MySQL root password: "

echo.
echo [Step 1/2] Connecting to MySQL...
mysql -u root -p%MYSQL_PASSWORD% -e "USE hostel_db; SELECT 'Database connected successfully!' AS Status;"

if errorlevel 1 (
    echo.
    echo [ERROR] Failed to connect to MySQL. Please check:
    echo   1. MySQL is running
    echo   2. Password is correct
    echo   3. Database 'hostel_db' exists
    echo.
    pause
    exit /b 1
)

echo.
echo [Step 2/2] Inserting sample data...
mysql -u root -p%MYSQL_PASSWORD% hostel_db < sample_data.sql

if errorlevel 1 (
    echo.
    echo [ERROR] Failed to insert data. Check the SQL script for errors.
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================
echo   DATA INSERTED SUCCESSFULLY!
echo ========================================
echo.
echo Sample Data Summary:
echo   - 12 Rooms (Mix of Single, Double, Triple)
echo   - 11 Users (1 Admin, 2 Wardens, 8 Students)
echo   - 10 Complaints (Various types and statuses)
echo   - 21 Fee Records (October + November 2025)
echo.
echo You can now:
echo   1. Login as admin/admin123
echo   2. Login as warden1/warden123
echo   3. Login as student1/student123
echo.
echo All passwords are: password (for demo users)
echo.

pause

