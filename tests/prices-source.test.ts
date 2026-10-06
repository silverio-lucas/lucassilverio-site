import test from 'node:test';
import assert from 'node:assert/strict';
import {readdirSync, readFileSync, statSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {join, relative} from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap(name => {
    const path = join(dir, name);
    if (name === 'ui') return [];
    return statSync(path).isDirectory() ? walk(path) : [path];
  }).filter(path => /\.tsx?$/.test(path));
}

// Preços vêm de lib/pricing.ts (PRICES + formatBRL). Valor digitado à mão em página ou componente
// vira uma segunda fonte de verdade e acaba divergindo do simulador.
test('pages and components never hard-code a price', () => {
  const offenders: string[] = [];
  for (const path of [...walk(join(root, 'app')), ...walk(join(root, 'components'))]) {
    readFileSync(path, 'utf8').split('\n').forEach((line, index) => {
      if (/^\s*(\/\/|\*|\/\*)/.test(line)) return;
      if (/R\$\s?\d/.test(line)) offenders.push(`${relative(root, path)}:${index + 1}`);
    });
  }
  assert.deepEqual(offenders, []);
});
