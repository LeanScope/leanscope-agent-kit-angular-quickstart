// Creates src/environments/environment.local.ts from the example when it is missing, so a fresh
// clone (and CI) builds without secrets. Never overwrites an existing file.

import { copyFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'environments');
const target = join(dir, 'environment.local.ts');

if (!existsSync(target)) {
  copyFileSync(join(dir, 'environment.local.example.ts'), target);
  console.log(
    'Created src/environments/environment.local.ts. Put your LeanScope token and LLM key there.',
  );
}
