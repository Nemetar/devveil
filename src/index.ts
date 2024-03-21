import * as fs from 'fs-extra';
import * as path from 'path';

const css = `
.hya-highlighted {
  border: 2px solid red !important;
  position: relative;
}

.hya-tooltip {
  position: absolute;
  background-color: white;
  color: black;
  border: 1px solid black;
  padding: 4px;
  top: -40px;
  left: 0;
  white-space: nowrap;
  z-index: 1000;
  font-size: 12px;
}
`;

const js = `
document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll('[hya-component-name]');

  elements.forEach(el => {
    const handleMouseOver = (e) => {
      const componentName = el.getAttribute('hya-component-name');
      const vscodeUrl = el.getAttribute('hya-url');

      el.classList.add('hya-highlighted');

      const tooltip = document.createElement('div');
      tooltip.classList.add('hya-tooltip');
      tooltip.innerText = \`\${componentName} \n [Open in VS Code](\${vscodeUrl})\`;
      el.appendChild(tooltip);
    };

    const handleMouseOut = () => {
      el.classList.remove('hya-highlighted');
      const tooltip = el.querySelector('.hya-tooltip');
      tooltip && el.removeChild(tooltip);
    };

    el.addEventListener('mouseover', handleMouseOver);
    el.addEventListener('mouseout', handleMouseOut);
  });
});
`;

type Framework = 'react' | 'angular' | 'vue' | 'svelte' | 'unknown';

async function injectGlobalCode(projectRoot: string): Promise<void> {
  const indexFilePath = path.join(projectRoot, 'index.html');
  let content = await fs.readFile(indexFilePath, 'utf-8');

  if (!content.includes('hya-highlighted')) {
    const newContent = content.replace(
      '</head>',
      `
        <style id="devveil-style">${css}</style>
        <script id="devveil-script">${js}</script>
      </head>`
    );
    await fs.writeFile(indexFilePath, newContent, 'utf-8');
  }
}

function getComponentNameFromTag(tag: string): string | null {
  const match = tag.match(/<([A-Za-z0-9-]+)/);
  return match ? match[1] : null;
}

async function injectTagsIntoFile(filePath: string, framework: Framework): Promise<void> {
  let content = await fs.readFile(filePath, 'utf-8');
  const rootElementHasAttributes = content.match(/<[^>]+ hya-component-name=[^>]+ hya-url=[^>]+>/);

  if (!rootElementHasAttributes) {
    const componentName = getComponentNameFromTag(content);

    if (componentName) {
      if (framework === 'vue') {
        const childElementMatch = content.match(/<template[^>]*>([\s\S]*?)<\/template>/);
        const childElement = childElementMatch ? childElementMatch[1].trim() : '';
        const childElementIsTemplate = childElement.startsWith('<template');

        if (!childElementIsTemplate) {
          const childElementRegex = new RegExp(`<${childElement.split(' ')[0]}([^>]*)>`, 'g');
          content = content.replace(childElementRegex, (match) => {
            return match.replace('>', ` hya-component-name="${componentName}" hya-url="vscode://file/${path
              .resolve(filePath)
              .replace(/\\/g, '/')}">`);
          });
        } else {
          const nonTemplateChildElementMatch = childElement.match(/<([^>\s]+)(?:\s[^>]*)?>/);
          const nonTemplateChildElement = nonTemplateChildElementMatch ? nonTemplateChildElementMatch[1] : '';
          if (nonTemplateChildElement) {
            const nonTemplateChildElementRegex = new RegExp(`<${nonTemplateChildElement}([^>]*)>`, 'g');
            content = content.replace(nonTemplateChildElementRegex, (match) => {
              return match.replace('>', ` hya-component-name="${componentName}" hya-url="vscode://file/${path
                .resolve(filePath)
                .replace(/\\/g, '/')}">`);
            });
          }
        }
      } else {
        const regex = new RegExp(`<${componentName}([^>]*)>`, 'g');
        content = content.replace(regex, (match) => {
          return match.replace('>', ` hya-component-name="${componentName}" hya-url="vscode://file/${path
            .resolve(filePath)
            .replace(/\\/g, '/')}">`);
        });
      }

      await fs.writeFile(filePath, content, 'utf-8');
    }
  }
}

async function traverseDirectory(
  directoryPath: string,
  baseDir: string,
  framework: Framework,
  extensionsToTraverse: string[]
): Promise<void> {
  const absoluteDirectoryPath = path.join(baseDir, directoryPath);

  if (!(await fs.pathExists(absoluteDirectoryPath))) {
    console.warn(`Invalid or non-existent directory: ${absoluteDirectoryPath}, skipping.`);
    return;
  }

  try {
    const files = await fs.readdir(absoluteDirectoryPath);

    for (const file of files) {
      const filePath = path.join(absoluteDirectoryPath, file);
      const stats = await fs.stat(filePath);

      if (stats.isDirectory()) {
        await traverseDirectory(file, absoluteDirectoryPath, framework, extensionsToTraverse);
      } else if (stats.isFile() && extensionsToTraverse.includes(path.extname(file))) {
        await injectTagsIntoFile(filePath, framework);
      }
    }
  } catch (error) {
    console.error(`Error traversing directory: ${absoluteDirectoryPath}`, error);
  }
}

async function detectFramework(projectRoot: string): Promise<Framework> {
  const packageJsonPath = path.join(projectRoot, 'package.json');
  const packageJson = await fs.readJson(packageJsonPath);

  const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };

  if (dependencies['react']) return 'react';
  if (dependencies['@angular/core']) return 'angular';
  if (dependencies['vue']) return 'vue';
  if (dependencies['svelte']) return 'svelte';

  return 'unknown';
}

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
