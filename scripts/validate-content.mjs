import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const docsRoot = path.join(process.cwd(), 'src/content/docs');
const required = ['title', 'description'];
const allowedDifficulty = new Set(['Beginner', 'Intermediate', 'Advanced']);

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        return walk(fullPath);
      }
      return fullPath.endsWith('.mdx') || fullPath.endsWith('.md') ? [fullPath] : [];
    })
  );
  return files.flat();
}

function getFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  return match?.[1] ?? '';
}

function hasField(frontmatter, field) {
  const pattern = new RegExp(`^${field}:\\s+.+$`, 'm');
  return pattern.test(frontmatter);
}

function getField(frontmatter, field) {
  const pattern = new RegExp(`^${field}:\\s+(.+)$`, 'm');
  const match = frontmatter.match(pattern);
  return match ? match[1].trim() : undefined;
}

async function main() {
  const files = await walk(docsRoot);
  const failures = [];

  for (const file of files) {
    const content = await readFile(file, 'utf8');
    const frontmatter = getFrontmatter(content);

    if (!frontmatter) {
      failures.push(`${file}: missing frontmatter block`);
      continue;
    }

    for (const key of required) {
      if (!hasField(frontmatter, key)) {
        failures.push(`${file}: missing required '${key}' field`);
      }
    }

    const difficulty = getField(frontmatter, 'difficulty');
    if (difficulty && !allowedDifficulty.has(difficulty)) {
      failures.push(`${file}: invalid difficulty '${difficulty}'`);
    }
  }

  if (failures.length > 0) {
    console.error('Content validation failed:\n');
    for (const item of failures) {
      console.error(`- ${item}`);
    }
    process.exit(1);
  }

  console.log(`Validated ${files.length} content files successfully.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
