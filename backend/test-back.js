import {artistesSorted, scenesName, artistesName, artisteID, sceneID, allartistebysceneId, allartistebysceneName, addArtiste, addScene, updateArtiste, updateScene} from './backend.mjs';

const results = [];

function addResult(name, ok, details) {
    results.push({ name, ok, details });
}

async function runTest(name, fn) {
    try {
        const details = await fn();
        addResult(name, true, details || 'ok');
    } catch (error) {
        addResult(name, false, error?.message || String(error));
    }
}

function assertSorted(items, field) {
    for (let i = 1; i < items.length; i += 1) {
        const prev = String(items[i - 1]?.[field] || '').toLocaleLowerCase('fr');
        const curr = String(items[i]?.[field] || '').toLocaleLowerCase('fr');
        if (prev > curr) {
            throw new Error(`Tri invalide sur ${field} a l index ${i}`);
        }
    }
}

function assertSortedDate(items, field) {
    for (let i = 1; i < items.length; i += 1) {
        const prev = new Date(items[i - 1]?.[field] || 0).getTime();
        const curr = new Date(items[i]?.[field] || 0).getTime();
        if (Number.isFinite(prev) && Number.isFinite(curr) && prev > curr) {
            throw new Error(`Tri date invalide sur ${field} a l index ${i}`);
        }
    }
}

let firstArtist = null;
let firstScene = null;

await runTest('1) Liste artistes tries par date', async () => {
    const list = await artistesSorted();
    firstArtist = list[0] || null;
    assertSortedDate(list, 'date_representation');
    return `count=${list.length}`;
});

await runTest('2) Liste scenes triees par nom', async () => {
    const list = await scenesName();
    firstScene = list[0] || null;
    assertSorted(list, 'nom_scene');
    return `count=${list.length}`;
});

await runTest('3) Liste artistes tries alphabetiquement', async () => {
    const list = await artistesName();
    assertSorted(list, 'nom_artiste');
    return `count=${list.length}`;
});

await runTest('4) Infos artiste par id', async () => {
    if (!firstArtist?.id) throw new Error('Aucun artiste disponible');
    const artist = await artisteID(firstArtist.id);
    if (!artist?.id) throw new Error('Structure artiste invalide');
    return `id=${artist.id}`;
});

await runTest('5) Infos scene par id', async () => {
    if (!firstScene?.id) throw new Error('Aucune scene disponible');
    const scene = await sceneID(firstScene.id);
    if (!scene?.id) throw new Error('Structure scene invalide');
    return `id=${scene.id}`;
});

await runTest('6) Artistes d une scene par id tries par date', async () => {
    if (!firstScene?.id) throw new Error('Aucune scene disponible');
    const list = await allartistebysceneId(firstScene.id);
    assertSortedDate(list, 'date_representation');
    return `count=${list.length}`;
});

await runTest('7) Artistes d une scene par nom tries par date', async () => {
    if (!firstScene?.nom_scene) throw new Error('Nom de scene indisponible');
    const list = await allartistebysceneName(firstScene.nom_scene);
    assertSortedDate(list, 'date_representation');
    return `count=${list.length}`;
});

await runTest('8) Ajout ou modification artiste/scene via une seule fonction', async () => {
    const canWrite = process.env.RUN_WRITE_TESTS === '1';
    if (!canWrite) return 'skip (set RUN_WRITE_TESTS=1 pour tester ecriture)';

    if (!firstArtist?.id) throw new Error('Aucun artiste disponible');

    const updated = await saveRecord('artiste', { nom_artiste: 'Test Backend Consigne' }, firstArtist.id);
    if (!updated?.id) throw new Error('Modification via saveRecord invalide');
    return `updatedId=${updated.id}`;
});

console.log(JSON.stringify(results, null, 2));

