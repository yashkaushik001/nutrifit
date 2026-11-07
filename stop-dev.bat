@echo off
title NutriFit - Stop All Services
echo ======================================================
echo           Stopping NutriFit Servers...
echo ======================================================
echo.

echo Terminating running Node.js processes...
taskkill /F /IM node.exe >nul 2>&1

if %errorlevel% equ 0 (
    echo [OK] All Node.js backend and frontend servers stopped successfully.
) else (
    echo [INFO] No running Node.js processes were found.
)

echo.
pause

