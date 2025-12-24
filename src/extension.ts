import * as vscode from 'vscode';
import { StorageManager } from './storage';
import { NoteManager } from './noteManager';
import { NoteDecorationProvider } from './decorations';
import { ContextHoverProvider, ContextStatusBar } from './hoverProvider';
import { NotesTreeProvider } from './treeView';
import { ContextResurfacer } from './resurfacer';

export function activate(context: vscode.ExtensionContext) {
    console.log('Code Context Memory extension is now active!');

    // Initialize managers
    const storage = new StorageManager(context);
    const noteManager = new NoteManager(storage);
    const decorationProvider = new NoteDecorationProvider(storage);
    const statusBar = new ContextStatusBar(storage);
    const treeProvider = new NotesTreeProvider(storage);
    const resurfacer = new ContextResurfacer(storage);

    // Register tree view
    const treeView = vscode.window.createTreeView('codeContextMemory.notesView', {
        treeDataProvider: treeProvider,
    });

    // Register hover provider for all languages
    const hoverProvider = vscode.languages.registerHoverProvider(
        { scheme: 'file' },
        new ContextHoverProvider(storage)
    );

    // Start context resurfacing
    resurfacer.start();

    // Register commands
    const addNoteCommand = vscode.commands.registerCommand(
        'codeContextMemory.addNote',
        async () => {
            await noteManager.addNoteAtCursor();
            updateUI();
        }
    );

    const viewNotesCommand = vscode.commands.registerCommand(
        'codeContextMemory.viewNotes',
        async () => {
            await noteManager.viewNotesForCurrentFile();
        }
    );

    const deleteNoteCommand = vscode.commands.registerCommand(
        'codeContextMemory.deleteNote',
        async () => {
            await noteManager.deleteNoteAtCursor();
            updateUI();
        }
    );

    const refreshTreeCommand = vscode.commands.registerCommand(
        'codeContextMemory.refreshTree',
        () => {
            treeProvider.refresh();
        }
    );

    const openNoteCommand = vscode.commands.registerCommand(
        'codeContextMemory.openNote',
        async (note) => {
            const document = await vscode.workspace.openTextDocument(note.filePath);
            const editor = await vscode.window.showTextDocument(document);
            const position = new vscode.Position(note.lineNumber, 0);
            editor.selection = new vscode.Selection(position, position);
            editor.revealRange(
                new vscode.Range(position, position),
                vscode.TextEditorRevealType.InCenter
            );
            await storage.updateNote(note.id, { lastViewed: Date.now() });
        }
    );

    const showFileContextCommand = vscode.commands.registerCommand(
        'codeContextMemory.showFileContext',
        async () => {
            await noteManager.viewNotesForCurrentFile();
        }
    );

    const showStaleNotesCommand = vscode.commands.registerCommand(
        'codeContextMemory.showStaleNotes',
        async () => {
            await resurfacer.showStaleNotes();
        }
    );

    // Update UI when editor changes
    const updateUI = () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            decorationProvider.updateDecorations(editor);
            statusBar.updateForFile(editor.document.uri.fsPath);
            storage.recordFileAccess(editor.document.uri.fsPath);
        }
        treeProvider.refresh();
    };

    // Listen for editor changes
    const onDidChangeActiveTextEditor = vscode.window.onDidChangeActiveTextEditor(
        (editor) => {
            if (editor) {
                updateUI();
            }
        }
    );

    const onDidChangeTextDocument = vscode.workspace.onDidChangeTextDocument(
        (event) => {
            const editor = vscode.window.activeTextEditor;
            if (editor && event.document === editor.document) {
                decorationProvider.updateDecorations(editor);
            }
        }
    );

    // Initial update
    updateUI();

    // Register disposables
    context.subscriptions.push(
        addNoteCommand,
        viewNotesCommand,
        deleteNoteCommand,
        refreshTreeCommand,
        openNoteCommand,
        showFileContextCommand,
        showStaleNotesCommand,
        hoverProvider,
        treeView,
        onDidChangeActiveTextEditor,
        onDidChangeTextDocument,
        decorationProvider,
        statusBar
    );
}

export function deactivate() {
    console.log('Code Context Memory extension is now deactivated');
}
