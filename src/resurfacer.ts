import * as vscode from 'vscode';
import { StorageManager } from './storage';
import { ContextNote } from './types';

/**
 * Manages time-based context resurfacing
 */
export class ContextResurfacer {
    private static readonly CHECK_INTERVAL = 1000 * 60; // Check every minute
    private intervalId?: NodeJS.Timeout;
    private notifiedFiles: Set<string> = new Set(); // Track files that have been notified in this session

    constructor(private storage: StorageManager) {}

    start(): void {
        // Check on startup
        this.checkForReturningContext();

        // Then check periodically
        this.intervalId = setInterval(() => {
            this.checkForReturningContext();
        }, ContextResurfacer.CHECK_INTERVAL);
    }

    stop(): void {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }

    /**
     * Check if user is returning to code with context.
     * This method is public to allow immediate checks when editor changes,
     * in addition to the periodic interval checks.
     */
    checkForReturningContext(): void {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }

        const filePath = editor.document.uri.fsPath;
        
        try {
            const notes = this.storage.getNotesForFile(filePath);
            
            if (notes.length === 0) {
                // No notes for this file
                return;
            }

            // Check if we've already notified about this file in this session
            if (this.notifiedFiles.has(filePath)) {
                // Already notified, nothing more to do
                return;
            }

            const lastAccess = this.storage.getLastAccess(filePath);
            
            // Check if returning after a while (only relevant if there was a previous access)
            if (lastAccess) {
                const timeSinceAccess = Date.now() - lastAccess;
                const hoursSince = timeSinceAccess / (1000 * 60 * 60);

                // If been away for more than 24 hours, show a reminder
                if (hoursSince >= 24) {
                    this.notifiedFiles.add(filePath); // Mark as notified
                    this.showReturningContextNotification(filePath, notes, hoursSince);
                }
            }
        } finally {
            // Always record access time, regardless of notification state
            this.storage.recordFileAccess(filePath);
        }
    }

    /**
     * Show notification when returning to code
     */
    private async showReturningContextNotification(
        filePath: string,
        notes: ContextNote[],
        hoursSince: number
    ): Promise<void> {
        const fileName = filePath.split('/').pop();
        const daysSince = Math.floor(hoursSince / 24);

        const message =
            daysSince === 0
                ? `Welcome back to ${fileName}! You have ${notes.length} context note${notes.length > 1 ? 's' : ''} here.`
                : `You last worked on ${fileName} ${daysSince} day${daysSince > 1 ? 's' : ''} ago. You have ${notes.length} context note${notes.length > 1 ? 's' : ''} here.`;

        const action = await vscode.window.showInformationMessage(
            message,
            'View Notes',
            'Dismiss'
        );

        if (action === 'View Notes') {
            vscode.commands.executeCommand('codeContextMemory.viewNotes');
        }
    }

    /**
     * Show all notes that haven't been viewed in a while
     */
    async showStaleNotes(): Promise<void> {
        const allNotes = this.storage.getAllNotes();
        const now = Date.now();
        const weekAgo = now - 1000 * 60 * 60 * 24 * 7;

        const staleNotes = allNotes.filter((note) => {
            const lastViewed = note.lastViewed || note.createdAt;
            return lastViewed < weekAgo;
        });

        if (staleNotes.length === 0) {
            vscode.window.showInformationMessage('No stale notes found!');
            return;
        }

        const items = staleNotes.map((note) => {
            const fileName = note.filePath.split('/').pop();
            const daysSince = Math.floor(
                (now - (note.lastViewed || note.createdAt)) / (1000 * 60 * 60 * 24)
            );

            return {
                label: `${fileName} - Line ${note.lineNumber + 1}`,
                description: `${daysSince} days ago`,
                detail: note.content,
                note,
            };
        });

        const selected = await vscode.window.showQuickPick(items, {
            placeHolder: 'Select a note to revisit',
            matchOnDescription: true,
            matchOnDetail: true,
        });

        if (selected) {
            // Open the file and jump to the line
            const document = await vscode.workspace.openTextDocument(
                selected.note.filePath
            );
            const editor = await vscode.window.showTextDocument(document);

            const position = new vscode.Position(selected.note.lineNumber, 0);
            editor.selection = new vscode.Selection(position, position);
            editor.revealRange(
                new vscode.Range(position, position),
                vscode.TextEditorRevealType.InCenter
            );

            // Update last viewed
            await this.storage.updateNote(selected.note.id, {
                lastViewed: Date.now(),
            });
        }
    }
}
