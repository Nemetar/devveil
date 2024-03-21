import * as fs from 'fs-extra';
import * as path from 'path';

export async function readFile(filePath: string): Promise<string> {
    return await fs.readFile(filePath, 'utf-8');
}

export async function writeFile(filePath: string, content: string): Promise<void> {
    await fs.writeFile(filePath, content, 'utf-8');
}