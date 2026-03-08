@echo off
REM Git Push Commands for Param Learning Hub (Windows)
REM Run this script to push your code to GitHub

echo ========================================
echo 🚀 Param Learning Hub - Git Push Script
echo ========================================
echo.

REM Check if git is initialized
if not exist .git (
    echo 📝 Initializing Git repository...
    git init
    echo ✅ Git initialized
) else (
    echo ✅ Git already initialized
)

echo.
echo 📋 Current Git Status:
git status

echo.
echo 📦 Adding all files to staging...
git add .

echo.
echo 💬 Creating commit...
git commit -m "Initial commit: Complete ML Learning Platform with optimizations" -m "Features:" -m "- Comprehensive documentation (README, guides, optimization docs)" -m "- Optimized dependencies (85%% reduction in backend packages)" -m "- Premium SaaS design system (WCAG 2.1 AA compliant)" -m "- Fixed UI issues and implemented proper dark theme" -m "- Created LearningPathUpdated component with modern UI" -m "- Enhanced security with comprehensive .gitignore" -m "- Docker configuration for easy deployment" -m "- Complete development and deployment guides" -m "" -m "Tech Stack:" -m "- Backend: Django 5.0 + DRF + SQL Server" -m "- Frontend: React 18 + TypeScript + TailwindCSS" -m "- Compiler: FastAPI + Docker sandboxing" -m "- Infrastructure: Docker Compose + Redis"

echo.
echo ========================================
echo 🔗 Next Steps:
echo ========================================
echo.
echo 1. Go to: https://github.com/new
echo 2. Create a new repository
echo 3. Copy the repository URL
echo 4. Run these commands:
echo.
echo    git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
echo    git branch -M main
echo    git push -u origin main
echo.
echo 5. Create development branch:
echo    git checkout -b development
echo    git push -u origin development
echo.
echo 6. Create feature branches for team:
echo    git checkout -b feature/frontend-ui
echo    git push -u origin feature/frontend-ui
echo.
echo    git checkout -b feature/backend-api
echo    git push -u origin feature/backend-api
echo.
echo    git checkout -b feature/compiler-service
echo    git push -u origin feature/compiler-service
echo.
echo ✅ Script completed! Follow the instructions above.
echo.
pause
