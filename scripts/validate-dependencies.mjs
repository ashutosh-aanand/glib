import { readFile } from 'node:fs/promises';

const blockedDependencies = ['react-chords'];

async function main() {
  const raw = await readFile(new URL('../package.json', import.meta.url), 'utf8');
  const pkg = JSON.parse(raw);

  const deps = { ...(pkg.dependencies ?? {}), ...(pkg.devDependencies ?? {}) };
  const found = blockedDependencies.filter((name) => name in deps);

  if (found.length > 0) {
    console.error('Dependency validation failed. Blocked packages detected:');
    for (const dep of found) {
      console.error(`- ${dep}`);
    }
    process.exit(1);
  }

  console.log('Dependency validation passed.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
