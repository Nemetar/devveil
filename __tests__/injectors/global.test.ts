import { detectFramework } from '../../src/detectors/frameworkDetector';
import * as path from 'path';
import * as fs from 'fs-extra';

const fixturesDir = path.join(__dirname, '..', '__fixtures__');
const projectDirs = fs.readdirSync(fixturesDir);

describe('detectFramework', () => {
  for (const projectDir of projectDirs) {
    const projectPath = path.join(fixturesDir, projectDir);
    it(`should correctly detect framework for ${projectDir}`, async () => {
      const framework = await detectFramework(projectPath);
      expect(framework).not.toBe('unknown');
    });
  }
});
