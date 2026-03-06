# Git Setup & Team Collaboration Guide

## 🚀 Step 1: Initialize Git Repository

### Check if Git is already initialized
```bash
git status
```

If you see "not a git repository", initialize it:
```bash
git init
```

## 📝 Step 2: Create .gitignore (Already Done!)

Your `.gitignore` file is already optimized and ready to use.

## 🔗 Step 3: Connect to GitHub

### Option A: Create New Repository on GitHub

1. **Go to GitHub**: https://github.com/new
2. **Repository Name**: `param-learning-hub` (or your preferred name)
3. **Description**: "AI & ML Learning Platform with Interactive Code Execution"
4. **Visibility**: Choose Private or Public
5. **DO NOT** initialize with README, .gitignore, or license (we already have these)
6. **Click**: "Create repository"

### Option B: Use Existing Repository

If you already have a repository, get the URL from GitHub.

## 📤 Step 4: Push Code to GitHub

### First Time Setup

```bash
# Add all files to staging
git add .

# Create initial commit
git commit -m "Initial commit: Complete ML Learning Platform with optimizations"

# Add remote repository (replace with your GitHub URL)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Verify remote was added
git remote -v

# Push to GitHub (main branch)
git push -u origin main
```

If you get an error about "master" vs "main":
```bash
# Rename branch to main
git branch -M main

# Then push
git push -u origin main
```

### If You Need to Authenticate

**Using Personal Access Token (Recommended):**
1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token with `repo` scope
3. Copy the token
4. When prompted for password, paste the token

**Or use SSH:**
```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "your_email@example.com"

# Add to SSH agent
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

# Copy public key
cat ~/.ssh/id_ed25519.pub

# Add to GitHub: Settings → SSH and GPG keys → New SSH key

# Change remote to SSH
git remote set-url origin git@github.com:YOUR_USERNAME/YOUR_REPO_NAME.git
```

## 🌿 Step 5: Create Branches for Team

### Create Development Branch
```bash
# Create and switch to development branch
git checkout -b development

# Push development branch to GitHub
git push -u origin development
```

### Create Feature Branches for Team Members

```bash
# Create branches for different team members/features
git checkout -b feature/frontend-ui
git push -u origin feature/frontend-ui

git checkout -b feature/backend-api
git push -u origin feature/backend-api

git checkout -b feature/compiler-service
git push -u origin feature/compiler-service

git checkout -b feature/testing
git push -u origin feature/testing

# Go back to main branch
git checkout main
```

## 👥 Step 6: Set Up Branch Protection (Recommended)

On GitHub:
1. Go to **Settings** → **Branches**
2. Click **Add rule**
3. Branch name pattern: `main`
4. Enable:
   - ✅ Require pull request reviews before merging
   - ✅ Require status checks to pass before merging
   - ✅ Require branches to be up to date before merging
5. Save changes

## 📋 Step 7: Team Collaboration Workflow

### For Team Members to Clone

```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME

# See all branches
git branch -a

# Switch to development branch
git checkout development
```

### Standard Workflow for Team

```bash
# 1. Always start from development branch
git checkout development
git pull origin development

# 2. Create feature branch
git checkout -b feature/my-feature

# 3. Make changes and commit
git add .
git commit -m "feat: add my feature"

# 4. Push feature branch
git push -u origin feature/my-feature

# 5. Create Pull Request on GitHub
# Go to GitHub → Pull Requests → New Pull Request
# Base: development ← Compare: feature/my-feature

# 6. After PR is approved and merged, delete feature branch
git checkout development
git pull origin development
git branch -d feature/my-feature
git push origin --delete feature/my-feature
```

## 🏗️ Recommended Branch Structure

```
main (production-ready code)
  ↓
development (integration branch)
  ↓
feature/frontend-ui
feature/backend-api
feature/compiler-service
feature/testing
feature/documentation
```

## 📝 Commit Message Convention

Use conventional commits:

