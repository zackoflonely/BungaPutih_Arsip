@echo off
setlocal enabledelayedexpansion

echo Starting backup process...

for /f "tokens=1-4 delims=:.," %%a in ("%TIME%") do (
    set /a HOUR=100%%a%%100
    set /a MINUTE=100%%b%%100
    set /a SECOND=100%%c%%100
)

set TIMESTAMP=%DATE:~10,4%%DATE:~4,2%%DATE:~7,2%_!HOUR!!MINUTE!!SECOND!
echo TIMESTAMP set to %TIMESTAMP%

set BACKUP_DIR=E:\KKN\BungaPutih_Arsip\backend
echo BACKUP_DIR set to %BACKUP_DIR%

set MYSQL_DIR=D:\laragon\bin\mysql\mysql-8.0.30-winx64\bin
echo MYSQL_DIR set to %MYSQL_DIR%

:: Create backup directory
mkdir "%TIMESTAMP%"
echo Created backup directory %TIMESTAMP%

:: Perform the database dump
"%MYSQL_DIR%\mysqldump" -u root bungaputih_arsip > "%TIMESTAMP%\bungaputih_arsip.sql"
echo Backup completed successfully.

endlocal
pause
