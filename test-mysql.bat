@echo off
echo Testing MySQL Connection...
echo.

mysql -h localhost -P 3306 -u root -pyugen842007 -e "SELECT 'MySQL Connection Successful!' as Status;"

if %errorlevel% equ 0 (
    echo.
    echo SUCCESS: MySQL credentials are correct!
    echo.
    echo Creating database if not exists...
    mysql -h localhost -P 3306 -u root -pyugen842007 -e "CREATE DATABASE IF NOT EXISTS hostel_db;"
    echo.
    echo Database setup complete!
) else (
    echo.
    echo ERROR: Cannot connect to MySQL
    echo Please check:
    echo 1. MySQL service is running: net start mysql80
    echo 2. Username and password are correct
    echo 3. MySQL is listening on port 3306
)

pause

