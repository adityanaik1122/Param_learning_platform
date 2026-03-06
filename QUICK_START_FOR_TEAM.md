# 🚀 Quick Start - Param Learning Platform

## For New Team Members

### ✅ Prerequisites
- [ ] GitHub account created
- [ ] Git installed on your computer
- [ ] Repository access granted (check email for invitation)
- [ ] Node.js v18+ installed
- [ ] Python 3.10+ installed

---

## 📥 Step 1: Clone Repository

**Use HTTPS (easiest method):**
```bash
git clone https://github.com/adityanaik1122/Param_learning_platform.git
cd Param_learning_platform
```

**If you get "repository not found" error:**
- You need repository access first
- Ask project owner to add you as collaborator
- Check your email for GitHub invitation
- Accept the invitation, then try cloning again

---

## 🌿 Step 2: Switch to Development Branch

```bash
git checkout development
git pull origin development
```

---

## 🛠️ Step 3: Setup Development Environment

### Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```
✅ Frontend runs on: http://localhost:5173

### Backend Setup
```bash
cd backend

# Windows:
python -m venv venv
venv\Scripts\activate

# Mac/Linux:
python3 -m venv venv
source venv/bin/activate

pip install -r requirements.txt
cp .env.example .env
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```
✅ Backend runs on: http://localhost:8000

### Compiler Service
```bash
cd compiler

# Activate venv (same as backend)
pip install -r requirements.txt
cp .env.example .env
python main.py
```
✅ Compiler runs on: http://localhost:8001

---

## 💻 Step 4: Create Your Feature Branch

```bash
# Make sure you're on development
git checkout development
git pull origin development

# Create your feature branch
git checkout -b feature/your-name-feature-description

# Example:
git checkout -b feature/john-user-profile

# Push to remote
git push -u origin feature/john-user-profile
```

---

## 📝 Step 5: Make Changes & Commit

```bash
# Make your code changes
# Test locally

# Stage changes
git add .

# Commit with descriptive message
git commit -m "feat(profile): add user profile page"

# Push to your branch
git push origin feature/john-user-profile
```

---

## 🔄 Step 6: Create Pull Request

1. Go to: https://github.com/adityanaik1122/Param_learning_platform/pulls
2. Click "New Pull Request"
3. Select:
   - Base: `development`
   - Compare: `feature/your-branch-name`
4. Fill in description
5. Click "Create Pull Request"
6. Request review from team member
7. Wait for approval and merge

---

## 📋 Daily Workflow

### Morning:
```bash
git checkout feature/your-branch
git fetch origin
git merge origin/development  # Get latest changes
```

### During work:
```bash
# Make changes
git add .
git commit -m "your message"
git push origin feature/your-branch
```

### End of day:
```bash
# Make sure everything is pushed
git status
git push origin feature/your-branch
```

---

## 🎯 Branch Naming Convention

### Good Examples:
```
feature/john-user-authentication
feature/sarah-payment-integration
feature/mike-course-progress
bugfix/login-redirect
bugfix/compiler-timeout
```

### Bad Examples:
```
test
my-branch
fix
new-feature
```

---

## 💡 Commit Message Format

```
<type>(<scope>): <description>

Examples:
feat(auth): add JWT authentication
fix(compiler): resolve timeout issue
docs(readme): update setup instructions
style(ui): improve button styling
refactor(api): optimize database queries
test(auth): add login tests
```

---

## 🆘 Common Issues

### Issue: "Repository not found"
**Solution**: You need repository access
1. Ask owner to add you as collaborator
2. Check email for invitation
3. Accept invitation
4. Try cloning again

### Issue: "Permission denied"
**Solution**: Use HTTPS instead of SSH
```bash
git clone https://github.com/adityanaik1122/Param_learning_platform.git
```

### Issue: Merge conflicts
**Solution**:
```bash
git fetch origin
git merge origin/development
# Fix conflicts in your editor
git add .
git commit -m "merge: resolve conflicts"
git push origin feature/your-branch
```

### Issue: Need to undo last commit
**Solution**:
```bash
# Keep changes
git reset HEAD~1

# Discard changes
git reset --hard HEAD~1
```

---

## 📚 Important Files to Read

1. **TEAM_SETUP_GUIDE.md** - Detailed setup instructions
2. **BRANCHING_STRATEGY.md** - Complete branching workflow
3. **README.md** - Project overview
4. **ARCHITECTURE.md** - System architecture (in docs/)

---

## 🔗 Important Links

- **Repository**: https://github.com/adityanaik1122/Param_learning_platform
- **Issues**: https://github.com/adityanaik1122/Param_learning_platform/issues
- **Pull Requests**: https://github.com/adityanaik1122/Param_learning_platform/pulls
- **Branches**: https://github.com/adityanaik1122/Param_learning_platform/branches

---

## 📞 Need Help?

1. Check documentation first
2. Search existing GitHub issues
3. Ask in team chat
4. Create new GitHub issue
5. Contact project lead

---

## ✅ Checklist for First Day

- [ ] Repository cloned
- [ ] Development branch checked out
- [ ] Frontend setup complete and running
- [ ] Backend setup complete and running
- [ ] Compiler service setup complete
- [ ] Created first feature branch
- [ ] Made first commit
- [ ] Pushed to remote
- [ ] Read TEAM_SETUP_GUIDE.md
- [ ] Read BRANCHING_STRATEGY.md

---

## 🎓 Quick Git Commands Reference

```bash
# View all branches
git branch -a

# Switch branch
git checkout branch-name

# Create new branch
git checkout -b feature/new-feature

# Update current branch
git pull origin branch-name

# View status
git status

# View changes
git diff

# Stage all changes
git add .

# Commit
git commit -m "message"

# Push
git push origin branch-name

# View commit history
git log --oneline --graph

# Discard changes in file
git checkout -- filename

# Update from development
git fetch origin
git merge origin/development
```

---

**Welcome to the team! 🎉**

**Questions?** Check TEAM_SETUP_GUIDE.md or ask in team chat.

---

**Last Updated**: March 7, 2026
**Repository**: Param Learning Platform
