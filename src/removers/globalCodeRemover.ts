import * as path from 'path';
import { readFile, writeFile } from '../utils/fsOperations';

export async function removeGlobalCode(projectRoot: string): Promise<void> {
    const indexFilePath = path.join(projectRoot, 'index.html');
    let content = await readFile(indexFilePath);

    const styleTagRegex = /<style[^>]*id="devveil-style"[^>]*>[\s\S]*<\/style>/gi;
    const scriptTagRegex = /<script[^>]*id="devveil-script"[^>]*>[\s\S]*<\/script>/gi;

    content = content.replace(styleTagRegex, '');
    content = content.replace(scriptTagRegex, '');

    await writeFile(indexFilePath, content);
}
