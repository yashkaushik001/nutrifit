@echo off
title NutriFit - Multi Window Launcher
cd /d "%~dp0"

echo ======================================================
echo           Starting NutriFit (Separate Windows)
echo ======================================================
echo.

:: 1. Database check (Windows Service or XAMPP)
echo [1/4] Checking MySQL Database...
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
            echo [INFO] MySQL is already running or managed externally.
        )
    )
)

echo.
:: 2. Launch Backend in new window
echo [2/4] Launching Backend (Node.js/Nodemon on port 5000)...
start "NutriFit Backend" cmd /k "cd /d %~dp0backend && npm run dev"

echo.
:: 3. Launch Frontend in new window
echo [3/4] Launching Frontend (Vite React)...
start "NutriFit Frontend" cmd /k "cd /d %~dp0frontend && npm run dev"

echo.
:: 4. Auto-open browser
echo [4/4] Opening http://localhost:5173 in your default browser...
start "" /B cmd /c "timeout /t 3 /nobreak >nul && start http://localhost:5173"

echo.
echo ======================================================
echo All services launched! You can close this window now.
echo ======================================================
timeout /t 4
