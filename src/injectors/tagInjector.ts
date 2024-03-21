import * as path from 'path';
import { readFile, writeFile } from '../utils/fsOperations';
import { Framework } from '../utils/types/framework';

function getComponentNameFromFilePath(filePath: string): string {
    const fileName = path.basename(filePath, path.extname(filePath));
    const match = fileName.match(/([A-Za-z0-9-]+)/);
    return match ? match[1] : '';
}

function getFirstChildElement(content: string): string | null {
    const templateMatch = content.match(/<template[^>]*>([\s\S]*?)<\/template>/);
    const templateContent = templateMatch ? templateMatch[1] : content;
    const tempElement = document.createElement('div');
    tempElement.innerHTML = templateContent;
    const childElement = tempElement.querySelector(':scope > *:not(template, comment)');
    if (childElement) {
        return childElement.tagName.toLowerCase();
    }

    return null;
}


export async function injectTagsIntoFile(filePath: string, framework: Framework): Promise<void> {
    let content = await readFile(filePath);
    const rootElementHasAttributes = content.match(/<[^>]+ hya-component-name=[^>]+ hya-url=[^>]+>/);

    console.log(`Processing file: ${filePath}`);
    console.log(`Root element has attributes: ${rootElementHasAttributes !== null}`);

    if (!rootElementHasAttributes) {
        const componentName = getComponentNameFromFilePath(filePath);

        console.log(`Component name: ${componentName}`);

        if (componentName) {
            let elementRegex;
            if (framework === 'vue') {
                const childElement = getFirstChildElement(content);
                console.log(`First child element: ${childElement}`);
                if (childElement) {
                    elementRegex = new RegExp(`<${childElement}([^>]*)>`, 'g');
                }
            } else {
                elementRegex = new RegExp(`<${componentName}([^>]*)>`, 'g');
            }

            console.log(`Element regex: ${elementRegex}`);

            if (elementRegex) {
                content = content.replace(elementRegex, (match) => {
                    return match.replace('>', ` hya-component-name="${componentName}" hya-url="vscode://file/${path
                        .resolve(filePath)
                        .replace(/\\/g, '/')}">`);
                });

                await writeFile(filePath, content);
            }
        }
    }
}
