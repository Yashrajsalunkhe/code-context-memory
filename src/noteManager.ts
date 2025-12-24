import * as vscode from 'vscode';
import { StorageManager } from './storage';
import { ContextNote } from './types';

/**
 * Handles creating and editing context notes
 */
export class NoteManager {
    constructor(private storage: StorageManager) {}

    /**
     * Add a note at the current cursor position
     */
    async addNoteAtCursor(): Promise<void> {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No active editor');
            return;
        }

        const filePath = editor.document.uri.fsPath;
        const lineNumber = editor.selection.active.line;

        // Get the line content for context
        const lineContent = editor.document.lineAt(lineNumber).text.trim();

        const content = await vscode.window.showInputBox({
            prompt: 'Enter your context note',
            placeHolder: 'Why did you write this? What were you thinking?',
            value: '',
        });

        if (!content) {
            return;
        }

        const note: ContextNote = {
            id: this.generateId(),
            filePath,
            lineNumber,
            content,
            createdAt: Date.now(),
        };

        await this.storage.addNote(note);
        vscode.window.showInformationMessage('Context note added!');
    }

    /**
     * View notes for the current file
     */
    async viewNotesForCurrentFile(): Promise<void> {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No active editor');
            return;
        }

        const filePath = editor.document.uri.fsPath;
        const notes = this.storage.getNotesForFile(filePath);

        if (notes.length === 0) {
            vscode.window.showInformationMessage('No notes for this file');
            return;
        }

        const items = notes.map((note) => ({
            label: `Line ${note.lineNumber + 1}`,
            description: note.content.substring(0, 50) + '...',
            detail: new Date(note.createdAt).toLocaleString(),
            note,
        }));

        const selected = await vscode.window.showQuickPick(items, {
            placeHolder: 'Select a note to view',
        });

        if (selected) {
            // Update last viewed
            await this.storage.updateNote(selected.note.id, {
                lastViewed: Date.now(),
            });

            // Jump to the line
            const position = new vscode.Position(selected.note.lineNumber, 0);
            editor.selection = new vscode.Selection(position, position);
            editor.revealRange(
                new vscode.Range(position, position),
                vscode.TextEditorRevealType.InCenter
            );
        }
    }

    /**
     * Delete a note at the current cursor position
     */
    async deleteNoteAtCursor(): Promise<void> {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No active editor');
            return;
        }

        const filePath = editor.document.uri.fsPath;
        const lineNumber = editor.selection.active.line;

        const notes = this.storage.getNotesForLine(filePath, lineNumber);

        if (notes.length === 0) {
            vscode.window.showInformationMessage('No notes at this line');
            return;
        }

        if (notes.length === 1) {
            await this.storage.deleteNote(notes[0].id);
            vscode.window.showInformationMessage('Note deleted');
            return;
        }

        // Multiple notes, let user choose
        const items = notes.map((note) => ({
            label: note.content.substring(0, 50),
            description: new Date(note.createdAt).toLocaleString(),
            note,
        }));

        const selected = await vscode.window.showQuickPick(items, {
            placeHolder: 'Select a note to delete',
        });

        if (selected) {
            await this.storage.deleteNote(selected.note.id);
            vscode.window.showInformationMessage('Note deleted');
        }
    }

    private generateId(): string {
        return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    }
}
