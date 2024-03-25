import * as path from 'path';
import { readFile, writeFile } from '../utils/fsOperations';
import { Framework } from '../utils/types/framework';

function getComponentNameFromFilePath(filePath: string): string {
    const fileName = path.basename(filePath, path.extname(filePath));
    const match = fileName.match(/([A-Za-z0-9-]+)/);
    return match ? match[1] : '';
}

export async function removeTagsFromFile(filePath: string, framework: Framework): Promise<void> {
    let content = await readFile(filePath);

    console.log(`Processing file: ${filePath}`);

    const componentName = getComponentNameFromFilePath(filePath);

    console.log(`Component name: ${componentName}`);

    if (componentName) {
        let elementRegex;
        if (framework === 'vue') {
            elementRegex = new RegExp(`<[^>]+ hya-component-name="${componentName}" hya-url="[^"]+"`, 'g');
        } else {
            elementRegex = new RegExp(`<${componentName}[^>]+ hya-component-name="${componentName}" hya-url="[^"]+"`, 'g');
        }

        console.log(`Element regex: ${elementRegex}`);

        if (elementRegex) {
            content = content.replace(elementRegex, (match) => {
                const attributes = match.match(/ hya-component-name="[^"]+" hya-url="[^"]+"/);
                if (attributes) {
                    return match.replace(attributes[0], '');
                }
                return match;
            });

            await writeFile(filePath, content);
        }
    }
}
