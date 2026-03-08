# Team Setup Guide - Param Learning Platform

## 🚀 Quick Start for Development Team

### Prerequisites
- Git installed
- GitHub account with repository access
- Node.js (v18+) and npm
- Python (v3.10+)
- Docker (optional, for containerized development)

---

## 📥 Initial Setup

### Step 0: Get Repository Access

**Before cloning, team members need access:**

1. **Repository owner** (you) needs to add them as collaborators:
   - Go to: https://github.com/adityanaik1122/Param_learning_platform/settings/access
   - Click "Add people"
   - Enter their GitHub username or email
   - Select role: "Write" (for developers) or "Maintain" (for leads)
   - Click "Add [username] to this repository"

2. **Team member** receives an email invitation:
   - Check email for GitHub invitation
   - Click "Accept invitation"
   - Now they can clone the repository

3. **Verify access**:
   - Team member visits: https://github.com/adityanaik1122/Param_learning_platform
   - Should see the repository (not 404 error)

### 1. Clone Repository

**Option 1: HTTPS (Recommended for most users)**
```bash
git clone https://github.com/adityanaik1122/Param_learning_platform.git
cd Param_learning_platform
```

**Option 2: SSH (If you have SSH keys set up)**
```bash
git clone git@github.com:adityanaik1122/Param_learning_platform.git
cd Param_learning_platform
```

**Option 3: GitHub CLI (If you have `gh` installed)**
```bash
gh repo clone adityanaik1122/Param_learning_platform
cd Param_learning_platform
```

**Note**: If you don't have access, you'll need to:
1. Ask the repository owner to add you as a collaborator
2. Accept the invitation email from GitHub
3. Then clone the repository

### 2. View Available Branches
```bash
git branch -a
```

You should see:
- `main` - Production branch (protected)
- `development` - Main development branch
- `feature/frontend-enhancements` - Frontend work
- `feature/backend-api` - Backend work

### 3. Switch to Development Branch
```bash
git checkout development
git pull origin development
```

---

## 🛠️ Development Environment Setup

### Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start development server
npm run dev
```

Frontend will run on: `http://localhost:5173`

### Backend Setup
```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env

# Run migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Start development server
python manage.py runserver
```

Backend will run on: `http://localhost:8000`

### Compiler Service Setup
```bash
cd compiler

# Create virtual environment
python -m venv venv

# Activate virtual environment
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Linux/Mac

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env

# Start compiler service
python main.py
```

Compiler will run on: `http://localhost:8001`

---

## 🌿 Creating Your Feature Branch

### Step 1: Start from Development
```bash
# Make sure you're on development
git checkout development

# Pull latest changes
git pull origin development
```

### Step 2: Create Your Feature Branch
```bash
# Use naming convention: feature/your-name-feature-description
git checkout -b feature/john-user-profile

# Push to remote
git push -u origin feature/john-user-profile
```

### Step 3: Make Your Changes
```bash
# Edit files
# Test your changes

# Stage changes
git add .

# Commit with descriptive message
git commit -m "feat(profile): add user profile page"

# Push to your branch
git push origin feature/john-user-profile
```

---

## 🔄 Daily Workflow

### Morning Routine
```bash
# Switch to your feature branch
git checkout feature/your-feature

# Pull latest changes from development
git fetch origin
git merge origin/development

# Resolve any conflicts
# Start coding!
```

### Before Lunch/End of Day
```bash
# Save your work
git add .
git commit -m "wip: working on feature X"
git push origin feature/your-feature
```

### When Feature is Complete
```bash
# Make sure everything is committed
git status

# Push final changes
git push origin feature/your-feature

# Go to GitHub and create Pull Request
# Base: development ← Compare: feature/your-feature
```

---

## 📝 Pull Request Process

### 1. Create PR on GitHub
1. Go to repository on GitHub
2. Click "Pull Requests" → "New Pull Request"
3. Select:
   - Base: `development`
   - Compare: `feature/your-feature`
4. Fill in PR template

### 2. PR Template
```markdown
## Description
Brief description of what this PR does

## Changes Made
- Added user profile page
- Implemented profile editing
- Added profile picture upload

## Screenshots
[Add screenshots if UI changes]

## Testing Done
- [ ] Tested on Chrome
- [ ] Tested on Firefox
- [ ] Tested on mobile
- [ ] All unit tests pass
- [ ] Manual testing completed

## Related Issues
Closes #123

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No console errors
```

### 3. Code Review
- Wait for team member to review
- Address feedback
- Make requested changes
- Push updates to same branch

### 4. Merge
- After approval, merge PR
- Delete feature branch
- Pull latest development

---

