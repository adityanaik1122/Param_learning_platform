@echo off
cd /d "%~dp0backend"
py manage.py runserver
pause
