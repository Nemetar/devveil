import * as fs from 'fs-extra';
import * as path from 'path';
import { Framework } from '../utils/types/framework';

export async function detectFramework(projectRoot: string): Promise<Framework> {
    const packageJsonPath = path.join(projectRoot, 'package.json');
    const packageJson = await fs.readJson(packageJsonPath);

    const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };

    if (dependencies['react']) return 'react';
    if (dependencies['@angular/core']) return 'angular';
    if (dependencies['vue']) return 'vue';
    if (dependencies['svelte']) return 'svelte';

    return 'unknown';
}