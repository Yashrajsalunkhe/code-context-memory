# Code Context Memory

<div align="center">

![Code Context Memory](icon.png)

**A Developer Memory Prosthetic for VS Code**

[![Version](https://img.shields.io/visual-studio-marketplace/v/yashraj.code-context-memory?color=blue&label=VS%20Code%20Marketplace)](https://marketplace.visualstudio.com/items?itemName=yashraj.code-context-memory)
[![Installs](https://img.shields.io/visual-studio-marketplace/i/yashraj.code-context-memory)](https://marketplace.visualstudio.com/items?itemName=yashraj.code-context-memory)
[![Rating](https://img.shields.io/visual-studio-marketplace/r/yashraj.code-context-memory)](https://marketplace.visualstudio.com/items?itemName=yashraj.code-context-memory)
[![License](https://img.shields.io/github/license/yashraj/code-context-memory)](LICENSE)

[Features](#-features) • [Installation](#-installation) • [Usage](#-usage) • [Commands](#-commands) • [Contributing](#-contributing)

</div>

---

## 🧠 What is Code Context Memory?

Remember why you wrote code, when you last touched it, and what you were thinking. Code Context Memory is the missing layer between comments and documentation—your personal, persistent memory for code.

### The Problem

As developers, we constantly forget:
- **Why** we made specific decisions
- **When** we last worked on a file
- **What** context we had that's no longer in our heads

Traditional solutions are inadequate:
- 📝 **Comments** clutter code and get stale
- 🗂️ **Git commits** are hard to search and disconnected from the code
- 📚 **Documentation** is formal and time-consuming

**Code Context Memory** fills this gap with a personal, editor-native memory system.

---

## ✨ Features

### 📌 Personal Context Notes

Add quick, personal notes to any line of code explaining your thought process:

- **Right-click** any line → "Add Context Note"
- Or use keyboard shortcut: `Ctrl+Shift+N` (Mac: `Cmd+Shift+N`)
- Notes appear as gutter icons with rich hover tooltips

### 🔍 Automatic Context Resurfacing

The extension remembers when you last worked on files and reminds you:

- Notifications when returning to code after 24+ hours
- Shows your context notes automatically
- "You last worked on this 3 days ago—here's what you were thinking"

### 📊 Context Memory Sidebar

Browse all your notes in one place:

- Organized by file
- Sortable by date
- Click to jump to any note
- Shows note count and creation dates

### ⏰ Stale Note Detection

Find notes you haven't revisited in a while:

- "Show Stale Notes" command
- Reminds you of forgotten context
- Perfect for long-running projects

### 💡 Smart Status Bar

See at a glance:
- How many notes are in the current file
- When you last accessed this file
- Click to view all notes

---

## 📦 Installation

### From VS Code Marketplace

1. Open VS Code
2. Press `Ctrl+Shift+X` (or `Cmd+Shift+X` on Mac)
3. Search for "Code Context Memory"
4. Click **Install**

### From .vsix File

```bash
code --install-extension code-context-memory-0.0.1.vsix
```

---

## 🚀 Usage

### Adding Notes

1. Place cursor on a line of code
2. Press `Ctrl+Shift+N` (Cmd+Shift+N on Mac)
   OR right-click → "Add Context Note"
3. Type your note (e.g., "Using this pattern because X causes Y issue")
4. Press Enter

### Viewing Notes

- **Hover** over lines with notes (🟠 gutter icon)
- **Press** `Ctrl+Shift+M` to see all notes in current file
- **Click** status bar 🧠 icon
- **Open** Context Memory sidebar from Activity Bar

### Managing Notes

- Right-click → "Delete Context Note" to remove
- Notes persist across VS Code sessions
- Stored locally in workspace state

---

## 🎯 Use Cases

### Understanding Old Code
```
"Why did I use a WeakMap here?"
→ Note: "Regular Map caused memory leaks in long-running processes"
```

### Decision Documentation
```
"Why this specific algorithm?"
→ Note: "Tried binary search, but dataset is too small. Linear is actually faster here."
```

### Warning Future You
```
"Why this weird workaround?"
→ Note: "Library bug #1234 - remove this when version 2.0 is released"
```

### Team Handoff
```
"What was I working on?"
→ Notes show: "Refactoring auth flow - 60% done, next: add MFA support"
```

---

## ⌨️ Commands

| Command | Shortcut | Description |
|---------|----------|-------------|
| Add Context Note | `Ctrl+Shift+N` / `Cmd+Shift+N` | Add a note at cursor position |
| View Context Notes | `Ctrl+Shift+M` / `Cmd+Shift+M` | Browse notes in current file |
| Delete Context Note | - | Remove note at cursor |
| Show Stale Notes | - | Find notes not viewed in 7+ days |

Access all commands via Command Palette (`Ctrl+Shift+P`) and search for "Context Memory".

---

## 🆚 Why Not Just Use...?

| Tool | Limitation | Context Memory Solution |
|------|-----------|------------------------|
| **Comments** | Clutter code, become outdated | Notes are separate, personal, timestamped |
| **Git Commits** | Hard to find relevant context | Attached to exact lines, searchable |
| **CodeTour** | Linear walkthroughs only | Free-form, async, for your workflow |
| **TODO Comments** | No memory of when/why | Tracks time, reminds you automatically |

---

## 🛠️ Technology Stack

- **Language**: TypeScript
- **Platform**: VS Code Extension API
- **Storage**: VS Code Global State (local, persistent)
- **Build**: esbuild
- **Size**: ~20 KB (lightweight!)

---

## 🛣️ Roadmap

- [ ] Search across all notes
- [ ] Export notes to markdown
- [ ] Link notes together
- [ ] AI-powered context suggestions
- [ ] Team sharing (optional)
- [ ] Integration with git blame
- [ ] Tags and categories
- [ ] Note templates

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Setup

```bash
# Clone the repository
git clone https://github.com/Yashrajsalunkhe/code-context-memory.git
cd code-context-memory

# Install dependencies
npm install

# Start development
npm run watch

# Press F5 to launch Extension Development Host
```

### Project Structure

```
src/
├── extension.ts       # Main activation
├── storage.ts        # Data persistence
├── noteManager.ts    # Note CRUD operations
├── decorations.ts    # Gutter icons
├── hoverProvider.ts  # Tooltips & status bar
├── treeView.ts       # Sidebar tree
├── resurfacer.ts     # Time-based features
└── types.ts         # TypeScript interfaces
```

---

## 📄 License

[MIT](LICENSE) © 2025 Yashraj

---

## 🐛 Issues & Feedback

Found a bug or have a feature request?

- [Report an issue](https://github.com/Yashrajsalunkhe/code-context-memory/issues)
- [Suggest a feature](https://github.com/Yashrajsalunkhe/code-context-memory/issues/new)

---

## 💬 Support

- ⭐ Star this repo if you find it useful!
- 🐛 Report issues on [GitHub](https://github.com/Yashrajsalunkhe/code-context-memory/issues)
- 💡 Share your use cases and feedback

---

<div align="center">

**Built with 🧠 by developers, for developers who forget things.**

[Install Now](https://marketplace.visualstudio.com/items?itemName=yashraj.code-context-memory) • [View Source](https://github.com/Yashrajsalunkhe/code-context-memory)

</div>
