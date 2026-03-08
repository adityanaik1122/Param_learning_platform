# Git Branching Strategy for Param Learning Platform

## 🌳 Branch Structure

### Main Branches

#### 1. `main` (Production)
- **Purpose**: Production-ready code
- **Protection**: Protected branch
- **Access**: Only via Pull Requests from `development`
- **Deployment**: Auto-deploys to production
- **Rules**: 
  - No direct commits
  - Requires code review
  - All tests must pass

#### 2. `development` (Integration)
- **Purpose**: Integration branch for all features
- **Protection**: Protected branch
- **Access**: Via Pull Requests from feature branches
- **Deployment**: Auto-deploys to staging environment
- **Rules**:
  - No direct commits (except hotfixes)
  - Requires at least 1 code review
  - All tests must pass

### Feature Branches

#### Naming Convention:
```
feature/[feature-name]
bugfix/[bug-name]
hotfix/[hotfix-name]
```

#### Examples:
- `feature/frontend-enhancements` - UI/UX improvements
- `feature/backend-api` - Backend API development
- `feature/new-phase-content` - Adding new learning phases
- `bugfix/login-issue` - Bug fixes
- `hotfix/critical-security-patch` - Critical production fixes

---

## 🔄 Workflow

### For Development Team

#### 1. Starting New Feature
```bash
# Switch to development branch
git checkout development

# Pull latest changes
git pull origin development

# Create new feature branch
git checkout -b feature/your-feature-name

# Push to remote
git push -u origin feature/your-feature-name
```

#### 2. Working on Feature
```bash
# Make changes to your code
# Stage changes
git add .

# Commit with descriptive message
git commit -m "feat: add user authentication module"

# Push to your feature branch
git push origin feature/your-feature-name
```

#### 3. Keeping Feature Branch Updated
```bash
# Switch to your feature branch
git checkout feature/your-feature-name

# Fetch latest changes
git fetch origin

# Merge development into your feature branch
git merge origin/development

# Resolve conflicts if any
# Push updated branch
git push origin feature/your-feature-name
```

#### 4. Creating Pull Request
1. Go to GitHub repository
2. Click "Pull Requests" → "New Pull Request"
3. Base: `development` ← Compare: `feature/your-feature-name`
4. Fill in PR template:
   - Description of changes
   - Screenshots (if UI changes)
   - Testing done
   - Related issues
5. Request reviewers
6. Wait for approval and merge

---

## 📋 Commit Message Convention

### Format:
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples:
```bash
git commit -m "feat(auth): add JWT authentication"
git commit -m "fix(compiler): resolve Python execution timeout"
git commit -m "docs(readme): update installation instructions"
git commit -m "style(frontend): improve button styling"
```

---

## 🚀 Release Process

### From Development to Production

#### 1. Create Release Branch
```bash
git checkout development
git pull origin development
git checkout -b release/v1.0.0
git push -u origin release/v1.0.0
```

#### 2. Final Testing
- Run all tests
- Perform manual QA
- Fix any last-minute bugs

#### 3. Merge to Main
```bash
# Create PR: release/v1.0.0 → main
# After approval and merge:
git checkout main
git pull origin main
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```

#### 4. Merge Back to Development
```bash
git checkout development
git merge main
git push origin development
```

---

## 🔥 Hotfix Process

### For Critical Production Issues

```bash
# Create hotfix from main
git checkout main
git pull origin main
git checkout -b hotfix/critical-bug-fix

# Make fixes
git add .
git commit -m "hotfix: fix critical security vulnerability"
git push -u origin hotfix/critical-bug-fix

# Create PR to main
# After merge, also merge to development
git checkout development
git merge main
git push origin development
```

---

## 👥 Team Collaboration

### Current Branches

| Branch | Purpose | Status |
|--------|---------|--------|
| `main` | Production code | 🟢 Active |
| `development` | Integration branch | 🟢 Active |
| `feature/frontend-enhancements` | UI/UX improvements | 🟡 In Progress |
| `feature/backend-api` | Backend development | 🟡 In Progress |

