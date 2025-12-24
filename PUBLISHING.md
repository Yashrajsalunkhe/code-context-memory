# Publishing Code Context Memory to VS Code Marketplace

## ✅ What's Done

1. ✅ Extension packaged successfully: `code-context-memory-0.0.1.vsix` (20.6 KB)
2. ✅ Icon created (icon.png)
3. ✅ License added (MIT)
4. ✅ Package.json configured
5. ✅ vsce installed

## 🧪 Test Your Extension First

Before publishing, test the packaged extension:

```bash
# Install the .vsix file locally
code --install-extension code-context-memory-0.0.1.vsix

# Or in VS Code: Extensions view → ••• → Install from VSIX
```

Test all features:
- Add notes with `Ctrl+Shift+N`
- View notes with `Ctrl+Shift+M`
- Check sidebar tree view
- Verify hover tooltips
- Test status bar

If everything works, uninstall before publishing:
```bash
code --uninstall-extension yashraj.code-context-memory
```

## 📝 Publishing Steps

### Step 1: Create Publisher Account

1. Go to: https://marketplace.visualstudio.com/manage
2. Sign in with Microsoft/GitHub account
3. Click **"Create publisher"**
4. Enter publisher ID: `yashraj` (must match package.json)
5. Fill in name and description

### Step 2: Generate Personal Access Token (PAT)

1. Go to: https://dev.azure.com/
2. Click **User Settings** (top right) → **Personal Access Tokens**
3. Click **+ New Token**
4. Configure:
   - **Name**: "VS Code Marketplace"
   - **Organization**: All accessible organizations
   - **Expiration**: Custom (365 days recommended)
   - **Scopes**: Click "Show all scopes"
     - Check: **Marketplace** → **Manage**
5. Click **Create**
6. **COPY THE TOKEN** (you won't see it again!)

### Step 3: Login with vsce

```bash
cd /home/yashraj/YASHRAJ/VS-CODE\ Extension/code-context-memory

# Login to vsce
npx vsce login yashraj
# When prompted, paste your Personal Access Token
```

### Step 4: Publish!

```bash
# Publish to marketplace
npm run vsce:publish

# Or manually:
npx vsce publish
```

The extension will be live at:
`https://marketplace.visualstudio.com/items?itemName=yashraj.code-context-memory`

## 🔄 Future Updates

When you make changes:

```bash
# Update version in package.json (e.g., 0.0.2)
# Then publish:
npm run vsce:publish

# Or publish with version bump:
npx vsce publish patch   # 0.0.1 → 0.0.2
npx vsce publish minor   # 0.0.1 → 0.1.0
npx vsce publish major   # 0.0.1 → 1.0.0
```

## ⚠️ Before Publishing

### Update package.json if needed:

1. **Publisher name**: Make sure it matches your marketplace publisher ID
2. **Repository URL**: Update if you create a GitHub repo
3. **Version**: Start with `0.0.1` for first release

### Optional: Create GitHub Repository

```bash
# Create repo on GitHub first, then:
cd /home/yashraj/YASHRAJ/VS-CODE\ Extension/code-context-memory
git init
git add .
git commit -m "Initial commit: Code Context Memory extension"
git branch -M main
git remote add origin https://github.com/yashraj/code-context-memory.git
git push -u origin main
```

Update package.json repository URL to match.

## 📊 After Publishing

1. **Wait 5-10 minutes** for extension to appear in marketplace
2. **Search** for "Code Context Memory" in VS Code Extensions
3. **Install** and verify it works
4. **Share** the link!

## 🎯 Marketplace Optimization

To get more users:

1. **Add screenshots/GIFs** to README
2. **Add banner** to marketplace page
3. **Write good description** in package.json
4. **Use relevant keywords**
5. **Share on**:
   - Twitter/X
   - Reddit (r/vscode)
   - Dev.to
   - LinkedIn

## 🐛 Troubleshooting

**Error: Publisher not found**
- Make sure publisher ID in package.json matches your marketplace publisher

**Error: Extension already published**
- Bump version number in package.json

**Error: PAT expired**
- Generate new token and login again: `npx vsce login yashraj`

**Want to unpublish?**
```bash
npx vsce unpublish yashraj.code-context-memory
```

## 📚 Resources

- [Publishing Extensions](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)
- [Extension Marketplace](https://marketplace.visualstudio.com/)
- [Azure DevOps PAT](https://dev.azure.com/)

---

**Your extension is ready to publish! 🚀**

Run: `npm run vsce:publish` when you're ready!
