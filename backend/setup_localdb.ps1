# PowerShell script to setup LocalDB
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "Setting up LocalDB for NeuralPath" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Step 1: Starting LocalDB..." -ForegroundColor Yellow
sqllocaldb start MSSQLLocalDB
Write-Host ""

Write-Host "Step 2: Creating database..." -ForegroundColor Yellow
try {
    sqlcmd -S "(localdb)\MSSQLLocalDB" -Q "CREATE DATABASE ParamLearningHub"
    Write-Host "Database created successfully!" -ForegroundColor Green
} catch {
    Write-Host "Database might already exist or sqlcmd not found." -ForegroundColor Yellow
    Write-Host "Trying Python script instead..." -ForegroundColor Yellow
    python create_database.py
}
Write-Host ""

Write-Host "Step 3: Running migrations..." -ForegroundColor Yellow
python manage.py makemigrations
python manage.py migrate
Write-Host ""

Write-Host "============================================================" -ForegroundColor Green
Write-Host "Setup complete! You can now run:" -ForegroundColor Green
Write-Host "python manage.py runserver" -ForegroundColor White
Write-Host "============================================================" -ForegroundColor Green
