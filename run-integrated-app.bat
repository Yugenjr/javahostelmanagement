@echo off
echo ========================================
echo HOSTEL MANAGEMENT - INTEGRATED STARTUP
echo ========================================

echo.
echo [1/4] Setting up database...
call setup-database.bat
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Database setup failed!
    pause
    exit /b 1
)

echo.
echo [2/4] Installing frontend dependencies...
cd frontend
echo Installing React dependencies...
npm install --no-optional --no-audit --no-fund
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Frontend dependency installation failed!
    pause
    exit /b 1
)
cd ..

echo.
echo [3/4] Starting Backend (Spring Boot)...
echo Starting on http://localhost:8080
start "Backend Server" cmd /k "mvn spring-boot:run"

echo.
echo [4/4] Starting Frontend (React)...
echo Starting on http://localhost:3000
timeout /t 10 /nobreak >nul
start "Frontend Server" cmd /k "cd frontend ; npm start"

echo.
echo ========================================
echo SERVICES STARTING...
echo ========================================
echo Backend:  http://localhost:8080
echo Frontend: http://localhost:3000
echo API Docs: http://localhost:8080/swagger-ui.html
echo.
echo Demo Credentials:
echo - Admin:   admin / admin123
echo - Warden:  warden1 / warden123
echo - Student: student1 / student123
echo ========================================

echo.
echo Both services are starting...
echo Frontend will open automatically in your browser
echo Close this window to stop monitoring
echo.

pause
