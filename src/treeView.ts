import * as vscode from 'vscode';
import { StorageManager } from './storage';
import { ContextNote } from './types';
import * as path from 'path';

/**
 * Tree item for context notes
 */
class NoteTreeItem extends vscode.TreeItem {
    constructor(
        public readonly note: ContextNote,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState
    ) {
        super(
            `Line ${note.lineNumber + 1}: ${note.content.substring(0, 40)}${note.content.length > 40 ? '...' : ''}`,
            collapsibleState
        );

        this.tooltip = note.content;
        this.description = new Date(note.createdAt).toLocaleDateString();
        this.contextValue = 'note';

        this.command = {
            command: 'codeContextMemory.openNote',
            title: 'Open Note',
            arguments: [note],
        };

        this.iconPath = new vscode.ThemeIcon('note');
    }
}

/**
 * Tree item for file groups
 */
class FileTreeItem extends vscode.TreeItem {
    constructor(
        public readonly filePath: string,
        public readonly noteCount: number,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState
    ) {
        super(path.basename(filePath), collapsibleState);

        this.tooltip = filePath;
        this.description = `${noteCount} note${noteCount > 1 ? 's' : ''}`;
        this.contextValue = 'file';
        this.iconPath = vscode.ThemeIcon.File;
    }
}

/**
 * Provides tree view of all context notes
 */
export class NotesTreeProvider
    implements vscode.TreeDataProvider<NoteTreeItem | FileTreeItem>
{
    private _onDidChangeTreeData: vscode.EventEmitter<
        NoteTreeItem | FileTreeItem | undefined | null | void
    > = new vscode.EventEmitter<NoteTreeItem | FileTreeItem | undefined | null | void>();
    readonly onDidChangeTreeData: vscode.Event<
        NoteTreeItem | FileTreeItem | undefined | null | void
    > = this._onDidChangeTreeData.event;

    constructor(private storage: StorageManager) {}

    refresh(): void {
        this._onDidChangeTreeData.fire();
    }

    getTreeItem(
        element: NoteTreeItem | FileTreeItem
    ): vscode.TreeItem | Thenable<vscode.TreeItem> {
        return element;
    }

    getChildren(
        element?: NoteTreeItem | FileTreeItem
    ): vscode.ProviderResult<(NoteTreeItem | FileTreeItem)[]> {
        if (!element) {
            // Root level - show files grouped
            return this.getFileGroups();
        }

        if (element instanceof FileTreeItem) {
            // Show notes for this file
            return this.getNotesForFile(element.filePath);
        }

        return [];
    }

    private getFileGroups(): FileTreeItem[] {
        const notes = this.storage.getAllNotes();
        const fileMap = new Map<string, ContextNote[]>();

        // Group notes by file
        notes.forEach((note) => {
            const existing = fileMap.get(note.filePath) || [];
            existing.push(note);
            fileMap.set(note.filePath, existing);
        });

        // Create file tree items
        return Array.from(fileMap.entries())
            .sort(([a], [b]) => a.localeCompare(b))
            .map(
                ([filePath, notes]) =>
                    new FileTreeItem(
                        filePath,
                        notes.length,
                        vscode.TreeItemCollapsibleState.Collapsed
                    )
            );
    }

    private getNotesForFile(filePath: string): NoteTreeItem[] {
        const notes = this.storage.getNotesForFile(filePath);
        return notes
            .sort((a, b) => a.lineNumber - b.lineNumber)
            .map(
                (note) =>
                    new NoteTreeItem(note, vscode.TreeItemCollapsibleState.None)
            );
    }
}
