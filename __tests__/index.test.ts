import { injectTagsIntoFile } from '../src/injectors/tagInjector';
import * as fs from 'fs';
import * as path from 'path';

const testDirectory = path.join(__dirname, 'fixtures');

describe('injectTagsIntoFile', () => {
    it('should inject hya-component-name and hya-url attributes into a Vue component file', async () => {
        const filePath = path.join(testDirectory, 'TestComponent.vue');
        const framework = 'vue';

        await injectTagsIntoFile(filePath, framework);

        const content = fs.readFileSync(filePath, 'utf-8');
        expect(content).toMatch(/hya-component-name="TestComponent"/);
        expect(content).toMatch(/hya-url="vscode:\/\/file\/\/\/[^"]+"/);
    });

    it('should not inject attributes if they already exist in a Vue component file', async () => {
        const filePath = path.join(testDirectory, 'TestComponentWithAttributes.vue');
        const framework = 'vue';

        await injectTagsIntoFile(filePath, framework);

        const content = fs.readFileSync(filePath, 'utf-8');
        expect(content).toMatch(/hya-component-name="TestComponentWithAttributes"/);
        expect(content).toMatch(/hya-url="vscode:\/\/file\/\/\/[^"]+"/);
    });

    it('should inject hya-component-name and hya-url attributes into a React component file', async () => {
        const filePath = path.join(testDirectory, 'TestComponent.jsx');
        const framework = 'react';

        await injectTagsIntoFile(filePath, framework);

        const content = fs.readFileSync(filePath, 'utf-8');
        expect(content).toMatch(/hya-component-name="TestComponent"/);
        expect(content).toMatch(/hya-url="vscode:\/\/file\/\/\/[^"]+"/);
    });

    it('should not inject attributes if they already exist in a React component file', async () => {
        const filePath = path.join(testDirectory, 'TestComponentWithAttributes.jsx');
        const framework = 'react';

        await injectTagsIntoFile(filePath, framework);

        const content = fs.readFileSync(filePath, 'utf-8');
        expect(content).toMatch(/hya-component-name="TestComponentWithAttributes"/);
        expect(content).toMatch(/hya-url="vscode:\/\/file\/\/\/[^"]+"/);
    });
});
