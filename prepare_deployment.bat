@echo off
echo ==========================================
echo    PREPARING AIMYSTARA FOR DEPLOYMENT
echo ==========================================

echo.
echo [1/4] Building Frontend (Vite)...
call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Build failed! Please fix errors and try again.
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo [2/4] Cleaning previous deployment files...
if exist deploy rmdir /s /q deploy
mkdir deploy
mkdir deploy\server
mkdir deploy\dist

echo.
echo [3/4] Copying Backend Files...
xcopy /s /e /y server\* deploy\server\ > nul

echo.
echo [4/4] Copying Frontend Build...
xcopy /s /e /y dist\* deploy\dist\ > nul

echo.
echo Copying Configuration...
copy package.json deploy\ > nul
copy vite.config.ts deploy\ > nul

echo.
echo ==========================================
echo    DEPLOYMENT PACKAGE READY!
echo ==========================================
echo.
echo The 'deploy' folder contains everything you need.
echo.
echo INSTRUCTIONS:
echo 1. Content of 'deploy' folder is your production app.
echo 2. Upload these files to your Hostinger 'public_html'.
echo 3. Configure Node.js App in Hostinger hPanel.
echo 4. Import your database schema.
echo.
pause
