import * as b from '../../backend/backend.mjs';

const results = [];
const push = (name, ok, info) => results.push({ name, ok, info });

let firstArtist = null;
let firstScene = null;
const runWriteTests = process.env.RUN_WRITE_TESTS === '1';

async function test(name, fn) {
  try {
    const info = await fn();
    push(name, true, info ?? 'ok');
  } catch (error) {
    push(name, false, error?.message || String(error));
  }
}

await test('artistesSorted', async () => {
  const list = await b.artistesSorted();
  firstArtist = list[0] || null;
  return `count=${list.length}`;
});

await test('scenesName', async () => {
  const list = await b.scenesName();
  firstScene = list[0] || null;
  return `count=${list.length}`;
});

await test('artistesName', async () => {
  const list = await b.artistesName();
  return `count=${list.length}`;
});

await test('artisteID', async () => {
  if (!firstArtist) throw new Error('Aucun artiste disponible');
  const item = await b.artisteID(firstArtist.id);
  return `id=${item.id}`;
});

await test('sceneID', async () => {
  if (!firstScene) throw new Error('Aucune scene disponible');
  const item = await b.sceneID(firstScene.id);
  return `id=${item.id}`;
});

await test('allartistebysceneId', async () => {
  if (!firstScene) throw new Error('Aucune scene disponible');
  const list = await b.allartistebysceneId(firstScene.id);
  return `count=${list.length}`;
});

await test('allartistebysceneName', async () => {
  if (!firstScene) throw new Error('Aucune scene disponible');
  const sceneName = firstScene.nom_scene || firstScene.nom;
  const list = await b.allartistebysceneName(sceneName);
  return `count=${list.length}`;
});

if (runWriteTests) {
  await test('saveRecord (update artiste)', async () => {
    if (!firstArtist) throw new Error('Aucun artiste disponible');
    const item = await b.saveRecord('artiste', { nom_artiste: 'Test Check' }, firstArtist.id);
    return `id=${item.id}`;
  });
} else {
  push('write tests', true, 'skip (set RUN_WRITE_TESTS=1 to execute)');
}

console.log(JSON.stringify(results, null, 2));
