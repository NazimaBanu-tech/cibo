@echo off
title Cibo Server Starter
color 0B

echo ===================================================
echo   Cibo - Online Food Ordering System Server
echo ===================================================
echo.

:: Step 1: Change directory to project location
cd /d "c:\Users\nazim\OneDrive\Attachments\Desktop\cibo2"

:: Step 2: Check if node_modules folder exists, if not run install
if not exist node_modules (
    echo [INFO] node_modules not found. Installing dependencies...
    call npm install
) else (
    echo [INFO] Dependencies already installed. Skipping npm install.
)

echo.
echo [INFO] Starting Vite development server...
echo [INFO] Launching default browser at http://localhost:5173...
echo.

:: Step 3: Open browser in a separate thread
start http://localhost:5173

:: Step 4: Run Vite development server
call npm run dev

pause
