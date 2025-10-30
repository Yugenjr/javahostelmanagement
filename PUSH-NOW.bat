@echo off
echo ========================================
echo   PUSHING TO GITHUB
echo ========================================
echo.

cd /d C:\Users\Yugendra\Downloads\Hostelmanagement\Hostelmanagement

echo Setting remote origin...
git remote set-url origin https://github.com/Yugenjr/javahostelmanagement.git

echo.
echo Clearing git cache...
git rm -r --cached .

echo.
echo Adding all files...
git add .
git add -f mvnw
git add -f mvnw.cmd
git add -f .mvn/

echo.
echo Committing...
git commit -m "Complete Hostel Management System - Premium UI and Database Integration"

echo.
echo Pushing to master branch...
git push -u origin master --force

echo.
echo ========================================
echo   DONE! Check: https://github.com/Yugenjr/javahostelmanagement
echo ========================================
pause

