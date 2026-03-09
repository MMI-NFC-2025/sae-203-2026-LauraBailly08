import PocketBase from 'pocketbase';

const pb = new PocketBase('http://https://lafanfacomtoise.bailly-laura.fr/_/');

export async function getArtistesParDate() {
    return await pb.collection('artiste').getFullList({
        sort: 'date_representation',
    });
}

export async function getScenesParNom() {
    return await pb.collection('scene').getFullList({
        sort: 'nom_scene',
    });
}

export async function getArtistesParNom() {
    return await pb.collection('artiste').getFullList({
        sort: 'nom_artiste',
    });
}

export async function getArtisteById(id) {
    return await pb.collection('artiste').getOne(id);
}
 
export async function getSceneById(id) {
    return await pb.collection('scene').getOne(id);
}

export async function getArtistesParSceneId(idScene) {
    return await pb.collection('artiste').getFullList({
        filter: `id_scene = "${idScene}"`, 
        sort: 'date_representation',
    });
}

export async function getArtistesParNomScene(nomScene) {
    const recordScene = await pb.collection('scene').getFirstListItem(`nom_scene="${nomScene}"`);
    return await pb.collection('artiste').getFullList({
        filter: `id_scene = "${recordScene.id}"`,
        sort: 'date_representation',
    });
}

export async function saveRecord(collection, data) {
    if (data.id) {
        return await pb.collection(collection).update(data.id, data);
    } else {
        return await pb.collection(collection).create(data);
    }
}