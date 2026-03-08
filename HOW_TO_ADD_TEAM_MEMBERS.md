# 👥 How to Add Team Members to Repository

## For Repository Owner (You)

### Step 1: Add Collaborators on GitHub

1. **Go to repository settings:**
   - Visit: https://github.com/adityanaik1122/Param_learning_platform
   - Click "Settings" tab (top right)

2. **Navigate to Collaborators:**
   - Click "Collaborators and teams" in left sidebar
   - Or direct link: https://github.com/adityanaik1122/Param_learning_platform/settings/access

3. **Add people:**
   - Click green "Add people" button
   - Enter their GitHub username or email
   - Select permission level:
     - **Write** - For developers (can push to branches, create PRs)
     - **Maintain** - For team leads (Write + manage issues/PRs)
     - **Admin** - For co-owners (full access)
   - Click "Add [username] to this repository"

4. **Repeat for each team member**

---

## For Team Members

### Step 1: Accept Invitation

1. **Check email:**
   - Look for email from GitHub
   - Subject: "[username] has invited you to collaborate on..."

2. **Accept invitation:**
   - Click "View invitation" button in email
   - Or visit: https://github.com/adityanaik1122/Param_learning_platform/invitations
   - Click "Accept invitation"

3. **Verify access:**
   - Visit: https://github.com/adityanaik1122/Param_learning_platform
   - You should see the repository (not 404 error)

### Step 2: Clone Repository

**Use HTTPS (recommended):**
```bash
git clone https://github.com/adityanaik1122/Param_learning_platform.git
cd Param_learning_platform
```

**Or SSH (if configured):**
```bash
git clone git@github.com:adityanaik1122/Param_learning_platform.git
cd Param_learning_platform
```

**Or GitHub CLI:**
```bash
gh repo clone adityanaik1122/Param_learning_platform
cd Param_learning_platform
```

### Step 3: Follow Quick Start Guide

Read: [QUICK_START_FOR_TEAM.md](./QUICK_START_FOR_TEAM.md)

---

## 🔐 Authentication Methods

### Method 1: HTTPS with Personal Access Token (Recommended)

**Why?** GitHub no longer accepts passwords for HTTPS. You need a Personal Access Token (PAT).

**Setup:**

