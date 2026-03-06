@echo off
echo ============================================================
echo Setting up LocalDB for NeuralPath
echo ============================================================
echo.

echo Step 1: Starting LocalDB...
sqllocaldb start MSSQLLocalDB
echo.

echo Step 2: Creating database...
sqlcmd -S "(localdb)\MSSQLLocalDB" -Q "CREATE DATABASE ParamLearningHub"
if %ERRORLEVEL% EQU 0 (
    echo Database created successfully!
) else (
    echo Database might already exist or sqlcmd not found.
    echo Trying Python script instead...
    python create_database.py
)
echo.

echo Step 3: Running migrations...
python manage.py makemigrations
python manage.py migrate
echo.

echo ============================================================
echo Setup complete! You can now run:
echo python manage.py runserver
echo ============================================================
pause
