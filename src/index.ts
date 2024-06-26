import { injectGlobalCode } from './injectors/globalCodeInjector';
import { removeGlobalCode } from './removers/globalCodeRemover';
import { traverseDirectory } from './traversers/directoryTraverser';
import { detectFramework } from './detectors/frameworkDetector';
import yargs, { Argv } from 'yargs';
import { hideBin } from 'yargs/helpers';

interface Arguments {
  inject?: boolean;
  remove?: boolean;
  help?: boolean;
}

const argv: Arguments = yargs(hideBin(process.argv))
  .option('inject', {
    alias: 'i',
    description: 'Inject global code and component tags',
    type: 'boolean',
  })
  .option('remove', {
    alias: 'r',
    description: 'Remove global code and component tags',
    type: 'boolean',
  })
  .help()
  .alias('help', 'h').argv as Arguments;

const PROJECT_ROOT = process.cwd();
const EXTENSIONS_TO_TRAVERSE: string[] = ['.html', '.jsx', '.tsx', '.vue', '.svelte'];
const DIRECTORIES_TO_TRAVERSE: string[] = ['src/components', 'src/pages', 'src/views'];

async function main() {
  const framework = await detectFramework(PROJECT_ROOT);

  if (argv.inject) {
    console.log('Injecting global code and component tags...');
    console.log(`Detected framework: ${framework}`);

    await injectGlobalCode(PROJECT_ROOT);

    for (const directory of DIRECTORIES_TO_TRAVERSE) {
      await traverseDirectory(directory, PROJECT_ROOT, framework, EXTENSIONS_TO_TRAVERSE, true);
    }

    console.log('Global code and component tags injected successfully!');
  } else if (argv.remove) {
    console.log('Removing global code and component tags...');

    await removeGlobalCode(PROJECT_ROOT);

    for (const directory of DIRECTORIES_TO_TRAVERSE) {
      await traverseDirectory(directory, PROJECT_ROOT, framework, EXTENSIONS_TO_TRAVERSE, false);
    }

    console.log('Global code and component tags removed successfully!');
  } else {
    console.log('You must specify either --inject or --remove option.');
  }
}

main();

