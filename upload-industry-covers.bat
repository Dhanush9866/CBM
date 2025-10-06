@echo off
echo ========================================
echo Industry Cover Images Upload Script
echo ========================================
echo.
echo This script will upload cover images for:
echo - Mining & Metals Plants & Refineries
echo - Petrochemical Plants & Refineries
echo.
echo Make sure you have added your images to:
echo - frontend\uploads\Mining & Metals Plants & Refineries cover-pic\
echo - frontend\uploads\Petrochemical Plants & Refineries cover-pic\
echo.
pause
echo.
echo Starting upload process...
cd backend
node src/scripts/upload-industry-covers-simple.js
echo.
echo Upload process completed!
pause
