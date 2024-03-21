import * as path from 'path';
import { readFile, writeFile } from '../utils/fsOperations';
import { Framework } from '../utils/types/framework';

function getComponentNameFromFilePath(filePath: string): string {
    const fileName = path.basename(filePath, path.extname(filePath));
    const match = fileName.match(/([A-Za-z0-9-]+)/);
    return match ? match[1] : '';
}

export async function injectTagsIntoFile(filePath: string, framework: Framework): Promise<void> {
    let content = await readFile(filePath);
    const rootElementHasAttributes = content.match(/<[^>]+ hya-component-name=[^>]+ hya-url=[^>]+>/);

    if (!rootElementHasAttributes) {
        const componentName = getComponentNameFromFilePath(filePath);

        if (componentName) {
            let elementRegex;
            if (framework === 'vue') {
                const childElementMatch = content.match(/<(?!template\b)[^>\s]+/);
                const childElement = childElementMatch ? childElementMatch[0] : '';
                elementRegex = new RegExp(`<${childElement}([^>]*)>`, 'g');
            } else {
                elementRegex = new RegExp(`<${componentName}([^>]*)>`, 'g');
            }

            content = content.replace(elementRegex, (match) => {
                return match.replace('>', ` hya-component-name="${componentName}" hya-url="vscode://file/${path
                    .resolve(filePath)
                    .replace(/\\/g, '/')}">`);
            });

            await writeFile(filePath, content);
        }
    }
}
