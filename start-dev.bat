@echo off
title NutriFit - Full Stack Dev Server
cd /d "%~dp0"

echo ======================================================
echo           Starting NutriFit Services...
echo ======================================================
echo.

:: 1. Database (MySQL Windows Service or XAMPP)
echo [1/3] Checking MySQL Database...
net start MySQL80 >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] MySQL80 service started!
) else (
    net start MySQL >nul 2>&1
    if %errorlevel% equ 0 (
        echo [OK] MySQL service started!
    ) else (
        if exist "C:\xampp\mysql\bin\mysqld.exe" (
            tasklist /FI "IMAGENAME eq mysqld.exe" 2>NUL | find /I /N "mysqld.exe">NUL
            if errorlevel 1 (
                start "" /B "C:\xampp\mysql\bin\mysqld.exe"
                echo [OK] Started MySQL via XAMPP!
            ) else (
                echo [OK] MySQL (XAMPP) is already running!
            )
        ) else (
            echo [INFO] MySQL is either already running or managed externally.
        )
    )
)

echo.
:: 2. Auto-open browser after 3 seconds in background
echo [2/3] Scheduling Browser to open http://localhost:5173...
start "" /B cmd /c "timeout /t 3 /nobreak >nul && start http://localhost:5173"

echo.
:: 3. Start Backend & Frontend together
echo [3/3] Starting Backend & Frontend via Concurrently...
echo ------------------------------------------------------
echo Tip: Press Ctrl + C in this window to stop both servers.
echo ------------------------------------------------------
echo.

npm run dev

pause
