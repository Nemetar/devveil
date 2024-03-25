const { injectTagsIntoFile } = require('../injectors/tagInjector');
const { readFile, writeFile } = require('../../src/utils/fsOperations');
const path = require('path');
const fs = require('fs');

const getComponentFiles = (directory) => {
    return fs.readdirSync(directory).filter((file) => {
        const extname = path.extname(file);
        return ['vue', 'jsx', 'svelte', 'js'].includes(extname.substring(1));
    });
};

describe('injectTagsIntoFile', () => {
    const fixtureDirectory = path.join(__dirname, '..', '..', '__fixtures__');
    const projectDirectories = fs.readdirSync(fixtureDirectory);

    projectDirectories.forEach((projectDirectory) => {
        const projectPath = path.join(fixtureDirectory, projectDirectory);
        const componentFiles = getComponentFiles(projectPath);

        componentFiles.forEach((componentFile) => {
            const filePath = path.join(projectPath, componentFile);
            const framework = projectDirectory.split('-')[0];

            it(`should inject the component tags into a ${framework} component file`, async () => {
                await injectTagsIntoFile(filePath, framework);

                const content = await readFile(filePath);
                expect(content).toMatch(/hya-component-name="[^"]+"/);
                expect(content).toMatch(/hya-url="[^"]+"/);
            });

            it(`should do nothing if the ${framework} component already has the tags`, async () => {
                let content = await readFile(filePath);
                content = content.replace('>', ' hya-component-name="ComponentName" hya-url="vscode://file/path/to/component.vue">');
                await writeFile(filePath, content);

                await injectTagsIntoFile(filePath, framework);

                const newContent = await readFile(filePath);
                expect(newContent).toBe(content);
            });
        });
    });
});