```bash
# Features
git commit -m "feat: add user authentication"
git commit -m "feat(frontend): implement learning path UI"

# Bug fixes
git commit -m "fix: resolve white screen issue"
git commit -m "fix(backend): correct database connection"

# Documentation
git commit -m "docs: update README with setup instructions"

# Refactoring
git commit -m "refactor: optimize dependencies"

# Tests
git commit -m "test: add unit tests for user service"

# Chores
git commit -m "chore: update dependencies"
```

## 🔄 Keeping Branches Updated

### Update Development Branch
```bash
git checkout development
git pull origin development
```

### Update Feature Branch with Latest Development
```bash
git checkout feature/my-feature
git merge development
# Or use rebase for cleaner history
git rebase development
```

## 🚨 Common Issues & Solutions

### Issue: "fatal: remote origin already exists"
```bash
# Remove existing remote
git remote remove origin

# Add new remote
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
```

### Issue: "Updates were rejected"
```bash
# Pull latest changes first
git pull origin main --rebase

# Then push
git push origin main
```

### Issue: Merge Conflicts
```bash
# See conflicted files
git status

# Edit files to resolve conflicts
# Look for <<<<<<< HEAD markers

# After resolving
git add .
git commit -m "fix: resolve merge conflicts"
git push
```

### Issue: Need to Undo Last Commit
```bash
# Undo commit but keep changes
git reset --soft HEAD~1

# Undo commit and discard changes
git reset --hard HEAD~1
```

## 📊 Useful Git Commands

```bash
# Check status
git status

# View commit history
git log --oneline --graph --all

# See all branches
git branch -a

# Delete local branch
git branch -d branch-name

# Delete remote branch
git push origin --delete branch-name

# Stash changes temporarily
git stash
git stash pop

# View differences
git diff

# Discard local changes
git checkout -- filename
```

## 👥 Team Member Setup Checklist

Share this with your team:

- [ ] Install Git
- [ ] Configure Git username and email
  ```bash
  git config --global user.name "Your Name"
  git config --global user.email "your.email@example.com"
  ```
- [ ] Get GitHub account access
- [ ] Clone repository
- [ ] Checkout development branch
- [ ] Install dependencies (see README.md)
- [ ] Set up environment variables
- [ ] Run project locally
- [ ] Create feature branch for assigned task

## 📚 Additional Resources

- [Git Documentation](https://git-scm.com/doc)
- [GitHub Guides](https://guides.github.com/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Git Branching Strategy](https://nvie.com/posts/a-successful-git-branching-model/)

## 🎯 Quick Reference

### Daily Workflow
```bash
# Morning: Update your branch
git checkout development
git pull origin development
git checkout feature/my-feature
git merge development

# Work on features
# ... make changes ...
git add .
git commit -m "feat: description"

# Evening: Push your work
git push origin feature/my-feature
```

### Creating Pull Request
1. Push your feature branch
2. Go to GitHub repository
3. Click "Pull requests" → "New pull request"
4. Select: base: `development` ← compare: `feature/your-feature`
5. Add title and description
6. Request reviewers
7. Click "Create pull request"

## ✅ Final Checklist Before Pushing

- [ ] All sensitive data removed (.env files not committed)
- [ ] .gitignore is properly configured
- [ ] Code is tested locally
- [ ] Documentation is updated
- [ ] Commit messages are clear
- [ ] No large files (>100MB)
- [ ] Dependencies are documented

---

## 🚀 Ready to Push!

Run these commands now:

```bash
# 1. Check status
git status

# 2. Add all files
git add .

# 3. Commit
git commit -m "Initial commit: Complete ML Learning Platform with optimizations

- Added comprehensive documentation
- Optimized dependencies (85% reduction)
- Implemented Premium SaaS design system
- Fixed UI issues and dark theme
- Created development guides
- Enhanced security with proper .gitignore"

# 4. Add remote (replace with your GitHub URL)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# 5. Push to main
git push -u origin main

# 6. Create development branch
git checkout -b development
git push -u origin development

# 7. Go back to main
git checkout main
```

**You're all set!** 🎉

Share the repository URL with your team and they can start collaborating!
