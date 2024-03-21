import { css } from '../utils/css';
import { js } from '../utils/js';
import * as path from 'path';
import { readFile, writeFile } from '../utils/fsOperations';

export async function injectGlobalCode(projectRoot: string): Promise<void> {
    const indexFilePath = path.join(projectRoot, 'index.html');
    let content = await readFile(indexFilePath);

    if (!content.includes('hya-highlighted')) {
        const newContent = content.replace(
            '</head>',
            `
          <style id="devveil-style">${css}</style>
          <script id="devveil-script">${js}</script>
        </head>`
        );
        await writeFile(indexFilePath, newContent);
    }
}