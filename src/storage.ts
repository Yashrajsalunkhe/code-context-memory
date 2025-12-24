import * as vscode from 'vscode';
import { ContextNote, FileContext } from './types';

/**
 * Manages persistent storage of context notes
 */
export class StorageManager {
    private static readonly NOTES_KEY = 'contextNotes';
    private static readonly FILE_ACCESS_KEY = 'fileAccess';

    constructor(private context: vscode.ExtensionContext) {}

    /**
     * Get all context notes
     */
    getAllNotes(): ContextNote[] {
        return this.context.globalState.get<ContextNote[]>(
            StorageManager.NOTES_KEY,
            []
        );
    }

    /**
     * Get notes for a specific file
     */
    getNotesForFile(filePath: string): ContextNote[] {
        const allNotes = this.getAllNotes();
        return allNotes.filter((note) => note.filePath === filePath);
    }

    /**
     * Get notes for a specific line
     */
    getNotesForLine(filePath: string, lineNumber: number): ContextNote[] {
        const fileNotes = this.getNotesForFile(filePath);
        return fileNotes.filter((note) => note.lineNumber === lineNumber);
    }

    /**
     * Add a new context note
     */
    async addNote(note: ContextNote): Promise<void> {
        const notes = this.getAllNotes();
        notes.push(note);
        await this.context.globalState.update(StorageManager.NOTES_KEY, notes);
    }

    /**
     * Update an existing note
     */
    async updateNote(noteId: string, updates: Partial<ContextNote>): Promise<void> {
        const notes = this.getAllNotes();
        const index = notes.findIndex((n) => n.id === noteId);
        if (index !== -1) {
            notes[index] = { ...notes[index], ...updates };
            await this.context.globalState.update(StorageManager.NOTES_KEY, notes);
        }
    }

    /**
     * Delete a note
     */
    async deleteNote(noteId: string): Promise<void> {
        const notes = this.getAllNotes();
        const filtered = notes.filter((n) => n.id !== noteId);
        await this.context.globalState.update(StorageManager.NOTES_KEY, filtered);
    }

    /**
     * Record file access time
     */
    async recordFileAccess(filePath: string): Promise<void> {
        const fileAccess = this.context.globalState.get<Record<string, number>>(
            StorageManager.FILE_ACCESS_KEY,
            {}
        );
        fileAccess[filePath] = Date.now();
        await this.context.globalState.update(
            StorageManager.FILE_ACCESS_KEY,
            fileAccess
        );
    }

    /**
     * Get last access time for a file
     */
    getLastAccess(filePath: string): number | undefined {
        const fileAccess = this.context.globalState.get<Record<string, number>>(
            StorageManager.FILE_ACCESS_KEY,
            {}
        );
        return fileAccess[filePath];
    }

    /**
     * Get time since last access in human-readable format
     */
    getTimeSinceLastAccess(filePath: string): string | undefined {
        const lastAccess = this.getLastAccess(filePath);
        if (!lastAccess) {
            return undefined;
        }

        const now = Date.now();
        const diff = now - lastAccess;
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) {
            return `${days} day${days > 1 ? 's' : ''} ago`;
        }
        if (hours > 0) {
            return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        }
        if (minutes > 0) {
            return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        }
        return 'just now';
    }
}
