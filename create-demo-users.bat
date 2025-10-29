@echo off
echo =============================================
echo MANUAL USER CREATION FOR HOSTEL MANAGEMENT
echo =============================================

echo.
echo Creating admin user manually in database...

REM Create admin user with encoded password
"C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -pyugen842007 -D hostel -e "INSERT IGNORE INTO users (username, password, first_name, last_name, email, phone_number, role, address, emergency_contact, active, created_at, updated_at) VALUES ('admin', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'System', 'Administrator', 'admin@hostel.com', '9876543210', 'ADMIN', 'Admin Office', '9876543211', true, NOW(), NOW());"

if %ERRORLEVEL % EQU 0 (
    echo ✅ Admin user created successfully!
    echo    Username: admin
    echo    Password: admin123
) else (
    echo ❌ Failed to create admin user
)

echo.
echo Creating student user...
"C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -pyugen842007 -D hostel -e "INSERT IGNORE INTO users (username, password, first_name, last_name, email, phone_number, role, address, emergency_contact, active, created_at, updated_at) VALUES ('student1', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'John', 'Doe', 'john.doe@student.com', '9876543212', 'STUDENT', '123 Student St', '9876543213', true, NOW(), NOW());"

if %ERRORLEVEL% EQU 0 (
    echo ✅ Student user created successfully!
    echo    Username: student1
    echo    Password: admin123
) else (
    echo ❌ Failed to create student user
)

echo.
echo Verifying users in database...
"C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -pyugen842007 -D hostel -e "SELECT id, username, first_name, last_name, role, active FROM users;"

echo.
echo =============================================
echo USER CREATION COMPLETE
echo =============================================
echo Demo Credentials:
echo - Admin: admin / admin123
echo - Student: student1 / admin123
echo =============================================

pause
