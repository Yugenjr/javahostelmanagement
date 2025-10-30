@echo off
cls
echo ========================================
echo   PUSH ALL FILES TO REPOSITORY
echo ========================================
echo.

cd /d C:\Users\Yugendra\Downloads\Hostelmanagement\Hostelmanagement

echo [Step 1/5] Checking git status...
git status

echo.
echo [Step 2/5] Adding all files (including ignored ones if needed)...
git add .
git add -f mvnw
git add -f mvnw.cmd
git add -f frontend/package-lock.json
git add -f pom.xml
git add docs/*
git add frontend/src/*
git add src/main/java/*
git add src/main/resources/*

echo.
echo [Step 3/5] Showing what will be committed...
git status

echo.
echo [Step 4/5] Committing changes...
git commit -m "Complete Hostel Management System - All files with premium UI and database integration"

echo.
echo [Step 5/5] Pushing to repository...
git push origin master

echo.
echo ========================================
echo   PUSH COMPLETE!
echo ========================================
echo.

pause

