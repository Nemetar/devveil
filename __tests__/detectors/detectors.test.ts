const { detectFramework } = require('../detectors/frameworkDetector');
import * as path from 'path';

describe('detectFramework', () => {
    it('should detect Vue framework', async () => {
        const projectRoot = path.join(__dirname, '__fixtures__', 'vue-project');
        const framework = await detectFramework(projectRoot);
        expect(framework).toBe('vue');
    });

    it('should detect React framework', async () => {
        const projectRoot = path.join(__dirname, '__fixtures__', 'react-project');
        const framework = await detectFramework(projectRoot);
        expect(framework).toBe('react');
    });

    it('should detect Svelte framework', async () => {
        const projectRoot = path.join(__dirname, '__fixtures__', 'svelte-project');
        const framework = await detectFramework(projectRoot);
        expect(framework).toBe('svelte');
    });

    it('should detect Angular framework', async () => {
        const projectRoot = path.join(__dirname, '__fixtures__', 'angular-project');
        const framework = await detectFramework(projectRoot);
        expect(framework).toBe('angular');
    });

    it('should return unknown for unsupported framework', async () => {
        const projectRoot = path.join(__dirname, '__fixtures__', 'unknown-project');
        const framework = await detectFramework(projectRoot);
        expect(framework).toBe('unknown');
    });
});