## 🎯 Working on Specific Areas

### Frontend Development
```bash
# Switch to frontend feature branch
git checkout feature/frontend-enhancements

# Or create your own
git checkout -b feature/your-name-frontend-work

# Work in frontend directory
cd frontend
npm run dev
```

**Common Tasks:**
- UI components: `frontend/src/components/`
- Pages: `frontend/src/pages/`
- Styles: `frontend/src/styles/`
- Learning content: `frontend/src/features/learning-path/`

### Backend Development
```bash
# Switch to backend feature branch
git checkout feature/backend-api

# Or create your own
git checkout -b feature/your-name-backend-work

# Work in backend directory
cd backend
python manage.py runserver
```

**Common Tasks:**
- Models: `backend/[app]/models.py`
- Views: `backend/[app]/views.py`
- URLs: `backend/[app]/urls.py`
- Serializers: `backend/[app]/serializers.py`

### Full Stack Feature
```bash
# Create feature branch
git checkout -b feature/your-name-full-stack-feature

# Work on both frontend and backend
# Commit changes together
git add frontend/ backend/
git commit -m "feat: add new feature with frontend and backend"
```

---

## 🧪 Testing Your Changes

### Frontend Tests
```bash
cd frontend
npm run test
npm run lint
npm run build  # Make sure it builds
```

### Backend Tests
```bash
cd backend
python manage.py test
python manage.py check
```

### Manual Testing
1. Start all services (frontend, backend, compiler)
2. Test your feature thoroughly
3. Check browser console for errors
4. Test on different browsers
5. Test responsive design

---

## 🐛 Debugging Common Issues

### Issue: Merge Conflicts
```bash
# Update your branch
git fetch origin
git merge origin/development

# Conflicts will be marked in files
# Open files and resolve conflicts
# Look for <<<<<<, ======, >>>>>>

# After resolving
git add .
git commit -m "merge: resolve conflicts"
git push origin feature/your-feature
```

### Issue: Need to Undo Last Commit
```bash
# Undo commit but keep changes
git reset HEAD~1

# Undo commit and discard changes
git reset --hard HEAD~1
```

### Issue: Accidentally Committed to Wrong Branch
```bash
# Save your changes
git stash

# Switch to correct branch
git checkout correct-branch

# Apply changes
git stash pop

# Commit
git add .
git commit -m "your message"
```

### Issue: Branch is Behind Development
```bash
git checkout feature/your-feature
git fetch origin
git merge origin/development
# Or use rebase for cleaner history:
git rebase origin/development
```

---

## 📚 Resources

### Documentation
- [BRANCHING_STRATEGY.md](./BRANCHING_STRATEGY.md) - Detailed branching guide
- [README.md](./README.md) - Project overview
- [ARCHITECTURE.md](./docs/ARCHITECTURE.md) - System architecture

### Useful Commands
```bash
# View commit history
git log --oneline --graph --all

# View changes
git diff

# View file status
git status

# Discard changes in file
git checkout -- filename

# Update all branches
git fetch --all

# View remote branches
git branch -r

# Clean up deleted remote branches
git fetch --prune
```

---

## 🤝 Team Communication

### Before Starting Work
1. Check existing branches and PRs
2. Coordinate with team on Slack/Discord
3. Assign yourself to GitHub issues

### During Development
1. Push work-in-progress commits regularly
2. Update team on progress
3. Ask for help when stuck

### Code Review
1. Review others' PRs promptly
2. Be constructive in feedback
3. Test the changes locally

---

## 🎓 Learning Resources

### Git
- [Git Documentation](https://git-scm.com/doc)
- [GitHub Flow](https://guides.github.com/introduction/flow/)
- [Git Branching](https://learngitbranching.js.org/)

### Project Stack
- React + TypeScript
- Django + Python
- FastAPI (Compiler Service)
- PostgreSQL
- Docker

---

## 📞 Getting Help

### Questions?
1. Check documentation first
2. Ask in team chat
3. Create GitHub issue
4. Contact project lead

### Reporting Bugs
1. Create GitHub issue
2. Use bug report template
3. Include steps to reproduce
4. Add screenshots/logs

---

## ✅ Checklist for New Team Members

- [ ] Repository cloned
- [ ] Development branch checked out
- [ ] Frontend setup complete
- [ ] Backend setup complete
- [ ] Compiler service setup complete
- [ ] Created first feature branch
- [ ] Made first commit
- [ ] Created first PR
- [ ] Reviewed branching strategy
- [ ] Added to team communication channels

---

**Welcome to the team! Happy coding! 🚀**

**Last Updated**: March 7, 2026
**Maintained by**: Param Learning Platform Team
