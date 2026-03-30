@echo off
color 0A
echo ========================================
echo  HOSTEL MANAGEMENT SYSTEM
echo  Admin CRUD Operations - FULLY CONFIGURED
echo ========================================
echo.

echo [1/4] Checking MySQL Connection...
mysql -u root -pyugen842007 -e "SELECT 'MySQL is running!' as status;" 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] MySQL is not running or credentials are incorrect!
    echo Please start MySQL server and try again.
    pause
    exit /b 1
)
echo [SUCCESS] MySQL is connected!
echo.

echo [2/4] Checking Database...
mysql -u root -pyugen842007 -e "CREATE DATABASE IF NOT EXISTS hostel_db; USE hostel_db; SELECT 'Database ready!' as status;"
echo [SUCCESS] Database hostel_db is ready!
echo.

echo [3/4] Starting Backend Server (Port 8081)...
echo Backend will start in a new window...
start "Backend Server - Port 8081" cmd /k "cd /d %~dp0 && mvn spring-boot:run"
echo Waiting for backend to initialize...
timeout /t 10 /nobreak >nul
echo [SUCCESS] Backend starting...
echo.

echo [4/4] Starting Frontend (Port 3000)...
echo Frontend will start in a new window...
start "Frontend - Port 3000" cmd /k "cd /d %~dp0frontend && npm start"
echo.

echo ========================================
echo  SYSTEM STARTING...
echo ========================================
echo.
echo Backend:  http://localhost:8081
echo Frontend: http://localhost:3000
echo.
echo [ADMIN LOGIN CREDENTIALS]
echo Username: admin
echo Password: admin123
echo.
echo ========================================
echo  ADMIN CRUD FEATURES
echo ========================================
echo.
echo Students Management:
echo   - Add, Edit, Delete students
echo   - All changes saved to database
echo.
echo Rooms Management:
echo   - Add, Edit, Delete rooms
echo   - Allocate/Deallocate rooms
echo.
echo Fee Management (NEW!):
echo   - Add, Edit, Delete fee records
echo   - Record payments
echo   - View statistics and charts
echo.
echo Complaints Management:
echo   - Add, Edit, Delete complaints
echo   - Update status and remarks
echo.
echo Dashboard:
echo   - Real-time statistics
echo   - Auto-refresh data
echo.
echo ========================================
echo.
echo Waiting 15 seconds for services to start...
timeout /t 15 /nobreak >nul
echo.
echo Opening browser...
start http://localhost:3000
echo.
echo ========================================
echo  SYSTEM READY!
echo ========================================
echo.
echo Check the other windows for backend/frontend logs.
echo Press any key to keep this window open...
pause >nul

