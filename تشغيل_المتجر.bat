@echo off
chcp 65001 >nul
title SK BOUTIQUE - Next.js Server Launcher

echo.
echo  ============================================
echo    SK BOUTIQUE - متجر سارة كريشان (Next.js)
echo  ============================================
echo.
echo  جاري تشغيل خادم المطورين لـ Next.js وإنشاء رابط إنترنت عام...
echo  يرجى الانتظار لبضع ثوان...
echo.

:: Launch PowerShell script
powershell -ExecutionPolicy Bypass -File "%~dp0start-server.ps1"

exit
