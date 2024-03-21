const { traverseDirectory } = require('../traversers/directoryTraverser');
import * as path from 'path';
import * as fs from 'fs-extra';
import { readFile } from '../../src/utils/fsOperations';

describe('traverseDirectory', () => {
    it('should traverse the directory and inject the component tags into all supported files', async () => {
        const directoryPath = '/path/to/directory';
        const baseDir = '/path/to/project';
        const framework = 'vue';
        const extensionsToTraverse = ['.vue', '.jsx'];

        await traverseDirectory(directoryPath, baseDir, framework, extensionsToTraverse);

        const files = await fs.promises.readdir(directoryPath);
        for (const file of files) {
            if (extensionsToTraverse.includes(path.extname(file))) {
                const filePath = path.join(directoryPath, file);
                const content = await readFile(filePath);
                expect(content).toMatch(/hya-component-name="[^"]+"/);
                expect(content).toMatch(/hya-url="[^"]+"/);
            }
        }
    });
});