### Branch Access

#### For Team Members:
1. **Clone Repository**
   
   **Option A: HTTPS (Easiest)**
   ```bash
   git clone https://github.com/adityanaik1122/Param_learning_platform.git
   cd Param_learning_platform
   ```
   
   **Option B: SSH (If configured)**
   ```bash
   git clone git@github.com:adityanaik1122/Param_learning_platform.git
   cd Param_learning_platform
   ```
   
   **Option C: GitHub CLI**
   ```bash
   gh repo clone adityanaik1122/Param_learning_platform
   cd Param_learning_platform
   ```

2. **View All Branches**
   ```bash
   git branch -a
   ```

3. **Switch to Development Branch**
   ```bash
   git checkout development
   ```

4. **Create Your Feature Branch**
   ```bash
   git checkout -b feature/your-name-feature
   git push -u origin feature/your-name-feature
   ```

---

## 🛡️ Branch Protection Rules

### Recommended Settings for GitHub

#### For `main` branch:
- ✅ Require pull request reviews before merging (2 approvals)
- ✅ Require status checks to pass before merging
- ✅ Require branches to be up to date before merging
- ✅ Require conversation resolution before merging
- ✅ Do not allow bypassing the above settings
- ✅ Restrict who can push to matching branches

#### For `development` branch:
- ✅ Require pull request reviews before merging (1 approval)
- ✅ Require status checks to pass before merging
- ✅ Require branches to be up to date before merging
- ✅ Allow force pushes (for maintainers only)

### How to Set Up:
1. Go to GitHub repository
2. Settings → Branches
3. Add branch protection rule
4. Configure as above

---

## 📊 Branch Lifecycle

```
main (production)
  ↑
  │ (PR after testing)
  │
development (staging)
  ↑
  │ (PR after feature complete)
  │
feature/your-feature
  │
  │ (daily commits)
  │
  └─ Your local work
```

---

## 🎯 Best Practices

### DO:
✅ Pull latest changes before starting work
✅ Create descriptive branch names
✅ Write clear commit messages
✅ Keep feature branches small and focused
✅ Test your code before creating PR
✅ Review others' code thoroughly
✅ Delete branches after merging

### DON'T:
❌ Commit directly to `main` or `development`
❌ Create huge PRs with many changes
❌ Push broken code
❌ Ignore merge conflicts
❌ Skip code reviews
❌ Leave stale branches

---

## 🆘 Common Issues & Solutions

### Issue 1: Merge Conflicts
```bash
# Update your branch with latest development
git checkout feature/your-feature
git fetch origin
git merge origin/development

# Resolve conflicts in your editor
# After resolving:
git add .
git commit -m "merge: resolve conflicts with development"
git push origin feature/your-feature
```

### Issue 2: Accidentally Committed to Wrong Branch
```bash
# If not pushed yet:
git reset HEAD~1  # Undo last commit, keep changes
git stash         # Save changes
git checkout correct-branch
git stash pop     # Apply changes
git add .
git commit -m "your message"
```

### Issue 3: Need to Update Feature Branch
```bash
git checkout feature/your-feature
git fetch origin
git rebase origin/development  # Or use merge
git push -f origin feature/your-feature  # Force push if rebased
```

---

## 📞 Contact & Support

For questions about branching strategy:
- Create an issue on GitHub
- Contact project maintainer
- Check team documentation

---

## 🔄 Quick Reference Commands

```bash
# View all branches
git branch -a

# Switch branch
git checkout branch-name

# Create and switch to new branch
git checkout -b feature/new-feature

# Update current branch
git pull origin branch-name

# Push changes
git push origin branch-name

# Delete local branch
git branch -d branch-name

# Delete remote branch
git push origin --delete branch-name

# View branch status
git status

# View commit history
git log --oneline --graph --all
```

---

**Last Updated**: March 7, 2026
**Version**: 1.0
**Maintained by**: Param Learning Platform Team
