# Change Log

All notable changes to the "Code Context Memory" extension will be documented in this file.

## [0.0.1] - 2024-12-24

### Initial Release 🎉

#### Features
- ✅ **Add Context Notes**: Attach personal notes to any line of code
  - Keyboard shortcut: `Ctrl+Shift+N` / `Cmd+Shift+N`
  - Right-click context menu integration
  - Input box for quick note entry

- ✅ **View & Navigate Notes**: Browse and manage your context
  - Sidebar tree view organized by file
  - Quick pick menu for current file (`Ctrl+Shift+M` / `Cmd+Shift+M`)
  - Click to jump to note locations

- ✅ **Visual Indicators**: See notes at a glance
  - Gutter icons on lines with notes
  - Rich hover tooltips with note content
  - Status bar indicator showing note count and last access time

- ✅ **Time-Based Resurfacing**: Remember when you last touched code
  - Automatic file access tracking
  - Welcome back notifications after 24+ hours
  - "Last accessed" timestamps in readable format

- ✅ **Stale Note Detection**: Find forgotten context
  - "Show Stale Notes" command
  - Highlights notes not viewed in 7+ days
  - Quick navigation to old notes

- ✅ **Persistent Storage**: Your notes never disappear
  - Stored in VS Code global state
  - Survives workspace changes and restarts
  - Lightweight and fast

#### Technical
- TypeScript implementation
- No external dependencies
- Efficient storage using VS Code ExtensionContext
- Modular architecture for easy maintenance

---

## Roadmap

See README.md for upcoming features and improvements.