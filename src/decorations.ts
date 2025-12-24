import * as vscode from 'vscode';
import { StorageManager } from './storage';
import { ContextNote } from './types';

/**
 * Manages note decorations in the editor
 */
export class NoteDecorationProvider {
    private decorationType: vscode.TextEditorDecorationType;

    constructor(private storage: StorageManager) {
        this.decorationType = vscode.window.createTextEditorDecorationType({
            gutterIconPath: vscode.Uri.parse(
                'data:image/svg+xml,' +
                    encodeURIComponent(
                        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="%23FFA500"><circle cx="8" cy="8" r="7"/><text x="8" y="12" text-anchor="middle" font-size="10" fill="white" font-weight="bold">!</text></svg>'
                    )
            ),
            gutterIconSize: 'contain',
        });
    }

    updateDecorations(editor: vscode.TextEditor): void {
        const filePath = editor.document.uri.fsPath;
        const notes = this.storage.getNotesForFile(filePath);

        const decorations: vscode.DecorationOptions[] = notes.map((note) => {
            const line = editor.document.lineAt(note.lineNumber);
            return {
                range: line.range,
                hoverMessage: this.createHoverMessage(note),
            };
        });

        editor.setDecorations(this.decorationType, decorations);
    }

    private createHoverMessage(note: ContextNote): vscode.MarkdownString {
        const md = new vscode.MarkdownString();
        md.isTrusted = true;
        md.supportHtml = true;

        md.appendMarkdown(`### 📝 Context Note\n\n`);
        md.appendMarkdown(`${note.content}\n\n`);
        md.appendMarkdown(`---\n\n`);
        md.appendMarkdown(
            `*Created: ${new Date(note.createdAt).toLocaleString()}*\n\n`
        );
        if (note.lastViewed) {
            md.appendMarkdown(
                `*Last viewed: ${new Date(note.lastViewed).toLocaleString()}*\n\n`
            );
        }

        return md;
    }

    dispose(): void {
        this.decorationType.dispose();
    }
}
