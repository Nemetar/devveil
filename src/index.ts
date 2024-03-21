import { injectGlobalCode } from './injectors/globalCodeInjector';
import { traverseDirectory } from './traversers/directoryTraverser';
import { detectFramework } from './detectors/frameworkDetector';

(async () => {
  const EXTENSIONS_TO_TRAVERSE: string[] = ['.html', '.jsx', '.tsx', '.vue', '.svelte'];
  const DIRECTORIES_TO_TRAVERSE: string[] = ['src/components', 'src/pages', 'src/views'];
  const PROJECT_ROOT = process.cwd();

  const framework = await detectFramework(PROJECT_ROOT);
  console.log(`Detected framework: ${framework}`);

  await injectGlobalCode(PROJECT_ROOT);

  for (const directory of DIRECTORIES_TO_TRAVERSE) {
    await traverseDirectory(directory, PROJECT_ROOT, framework, EXTENSIONS_TO_TRAVERSE);
  }
})();
