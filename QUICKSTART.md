# Quick Start Guide - Code Context Memory

## Testing Your Extension

### 1. Launch Extension Development Host

Press `F5` or run "Run > Start Debugging" to open a new VS Code window with your extension loaded.

### 2. Try These Commands

#### Add Your First Note
1. Open any file in the Extension Development Host
2. Place cursor on any line
3. Press `Ctrl+Shift+N` (Mac: `Cmd+Shift+N`)
4. Type: "This is my first context note!"
5. Press Enter

You should see:
- 🟠 Orange gutter icon appears
- ✅ "Context note added!" notification

#### View Notes
1. Hover over the line with the gutter icon
   - See your note in a rich tooltip
2. Press `Ctrl+Shift+M` to open quick pick
   - Browse all notes in current file
3. Check the status bar (bottom right)
   - Shows "🧠 1 note"

#### Open Sidebar
1. Click the book icon (📚) in the Activity Bar (left side)
2. See "My Context Notes" tree view
3. Expand your file
4. Click a note to jump to it

#### Test Time Features
1. Add notes to a file
2. Close the file
3. Wait a few minutes
4. Reopen the file
5. Check status bar - shows "Last accessed: X minutes ago"

### 3. Test Multiple Files

1. Add notes to multiple files
2. Open sidebar to see all organized by file
3. Click different notes to navigate

### 4. Try Stale Notes

1. Open Command Palette (`Ctrl+Shift+P`)
2. Type "Context Memory: Show Stale Notes"
3. See notes you haven't viewed recently
4. Select one to jump to it

### 5. Delete Notes

1. Place cursor on a line with a note
2. Right-click → "Delete Context Note"
3. Note disappears

## Common Test Scenarios

### Scenario 1: New Project Context
```
1. Create a new file: test.js
2. Add function: function complex() {}
3. Add note: "Using this pattern because..."
4. Close and reopen after 1 hour
5. Verify: Welcome back notification appears
```

### Scenario 2: Multiple Notes
```
1. Add 5+ notes to same file
2. Use Ctrl+Shift+M to browse
3. Click each to navigate
4. Verify: All notes show correctly
```

### Scenario 3: Cross-File Context
```
1. Add notes to 3 different files
2. Open sidebar
3. Browse all files and notes
4. Verify: Tree view shows all organized
```

## Debugging

If something doesn't work:

1. **Check Output Panel**
   - View > Output
   - Select "Extension Host" from dropdown
   - Look for errors

2. **Check Debug Console**
   - View > Debug Console
   - See console.log messages

3. **Reload Extension**
   - In Extension Development Host: Cmd+R (Mac) or Ctrl+R (Windows/Linux)

## Known Limitations in Dev

- File paths must exist (not untitled files)
- Notes stored in development extension state
- No sync between dev and production

## Next Steps

After testing:
1. Fix any issues you find
2. Add more features from roadmap
3. Create demo GIFs for README
4. Publish to marketplace!

## Useful Commands

```bash
# Compile TypeScript
npm run compile

# Watch for changes
npm run watch

# Run tests
npm test

# Package extension
npm run package
```

## File Structure

```
src/
├── extension.ts         # Main activation
├── storage.ts          # Data persistence
├── noteManager.ts      # Note CRUD operations
├── decorations.ts      # Gutter icons
├── hoverProvider.ts    # Tooltips & status bar
├── treeView.ts         # Sidebar tree
├── resurfacer.ts       # Time-based features
└── types.ts           # TypeScript interfaces
```

Happy coding! 🧠✨
