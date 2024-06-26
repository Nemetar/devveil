import * as path from 'path';
import * as fs from 'fs-extra';
import { Framework } from "../utils/types/framework";
import { injectTagsIntoFile } from "../injectors/tagInjector";
import { removeTagsFromFile } from '../removers/tagRemover';

export async function traverseDirectory(
    directoryPath: string,
    baseDir: string,
    framework: Framework,
    extensionsToTraverse: string[],
    shouldInject: boolean
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
                await traverseDirectory(file, absoluteDirectoryPath, framework, extensionsToTraverse, shouldInject);
            } else if (stats.isFile() && extensionsToTraverse.includes(path.extname(file))) {
                if (shouldInject) {
                    await injectTagsIntoFile(filePath, framework);
                } else {
                    await removeTagsFromFile(filePath, framework);
                }
            }
        }
    } catch (error) {
        console.error(`Error traversing directory: ${absoluteDirectoryPath}`, error);
    }
}
