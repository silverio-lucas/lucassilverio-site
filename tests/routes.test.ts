import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync, readdirSync, readFileSync, statSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {join, relative, sep} from 'node:path';
import sitemap from '../app/sitemap.ts';
import robots from '../app/robots.ts';

const root = fileURLToPath(new URL('../', import.meta.url));

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap(name => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  }).filter(path => /\.tsx?$/.test(path));
}

const sources = [...walk(join(root, 'components')), ...walk(join(root, 'app'))].map(path => ({path, text: readFileSync(path, 'utf8')}));
const routeExists = (path: string) => existsSync(join(root, 'app', path === '/' ? '' : path.slice(1), 'page.tsx'));

// Rotas = pastas de app/ com page.tsx.
const pageRoutes = walk(join(root, 'app'))
  .filter(path => path.endsWith(`${sep}page.tsx`))
  .map(path => '/' + relative(join(root, 'app'), path).replace(/page\.tsx$/, '').split(sep).join('/').replace(/\/$/, ''))
  .map(route => (route === '/' ? '/' : route.replace(/\/$/, '')))
  .sort();

test('every internal link points to a page that exists', () => {
  const pattern = /href(?:=|:)\s*\{?\s*["'`](\/[a-z0-9\-/]*)/g;
  let found = 0;
  const broken: string[] = [];
  for (const {path, text} of sources) {
    for (const match of text.matchAll(pattern)) {
      found += 1;
      if (!routeExists(match[1])) broken.push(`${relative(root, path)}: ${match[1]}`);
    }
  }
  assert.ok(found >= 10, `poucos links encontrados: ${found}`);
  assert.deepEqual(broken, []);
});

test('every anchor link points to an id that exists', () => {
  const ids = new Set(sources.flatMap(({text}) => [...text.matchAll(/\bid="([a-z0-9-]+)"/g)].map(match => match[1])));
  const missing: string[] = [];
  for (const {path, text} of sources) {
    const anchors = [...text.matchAll(/["'`]\/#([a-z0-9-]+)/g), ...text.matchAll(/href="#([a-z0-9-]+)"/g)].map(match => match[1]);
    for (const anchor of anchors) if (!ids.has(anchor)) missing.push(`${relative(root, path)}: #${anchor}`);
  }
  assert.deepEqual(missing, []);
});

test('sitemap lists exactly the pages the site has, on the site domain', () => {
  const entries = sitemap();
  const paths = entries.map(entry => new URL(entry.url).pathname.replace(/\/$/, '') || '/').sort();
  assert.deepEqual(paths, pageRoutes);
  assert.equal(new Set(entries.map(entry => new URL(entry.url).origin)).size, 1);
  assert.match(robots().sitemap as string, /\/sitemap\.xml$/);
});
