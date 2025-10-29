@echo off
title Hostel Management System - Full Setup and Startup

echo ========================================
echo HOSTEL MANAGEMENT SYSTEM - FULL SETUP
echo ========================================

echo.
echo [OPTION 1] Try MySQL Database Connection
echo [OPTION 2] Use H2 In-Memory Database (for quick testing)
echo.

:MENU
set /p choice="Enter your choice (1 for MySQL, 2 for H2): "

if "%choice%"=="1" goto MYSQL_SETUP
if "%choice%"=="2" goto H2_SETUP
echo Invalid choice. Please enter 1 or 2.
goto MENU

:MYSQL_SETUP
echo.
echo ========================================
echo SETTING UP WITH MYSQL DATABASE
echo ========================================

REM Try to find and setup MySQL
call setup-database-advanced.bat

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ❌ MySQL setup failed. Would you like to try H2 instead?
    set /p fallback="Try H2 instead? (y/n): "
    if /i "%fallback%"=="y" goto H2_SETUP
    echo.
    echo Setup cancelled. Please fix MySQL connection and try again.
    pause
    exit /b 1
)

echo ✅ MySQL setup successful! Using MySQL database...
goto START_BACKEND

:H2_SETUP
echo.
echo ========================================
echo SETTING UP WITH H2 IN-MEMORY DATABASE
echo ========================================

REM Switch to H2 configuration
echo Switching to H2 database configuration...

REM Backup current application.properties
copy src\main\resources\application.properties src\main\resources\application-mysql-backup.properties >nul 2>&1

REM Create H2 configuration
echo # H2 Database Configuration (In-Memory - for quick testing) > src\main\resources\application.properties
echo spring.application.name=Hostelmanagement >> src\main\resources\application.properties
echo. >> src\main\resources\application.properties
echo # Server Configuration >> src\main\resources\application.properties
echo server.port=8080 >> src\main\resources\application.properties
echo. >> src\main\resources\application.properties
echo # H2 Database Configuration >> src\main\resources\application.properties
echo spring.datasource.url=jdbc:h2:mem:hostel >> src\main\resources\application.properties
echo spring.datasource.driverClassName=org.h2.Driver >> src\main\resources\application.properties
echo spring.datasource.username=sa >> src\main\resources\application.properties
echo spring.datasource.password= >> src\main\resources\application.properties
echo spring.jpa.database-platform=org.hibernate.dialect.H2Dialect >> src\main\resources\application.properties
echo spring.h2.console.enabled=true >> src\main\resources\application.properties
echo spring.h2.console.path=/h2-console >> src\main\resources\application.properties
echo. >> src\main\resources\application.properties
echo # JPA/Hibernate Configuration >> src\main\resources\application.properties
echo spring.jpa.hibernate.ddl-auto=update >> src\main\resources\application.properties
echo spring.jpa.show-sql=true >> src\main\resources\application.properties
echo spring.jpa.properties.hibernate.format_sql=true >> src\main\resources\application.properties
echo. >> src\main\resources\application.properties
echo # JWT Configuration >> src\main\resources\application.properties
echo jwt.secret=mySecretKey123456789012345678901234567890 >> src\main\resources\application.properties
echo jwt.expiration=86400000 >> src\main\resources\application.properties

echo ✅ H2 database configuration applied!
echo ✅ H2 Console will be available at: http://localhost:8080/h2-console
echo    Username: sa, Password: (empty)
goto START_BACKEND

:START_BACKEND
echo.
echo ========================================
echo STARTING BACKEND SERVER
echo ========================================

echo [1/2] Compiling application...
call mvn clean compile

if %ERRORLEVEL% NEQ 0 (
    echo ❌ Compilation failed! Please check the errors above.
    pause
    exit /b 1
)

echo ✅ Compilation successful!

echo.
echo [2/2] Starting Spring Boot server...
echo ⏳ This may take a few moments...

start "Backend Server" cmd /k "mvn spring-boot:run"

echo ✅ Backend server starting in new window...

timeout /t 3 /nobreak >nul

echo.
echo ========================================
echo STARTING FRONTEND
echo ========================================

echo Starting React frontend...
cd frontend
start "Frontend Server" cmd /k "npm start"

echo ✅ Frontend server starting in new window...

echo.
echo ========================================
echo SYSTEM STARTUP COMPLETE!
echo ========================================

echo 🚀 Services Starting:
echo    Backend:  http://localhost:8080
echo    Frontend: http://localhost:3000

if "%choice%"=="2" (
    echo    H2 Console: http://localhost:8080/h2-console
)

echo.
echo 📋 Demo Credentials:
echo    Admin:    admin / admin123
echo    Warden:   warden1 / warden123
echo    Students: student1, student2, student3 / student123

echo.
echo 📖 API Documentation: See POSTMAN_REQUESTS.md
echo 🔧 Postman Collection: Import and test all endpoints

echo.
echo ✅ Setup complete! Both servers should be starting...
echo    Wait for both servers to fully load, then access http://localhost:3000

pause
