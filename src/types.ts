/**
 * Types for the Code Context Memory extension
 */

export interface ContextNote {
    id: string;
    filePath: string;
    lineNumber: number;
    content: string;
    createdAt: number;
    lastViewed?: number;
    tags?: string[];
}

export interface FileContext {
    filePath: string;
    lastAccessed: number;
    notes: ContextNote[];
}
