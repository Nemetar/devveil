const { traverseDirectory } = require('../traversers/directoryTraverser');
import * as path from 'path';
import * as fs from 'fs-extra';
import { readFile } from '../../src/utils/fsOperations';

describe('traverseDirectory', async () => {
    const fixtureDir = path.join(__dirname, '..', '..', '__fixtures__');
    const fixtures = await fs.promises.readdir(fixtureDir);

    for (const fixture of fixtures) {
        const baseDir = path.join(fixtureDir, fixture);
        const directoryPath = path.join(baseDir, 'src', 'components');
        const framework = fixture.split('-')[0];
        const extensionsToTraverse = ['.vue', '.jsx'];

        it(`should traverse the directory and inject the component tags into all supported files for ${framework} project`, async () => {
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
    }
});
