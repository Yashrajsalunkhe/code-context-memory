# Contributing to Code Context Memory

Thank you for considering contributing to Code Context Memory! 🎉

## 🤝 How to Contribute

### Reporting Bugs

1. Check if the issue already exists in [Issues](https://github.com/Yashrajsalunkhe/code-context-memory/issues)
2. Use the bug report template
3. Include:
   - VS Code version
   - Extension version
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable

### Suggesting Features

1. Check [existing feature requests](https://github.com/Yashrajsalunkhe/code-context-memory/issues?q=is%3Aissue+is%3Aopen+label%3Aenhancement)
2. Create a new issue with the "enhancement" label
3. Describe:
   - The problem it solves
   - Proposed solution
   - Alternative solutions considered
   - Use cases

### Pull Requests

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Write/update tests if applicable
5. Ensure code passes linting: `npm run lint`
6. Commit with clear message: `git commit -m 'Add amazing feature'`
7. Push to your fork: `git push origin feature/amazing-feature`
8. Open a Pull Request

## 📝 Development Guidelines

### Code Style

- Use TypeScript
- Follow existing code patterns
- Use meaningful variable names
- Add comments for complex logic
- Keep functions small and focused

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add note export functionality
fix: resolve hover provider crash
docs: update README with new examples
refactor: simplify storage manager
test: add unit tests for noteManager
```

### Testing

```bash
# Run tests
npm test

# Watch mode
npm run watch-tests
```

### Building

```bash
# Development build
npm run compile

# Production build
npm run package

# Watch mode
npm run watch
```

## 🏗️ Project Structure

```
src/
├── extension.ts       # Main entry point
├── storage.ts        # Persistent storage
├── noteManager.ts    # CRUD operations
├── decorations.ts    # Visual decorations
├── hoverProvider.ts  # Hover & status bar
├── treeView.ts       # Sidebar tree view
├── resurfacer.ts     # Time-based features
└── types.ts         # Type definitions
```

## 🎯 Priority Areas

We especially welcome contributions in:

- 🔍 Search functionality
- 📤 Export/import features
- 🎨 UI/UX improvements
- 🧪 Test coverage
- 📖 Documentation
- 🌐 Internationalization

## 📋 Code Review Process

1. Maintainer reviews PR within 3-5 days
2. Address feedback if any
3. Once approved, PR is merged
4. Changes included in next release

## 🐛 Debugging

Launch Extension Development Host:
1. Open project in VS Code
2. Press `F5`
3. New VS Code window opens with extension loaded
4. Check Debug Console for logs

## 📚 Resources

- [VS Code Extension API](https://code.visualstudio.com/api)
- [VS Code Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## 💬 Questions?

- Open a [Discussion](https://github.com/Yashrajsalunkhe/code-context-memory/discussions)
- Tag maintainers in issues
- Be patient and respectful

## 📜 Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Focus on constructive feedback
- Report inappropriate behavior

---

**Thank you for contributing! 🙏**
