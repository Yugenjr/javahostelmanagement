@echo off
echo ============================================
echo   HOSTEL MANAGEMENT SYSTEM - FULL STARTUP
echo ============================================
echo.
echo Starting both Backend and Frontend...
echo.

REM Start Backend in a new window
start "Backend Server" cmd /k "cd /d %~dp0 && echo Starting Backend... && mvnw.cmd spring-boot:run"

REM Wait for backend to start
echo Waiting for backend to initialize (10 seconds)...
timeout /t 10 /nobreak > nul

REM Start Frontend in a new window
start "Frontend Server" cmd /k "cd /d %~dp0frontend && echo Installing dependencies if needed... && npm install && echo Starting Frontend... && npm start"

echo.
echo ============================================
echo Both servers are starting...
echo.
echo Backend:  http://localhost:8081
echo Frontend: http://localhost:3000
echo.
echo The frontend will open automatically in your browser.
echo.
echo DEMO CREDENTIALS:
echo   Admin:   username: admin    password: admin123
echo   Warden:  username: warden   password: warden123
echo   Student: username: student1 password: student123
echo.
echo Press any key to close this window (servers will keep running)...
pause > nul

