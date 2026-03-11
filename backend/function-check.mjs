import * as b from './backend.mjs';

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

await test('artisteDetail', async () => {
  if (!firstArtist) throw new Error('Aucun artiste disponible');
  const item = await b.artisteDetail(firstArtist.id);
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

await test('artistesWithScene', async () => {
  const list = await b.artistesWithScene();
  return `count=${list.length}`;
});

await test('formatDateFr', async () => b.formatDateFr('2025-06-27T20:00:00.000Z'));
await test('formatTimeFr', async () => b.formatTimeFr('2025-06-27T20:00:00.000Z'));
await test('formatDayFr', async () => b.formatDayFr('2025-06-27T20:00:00.000Z'));

await test('getArtistesParDate', async () => {
  const list = await b.getArtistesParDate();
  return `count=${list.length}`;
});

await test('getScenesParNom', async () => {
  const list = await b.getScenesParNom();
  return `count=${list.length}`;
});

await test('getArtisteById', async () => {
  if (!firstArtist) throw new Error('Aucun artiste disponible');
  const item = await b.getArtisteById(firstArtist.id);
  if (!item) throw new Error('retour null');
  return `id=${item.id}`;
});

await test('getSceneById', async () => {
  if (!firstScene) throw new Error('Aucune scene disponible');
  const item = await b.getSceneById(firstScene.id);
  if (!item) throw new Error('retour null');
  return `id=${item.id}`;
});

if (runWriteTests) {
  // Tests ecriture explicites uniquement si RUN_WRITE_TESTS=1.
  await test('addArtiste (invalid payload)', async () => {
    await b.addArtiste({});
    return 'unexpected success';
  });

  await test('addScene (invalid payload)', async () => {
    await b.addScene({});
    return 'unexpected success';
  });

  await test('updateArtiste (fake id)', async () => {
    await b.updateArtiste('invalid_id_for_test', { nom_artiste: 'test' });
    return 'unexpected success';
  });

  await test('updateScene (fake id)', async () => {
    await b.updateScene('invalid_id_for_test', { nom_scene: 'test' });
    return 'unexpected success';
  });

  await test('addContact (invalid payload)', async () => {
    await b.addContact({});
    return 'unexpected success';
  });
} else {
  push('write tests', true, 'skip (set RUN_WRITE_TESTS=1 to execute)');
}

console.log(JSON.stringify(results, null, 2));
