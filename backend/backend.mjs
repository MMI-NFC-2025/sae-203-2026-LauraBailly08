import PocketBase from 'pocketbase';
const pb = new PocketBase('https://lafanfacomtoise.bailly-laura.fr');

export async function artistesSorted() {
    const records = await pb.collection('artiste').getFullList({ sort: 'date_representation' });
    return records;
}

export async function scenesName() {
    const records = await pb.collection('scene').getFullList({ sort: 'nom_scene' });
    return records;
}

export async function artistesName() {
    const records = await pb.collection('artiste').getFullList({ sort: 'nom_artiste' });
    return records;
}

export async function artisteID(id) {
    const record = await pb.collection('artiste').getOne(id);
    return record;
}

export async function sceneID(id) {
    const record = await pb.collection('scene').getOne(id);
    return record;
}

export async function allartistebysceneId(id) {
    const records = await pb.collection('artiste').getFullList({
        filter: `artiste="${id}"`,
        sort: 'date_representation'
    });
    return records;
}

export async function allartistebysceneName(nom) {
    const scene = await pb.collection('scene').getFirstListItem(`nom_scene="${nom}"`);
    const records = await pb.collection('artiste').getFullList({
        filter: `artiste="${scene.id}"`,
        sort: 'date_representation'
    });
    return records;
}

export async function saveRecord(collection, data, id = null) {
    if (collection !== 'artiste' && collection !== 'scene') {
        throw new Error('Collection non autorisee. Utilisez artiste ou scene.');
    }

    if (id) {
        return pb.collection(collection).update(id, data);
    }

    return pb.collection(collection).create(data);
}