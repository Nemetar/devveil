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

            await writeFile(filePath, content);
        }
    }
}