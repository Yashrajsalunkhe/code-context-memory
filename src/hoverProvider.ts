import * as vscode from 'vscode';
import { StorageManager } from './storage';

/**
 * Provides hover information for code context
 */
export class ContextHoverProvider implements vscode.HoverProvider {
    constructor(private storage: StorageManager) {}

    provideHover(
        document: vscode.TextDocument,
        position: vscode.Position,
        token: vscode.CancellationToken
    ): vscode.ProviderResult<vscode.Hover> {
        const filePath = document.uri.fsPath;
        const lineNumber = position.line;

        // Get notes for this line
        const notes = this.storage.getNotesForLine(filePath, lineNumber);

        if (notes.length === 0) {
            return undefined;
        }

        const md = new vscode.MarkdownString();
        md.isTrusted = true;

        md.appendMarkdown(`## 🧠 Context Memory\n\n`);

        notes.forEach((note, index) => {
            if (index > 0) {
                md.appendMarkdown(`---\n\n`);
            }
            md.appendMarkdown(`**Note ${index + 1}:**\n\n`);
            md.appendMarkdown(`${note.content}\n\n`);
            md.appendMarkdown(
                `*Added: ${new Date(note.createdAt).toLocaleString()}*\n\n`
            );
            if (note.lastViewed) {
                md.appendMarkdown(
                    `*Last viewed: ${new Date(note.lastViewed).toLocaleString()}*\n\n`
                );
            }
        });

        return new vscode.Hover(md);
    }
}

/**
 * Provides status bar information about file context
 */
export class ContextStatusBar {
    private statusBarItem: vscode.StatusBarItem;

    constructor(private storage: StorageManager) {
        this.statusBarItem = vscode.window.createStatusBarItem(
            vscode.StatusBarAlignment.Right,
            100
        );
        this.statusBarItem.command = 'codeContextMemory.showFileContext';
    }

    updateForFile(filePath: string): void {
        const notes = this.storage.getNotesForFile(filePath);
        const lastAccess = this.storage.getTimeSinceLastAccess(filePath);

        if (notes.length > 0 || lastAccess) {
            let text = '🧠';
            let tooltip = 'Code Context Memory\n\n';

            if (notes.length > 0) {
                text += ` ${notes.length} note${notes.length > 1 ? 's' : ''}`;
                tooltip += `${notes.length} context note${notes.length > 1 ? 's' : ''} in this file\n`;
            }

            if (lastAccess) {
                tooltip += `Last accessed: ${lastAccess}`;
            }

            this.statusBarItem.text = text;
            this.statusBarItem.tooltip = tooltip;
            this.statusBarItem.show();
        } else {
            this.statusBarItem.hide();
        }
    }

    dispose(): void {
        this.statusBarItem.dispose();
    }
}
