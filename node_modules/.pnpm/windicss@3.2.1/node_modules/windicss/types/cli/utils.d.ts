import glob from 'glob';
export declare function globArray(patterns: string[], options?: glob.IOptions): string[];
export declare function getVersion(): string;
export declare function fuzzy(content: string): string[];
export declare function generateTemplate(folder: string, outputPath?: string): {
    html: string;
    css: string;
};