1. **Create Personal Access Token:**
   - Go to: https://github.com/settings/tokens
   - Click "Generate new token" → "Generate new token (classic)"
   - Give it a name: "Param Learning Platform"
   - Select scopes:
     - ✅ `repo` (full control of private repositories)
   - Click "Generate token"
   - **COPY THE TOKEN** (you won't see it again!)

2. **Clone with token:**
   ```bash
   git clone https://github.com/adityanaik1122/Param_learning_platform.git
   ```
   - When prompted for username: enter your GitHub username
   - When prompted for password: **paste your token** (not your password)

3. **Save credentials (optional):**
   ```bash
   # Windows
   git config --global credential.helper wincred
   
   # Mac
   git config --global credential.helper osxkeychain
   
   # Linux
   git config --global credential.helper store
   ```

### Method 2: SSH Keys (Advanced)

**Setup:**

1. **Generate SSH key:**
   ```bash
   ssh-keygen -t ed25519 -C "your_email@example.com"
   ```

2. **Add to SSH agent:**
   ```bash
   eval "$(ssh-agent -s)"
   ssh-add ~/.ssh/id_ed25519
   ```

3. **Add to GitHub:**
   - Copy public key: `cat ~/.ssh/id_ed25519.pub`
   - Go to: https://github.com/settings/keys
   - Click "New SSH key"
   - Paste key and save

4. **Clone with SSH:**
   ```bash
   git clone git@github.com:adityanaik1122/Param_learning_platform.git
   ```

### Method 3: GitHub CLI

**Setup:**

1. **Install GitHub CLI:**
   - Windows: `winget install GitHub.cli`
   - Mac: `brew install gh`
   - Linux: See https://github.com/cli/cli#installation

2. **Authenticate:**
   ```bash
   gh auth login
   ```
   - Follow prompts
   - Choose HTTPS or SSH
   - Authenticate via browser

3. **Clone:**
   ```bash
   gh repo clone adityanaik1122/Param_learning_platform
   ```

---

## 📋 Team Member Checklist

### For Repository Owner:
- [ ] Add team members as collaborators
- [ ] Set appropriate permission levels
- [ ] Share QUICK_START_FOR_TEAM.md with them
- [ ] Share this file (HOW_TO_ADD_TEAM_MEMBERS.md)
- [ ] Set up branch protection rules
- [ ] Create initial GitHub issues for tasks

### For Team Members:
- [ ] Accept GitHub invitation
- [ ] Set up authentication (PAT or SSH)
- [ ] Clone repository
- [ ] Read QUICK_START_FOR_TEAM.md
- [ ] Read TEAM_SETUP_GUIDE.md
- [ ] Set up development environment
- [ ] Create first feature branch
- [ ] Make first commit

---

## 🎯 Permission Levels Explained

| Level | Can Do | Use For |
|-------|--------|---------|
| **Read** | View code, clone, create issues | External contributors, viewers |
| **Triage** | Read + manage issues/PRs | Issue managers |
| **Write** | Triage + push to branches, create PRs | Developers |
| **Maintain** | Write + manage repo settings (no delete) | Team leads |
| **Admin** | Full access including delete | Co-owners |

**Recommended for development team:** **Write** access

---

## 🔒 Security Best Practices

### For Repository Owner:
1. ✅ Enable branch protection on `main` and `development`
2. ✅ Require pull request reviews
3. ✅ Enable 2FA on your GitHub account
4. ✅ Review collaborator list regularly
5. ✅ Use GitHub Actions for CI/CD (not personal credentials)

### For Team Members:
1. ✅ Enable 2FA on GitHub account
2. ✅ Use Personal Access Tokens (not passwords)
3. ✅ Never commit `.env` files or secrets
4. ✅ Keep tokens secure (don't share or commit)
5. ✅ Revoke tokens you're not using

---

## 🆘 Troubleshooting

### Issue: Team member can't see repository

**Solution:**
1. Check if invitation was sent
2. Check if invitation was accepted
3. Verify email address is correct
4. Resend invitation if needed

### Issue: "Permission denied" when cloning

**Solution:**
1. Verify invitation was accepted
2. Check authentication method:
   - HTTPS: Use Personal Access Token (not password)
   - SSH: Verify SSH key is added to GitHub
3. Try HTTPS method first (easiest)

### Issue: "Repository not found"

**Solution:**
1. Verify repository URL is correct
2. Check if you're logged into correct GitHub account
3. Verify you accepted the invitation
4. Try accessing repository in browser first

### Issue: Can't push to repository

**Solution:**
1. Check permission level (need Write or higher)
2. Check if branch is protected
3. Verify you're pushing to correct branch
4. Try creating a feature branch instead of pushing to main/development

---

## 📞 Support

### For Team Members:
- **Can't clone?** Check authentication setup above
- **Can't push?** Verify you have Write access
- **Other issues?** Create GitHub issue or contact owner

### For Repository Owner:
- **GitHub Docs**: https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/managing-repository-settings/managing-teams-and-people-with-access-to-your-repository

---

## 📧 Email Template for Team Members

**Subject:** Invitation to Param Learning Platform Repository

**Body:**
```
Hi [Name],

You've been added to the Param Learning Platform repository!

Next steps:
1. Check your email for GitHub invitation and accept it
2. Clone the repository: https://github.com/adityanaik1122/Param_learning_platform
3. Read the Quick Start Guide: QUICK_START_FOR_TEAM.md
4. Set up your development environment
5. Create your first feature branch

Important links:
- Repository: https://github.com/adityanaik1122/Param_learning_platform
- Quick Start: [link to QUICK_START_FOR_TEAM.md]
- Team Guide: [link to TEAM_SETUP_GUIDE.md]

If you have any issues with access or setup, let me know!

Happy coding!
```

---

## ✅ Quick Reference

### Add Collaborator:
```
Settings → Collaborators → Add people → Enter username → Select Write → Add
```

### Clone Repository (HTTPS):
```bash
git clone https://github.com/adityanaik1122/Param_learning_platform.git
```

### Clone Repository (SSH):
```bash
git clone git@github.com:adityanaik1122/Param_learning_platform.git
```

### Clone Repository (GitHub CLI):
```bash
gh repo clone adityanaik1122/Param_learning_platform
```

---

**Last Updated**: March 7, 2026
**Repository**: https://github.com/adityanaik1122/Param_learning_platform
