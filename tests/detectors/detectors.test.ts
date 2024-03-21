const { detectFramework } = require('../detectors/frameworkDetector');

describe('detectFramework', () => {
    it('should return "vue" for a Vue project', async () => {
        const projectRoot = '/path/to/vue/project';
        const framework = await detectFramework(projectRoot);
        expect(framework).toBe('vue');
    });

    it('should return "react" for a React project', async () => {
        const projectRoot = '/path/to/react/project';
        const framework = await detectFramework(projectRoot);
        expect(framework).toBe('react');
    });

    it('should return "unknown" for a project without a supported framework', async () => {
        const projectRoot = '/path/to/unknown/project';
        const framework = await detectFramework(projectRoot);
        expect(framework).toBe('unknown');
    });
});
