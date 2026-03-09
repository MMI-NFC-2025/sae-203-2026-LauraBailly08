import PocketBase from 'pocketbase';

const pb = new PocketBase('https://lafanfacomtoise.bailly-laura.fr/_/');

export async function getArtistesParDate() {
    try {
        return await pb.collection('artiste').getFullList({
            sort: '+date_representation',
        });
    } catch (error) {
        console.error('Erreur getArtistesParDate:', error);
        return [];
    }
}

export async function getScenesParNom() {
    try {
        return await pb.collection('scene').getFullList({
            sort: '+nom_scene',
        });
    } catch (error) {
        console.error('Erreur getScenesParNom:', error);
        return [];
    }
}

export async function getArtistesParNom() {
    try {
        return await pb.collection('artiste').getFullList({
            sort: '+nom_artiste',
        });
    } catch (error) {
        console.error('Erreur getArtistesParNom:', error);
        return [];
    }
}

export async function getArtisteById(id: string) {
    try {
        return await pb.collection('artiste').getOne(id);
    } catch (error) {
        console.error('Erreur getArtisteById:', error);
        return null;
    }
}

export async function getSceneById(id: string) {
    try {
        return await pb.collection('scene').getOne(id);
    } catch (error) {
        console.error('Erreur getSceneById:', error);
        return null;
    }
}
