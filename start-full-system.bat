@echo off
echo ========================================
echo HOSTEL MANAGEMENT SYSTEM - FULL STARTUP
echo ========================================

echo.
echo [1/3] Starting MySQL (make sure MySQL is running)
echo   - Ensure MySQL service is running on localhost:3306
echo   - Default user: root, password: root
echo.

echo [2/3] Starting Backend (Spring Boot)...
echo   Starting on http://localhost:8080
start cmd /k "cd /d %~dp0 && mvn spring-boot:run"

echo.
echo [3/3] Starting Frontend (React)...
echo   Starting on http://localhost:3000
timeout /t 5 /nobreak >nul
start cmd /k "cd /d %~dp0frontend && npm start"

echo.
echo ========================================
echo SERVICES STARTING...
echo ========================================
echo Backend: http://localhost:8080
echo Frontend: http://localhost:3000
echo.
echo Demo Credentials:
echo - Admin: admin / admin123
echo - Student: student1 / student123
echo ========================================

pause
