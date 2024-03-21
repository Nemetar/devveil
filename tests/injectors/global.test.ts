const { injectGlobalCode } = require('../injectors/globalCodeInjector');
import * as path from 'path'
import { readFile } from '../../src/utils/fsOperations';

describe('injectGlobalCode', () => {
  it('should inject the global code into the index.html file', async () => {
    const projectRoot = '/path/to/project';
    await injectGlobalCode(projectRoot);

    const indexHtmlPath = path.join(projectRoot, 'index.html');
    const indexHtmlContent = await readFile(indexHtmlPath);

    expect(indexHtmlContent).toMatch(/<style id="devveil-style">[\s\S]*<\/style>/);
    expect(indexHtmlContent).toMatch(/<script id="devveil-script">[\s\S]*<\/script>/);
  });
});
