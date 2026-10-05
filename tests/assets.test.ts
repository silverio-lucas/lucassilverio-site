import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync, readdirSync, readFileSync, statSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {join} from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));

// Toda imagem local citada em um componente precisa existir em public/.
// O hero já chegou a apontar para arquivos que nunca foram versionados e a foto não aparecia.
test('local images referenced by components exist in public/', () => {
  const dir = join(root, 'components');
  const files = readdirSync(dir).filter(name => name.endsWith('.tsx'));
  const pattern = /["'`\s](\/[\w./-]+\.(?:avif|webp|png|jpe?g|svg|gif))\b/g;
  const missing: string[] = [];
  let found = 0;
  for (const file of files) {
    const source = readFileSync(join(dir, file), 'utf8');
    for (const match of source.matchAll(pattern)) {
      found += 1;
      if (!existsSync(join(root, 'public', match[1]))) missing.push(`${file}: ${match[1]}`);
    }
  }
  assert.ok(found >= 4, 'esperava encontrar as imagens do hero e do Sobre');
  assert.deepEqual(missing, []);
});

test('hero photo variants exist and stay light', () => {
  const sizes = {'lucas-silverio-960.webp': 200, 'lucas-silverio-1440.webp': 300, 'lucas-silverio-avatar.webp': 60};
  for (const [name, maxKb] of Object.entries(sizes)) {
    const bytes = statSync(join(root, 'public', name)).size;
    assert.ok(bytes > 1024 && bytes < maxKb * 1024, `${name}: ${Math.round(bytes / 1024)} KB`);
  }
});
