const { injectTagsIntoFile } = require('../injectors/tagInjector');
import { readFile, writeFile } from '../../src/utils/fsOperations';

describe('injectTagsIntoFile', () => {
    it('should inject the component tags into a Vue component file', async () => {
        const filePath = '/path/to/component.vue';
        const framework = 'vue';

        await injectTagsIntoFile(filePath, framework);

        const content = await readFile(filePath);
        expect(content).toMatch(/hya-component-name="[^"]+"/);
        expect(content).toMatch(/hya-url="[^"]+"/);
    });

    it('should inject the component tags into a React component file', async () => {
        const filePath = '/path/to/component.jsx';
        const framework = 'react';

        await injectTagsIntoFile(filePath, framework);

        const content = await readFile(filePath);
        expect(content).toMatch(/hya-component-name="[^"]+"/);
        expect(content).toMatch(/hya-url="[^"]+"/);
    });

    it('should do nothing if the component already has the tags', async () => {
        const filePath = '/path/to/component.vue';
        const framework = 'vue';

        let content = await readFile(filePath);
        content = content.replace('>', ' hya-component-name="ComponentName" hya-url="vscode://file/path/to/component.vue">');
        await writeFile(filePath, content);

        await injectTagsIntoFile(filePath, framework);

        const newContent = await readFile(filePath);
        expect(newContent).toBe(content);
    });
});
