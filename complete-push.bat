@echo off
cls
echo ========================================
echo   COMPLETE REPOSITORY PUSH
echo ========================================
echo.

cd /d C:\Users\Yugendra\Downloads\Hostelmanagement\Hostelmanagement

echo [INFO] Current directory: %CD%
echo.

echo [Step 1/7] Removing old cached files from git...
git rm -r --cached .
echo Done!
echo.

echo [Step 2/7] Adding updated .gitignore...
git add .gitignore
echo Done!
echo.

echo [Step 3/7] Adding all source files...
git add src/
git add frontend/src/
git add docs/
echo Done!
echo.

echo [Step 4/7] Adding configuration files...
git add pom.xml
git add frontend/package.json
git add application.properties
git add -f mvnw
git add -f mvnw.cmd
git add -f .mvn/
echo Done!
echo.

echo [Step 5/7] Adding documentation and scripts...
git add *.md
git add *.bat
echo Done!
echo.

echo [Step 6/7] Adding all remaining files...
git add .
echo Done!
echo.

echo [INFO] Files to be committed:
git status --short
echo.

echo [Step 7/7] Committing and pushing...
git commit -m "Complete Hostel Management System

- Premium UI with glow effects on login page
- Role-based access control (Admin, Warden, Student)
- Student pages: My Room, My Fees, My Complaints, Events
- Warden pages: Students, Rooms, Complaints, Fees management
- Database integration with MySQL
- JWT authentication
- RESTful API backend
- React Material-UI frontend
- Complete documentation"

echo.
echo Pushing to remote repository...
git push origin master

echo.
echo ========================================
echo   PUSH COMPLETE!
echo ========================================
echo.
echo All files have been added and pushed to:
echo https://github.com/Yugenjr/javahostelmanagement.git
echo.

pause

