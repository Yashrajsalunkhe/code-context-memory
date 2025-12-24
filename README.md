# Code Context Memory

> **A developer memory prosthetic for VS Code**

Remember why you wrote code, when you last touched it, and what you were thinking. Code Context Memory is the missing layer between comments and documentation—your personal, persistent memory for code.

## 🧠 The Problem

As developers, we constantly forget:
- **Why** we made specific decisions
- **When** we last worked on a file
- **What** context we had that's no longer in our heads

Traditional solutions are inadequate:
- 📝 **Comments** clutter code and get stale
- 🗂️ **Git commits** are hard to search and disconnected from the code
- 📚 **Documentation** is formal and time-consuming

## ✨ Features

### 1. 📌 Personal Context Notes

Add quick, personal notes to any line of code explaining your thought process:

- **Right-click** any line → "Add Context Note"
- Or use keyboard shortcut: `Ctrl+Shift+N` (Mac: `Cmd+Shift+N`)
- Notes appear as gutter icons with rich hover tooltips

![Add Note Demo](images/add-note.gif)

### 2. 🔍 Automatic Context Resurfacing

The extension remembers when you last worked on files and reminds you:

- Notifications when returning to code after 24+ hours
- Shows your context notes automatically
- "You last worked on this 3 days ago—here's what you were thinking"

### 3. 📊 Context Memory Sidebar

Browse all your notes in one place:

- Organized by file
- Sortable by date
- Click to jump to any note
- Shows note count and creation dates

### 4. ⏰ Stale Note Detection

Find notes you haven't revisited in a while:

- "Show Stale Notes" command
- Reminds you of forgotten context
- Perfect for long-running projects

### 5. 💡 Smart Status Bar

See at a glance:
- How many notes are in the current file
- When you last accessed this file
- Click to view all notes

## 🚀 Usage

### Adding Notes

```
1. Place cursor on a line of code
2. Press Ctrl+Shift+N (Cmd+Shift+N on Mac)
   OR right-click → "Add Context Note"
3. Type your note (e.g., "Using this pattern because X causes Y issue")
4. Press Enter
```

### Viewing Notes

- **Hover** over lines with notes (🟠 gutter icon)
- **Press** `Ctrl+Shift+M` to see all notes in current file
- **Click** status bar 🧠 icon
- **Open** Context Memory sidebar from Activity Bar

### Managing Notes

- Right-click → "Delete Context Note" to remove
- Notes persist across VS Code sessions
- Stored locally in workspace state

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

## ⌨️ Keyboard Shortcuts

| Command | Windows/Linux | Mac |
|---------|---------------|-----|
| Add Note | `Ctrl+Shift+N` | `Cmd+Shift+N` |
| View Notes | `Ctrl+Shift+M` | `Cmd+Shift+M` |

## 🎨 Commands

Access via Command Palette (`Ctrl+Shift+P`):

- `Context Memory: Add Context Note` - Add a note at cursor
- `Context Memory: View Context Notes` - Browse notes in current file
- `Context Memory: Delete Context Note` - Remove note at cursor
- `Context Memory: Show Stale Notes` - Find forgotten notes

## 🔧 How It Works

1. **Notes are stored** in VS Code's global state (survives restarts)
2. **File access times** are tracked automatically
3. **Gutter decorations** mark lines with notes
4. **Hover providers** show note content
5. **Background checks** detect when you return to old code

## 🆚 Why Not Just Use...?

| Tool | Limitation | Context Memory Solution |
|------|-----------|------------------------|
| **Comments** | Clutter code, become outdated | Notes are separate, personal, timestamped |
| **Git Commits** | Hard to find relevant context | Attached to exact lines, searchable |
| **CodeTour** | Linear walkthroughs only | Free-form, async, for your workflow |
| **TODO Comments** | No memory of when/why | Tracks time, reminds you automatically |

## 📦 Storage

- Notes stored in **VS Code Global State** (not in workspace)
- Persists across:
  - VS Code restarts
  - Workspace switches
  - Extension updates
- No cloud sync (your notes stay local)

## 🛣️ Roadmap

- [ ] Search across all notes
- [ ] Export notes to markdown
- [ ] Link notes together
- [ ] AI-powered context suggestions
- [ ] Team sharing (optional)
- [ ] Integration with git blame

## 🐛 Known Issues

- Notes are file-path based (moving files loses notes)
- No multi-line note support yet
- Storage is local only (no sync between machines)

## 🤝 Contributing

This is an open-source project! Contributions welcome.

## 📄 License

MIT

---

**Built with 🧠 by developers, for developers who forget things.**

## Following extension guidelines

Ensure that you've read through the extensions guidelines and follow the best practices for creating your extension.

* [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

## Working with Markdown

You can author your README using Visual Studio Code. Here are some useful editor keyboard shortcuts:

* Split the editor (`Cmd+\` on macOS or `Ctrl+\` on Windows and Linux).
* Toggle preview (`Shift+Cmd+V` on macOS or `Shift+Ctrl+V` on Windows and Linux).
* Press `Ctrl+Space` (Windows, Linux, macOS) to see a list of Markdown snippets.

## For more information

* [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
* [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!**
