import PocketBase from 'pocketbase';

const POCKETBASE_URL = 'https://lafanfacomtoise.bailly-laura.fr';
export const pb = new PocketBase(POCKETBASE_URL);

export type ArtisteRecord = {
    id: string;
    collectionId: string;
    nom_artiste?: string;
    genre_musical?: string;
    descritpion?: string;
    date_representation?: string;
    photo_principal?: string;
    galerie_photo?: string[];
};

export type SceneRecord = {
    id: string;
    collectionId: string;
    nom_scene?: string;
    description_scene?: string;
    localisation?: string;
    capacite?: string;
    photo_scene?: string;
};

export function getRecordFileUrl(record: { [key: string]: unknown }, fileName?: string) {
    if (!fileName) return '';
    return pb.files.getURL(record, fileName);
}

export function formatDateFr(date?: string) {
    if (!date) return 'Date a confirmer';
    const parsed = new Date(date);
    if (Number.isNaN(parsed.getTime())) return 'Date invalide';

    return new Intl.DateTimeFormat('fr-FR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    }).format(parsed);
}

export function formatTimeFr(date?: string) {
    if (!date) return 'Heure a confirmer';
    const parsed = new Date(date);
    if (Number.isNaN(parsed.getTime())) return 'Heure invalide';

    return new Intl.DateTimeFormat('fr-FR', {
        hour: '2-digit',
        minute: '2-digit',
    }).format(parsed);
}

export function formatDayFr(date?: string) {
    if (!date) return 'Jour a confirmer';
    const parsed = new Date(date);
    if (Number.isNaN(parsed.getTime())) return 'Jour invalide';

    return new Intl.DateTimeFormat('fr-FR', {
        weekday: 'long',
    }).format(parsed);
}

export async function getArtistesParDate() {
    try {
        return await pb.collection('artiste').getFullList<ArtisteRecord>({
            sort: '+date_representation',
        });
    } catch (error) {
        console.error('Erreur getArtistesParDate:', error);
        return [];
    }
}

export async function getScenesParNom() {
    try {
        return await pb.collection('scene').getFullList<SceneRecord>({
            sort: '+nom_scene',
        });
    } catch (error) {
        console.error('Erreur getScenesParNom:', error);
        return [];
    }
}

export async function getArtistesParNom() {
    try {
        return await pb.collection('artiste').getFullList<ArtisteRecord>({
            sort: '+nom_artiste',
        });
    } catch (error) {
        console.error('Erreur getArtistesParNom:', error);
        return [];
    }
}

export async function getArtisteById(id: string) {
    try {
        return await pb.collection('artiste').getOne<ArtisteRecord>(id);
    } catch (error) {
        console.error('Erreur getArtisteById:', error);
        return null;
    }
}

export async function getSceneById(id: string) {
    try {
        return await pb.collection('scene').getOne<SceneRecord>(id);
    } catch (error) {
        console.error('Erreur getSceneById:', error);
        return null;
    }
}

export async function getArtistesParScene(sceneNom: string) {
    try {
        return await pb.collection('artiste').getFullList<ArtisteRecord>({
            sort: '+date_representation',
            filter: `scene_nom = "${sceneNom}"`,
        });
    } catch (error) {
        console.error('Erreur getArtistesParScene:', error);
        return [];
    }
}
