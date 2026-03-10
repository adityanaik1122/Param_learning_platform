@echo off
cd /d "%~dp0backend"
title Param Learning Platform - Django Server
color 0A
echo ========================================
echo Param Learning Platform API Server
echo ========================================
echo.
py manage.py runserver
pause
