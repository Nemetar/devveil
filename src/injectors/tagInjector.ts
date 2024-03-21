import path from 'path';
import { readFile, writeFile } from '../utils/fsOperations';
import { Framework } from '../utils/types/framework';

function getComponentNameFromTag(tag: string): string | null {
    const match = tag.match(/<([A-Za-z0-9-]+)/);
    return match ? match[1] : null;
}

export async function injectTagsIntoFile(filePath: string, framework: Framework): Promise<void> {
    let content = await readFile(filePath);
    const rootElementHasAttributes = content.match(/<[^>]+ hya-component-name=[^>]+ hya-url=[^>]+>/);

    if (!rootElementHasAttributes) {
        const componentName = getComponentNameFromTag(content);

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
