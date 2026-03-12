import PocketBase from 'pocketbase';
import {
    artistesSorted,
    scenesName,
    artisteID,
    sceneID,
    allartistebysceneId,
    allartistebysceneName,
    saveRecord,
} from '../../backend/backend.mjs';

export const pb = new PocketBase('https://lafanfacomtoise.bailly-laura.fr');

export async function getArtistesParDate() {
    return artistesSorted();
}

export async function getScenesParNom() {
    return scenesName();
}

export async function getArtisteById(id) {
    try {
        return await artisteID(id);
    } catch {
        return null;
    }
}

export async function getSceneById(id) {
    try {
        return await sceneID(id);
    } catch {
        return null;
    }
}

export async function addArtiste(artisteData) {
    return saveRecord('artiste', artisteData);
}

export async function updateArtiste(id, artisteData) {
    return saveRecord('artiste', artisteData, id);
}

export async function addScene(sceneData) {
    return saveRecord('scene', sceneData);
}

export async function updateScene(id, sceneData) {
    return saveRecord('scene', sceneData, id);
}

export async function artistesWithScene() {
    return pb.collection('artiste').getFullList({
        sort: '+date_representation',
        expand: 'scene',
    });
}

export function artisteImageUrl(artiste, field = 'image') {
    if (!artiste?.[field]) return '/assets/images/default-artist.avif';
    return pb.files.getURL(artiste, artiste[field]);
}

export function formatDateFr(date) {
    if (!date) return 'Date a confirmer';
    const parsed = new Date(date);
    if (Number.isNaN(parsed.getTime())) return 'Date invalide';

    return new Intl.DateTimeFormat('fr-FR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    }).format(parsed);
}

export function formatTimeFr(date) {
    if (!date) return 'Heure a confirmer';
    const parsed = new Date(date);
    if (Number.isNaN(parsed.getTime())) return 'Heure invalide';

    return new Intl.DateTimeFormat('fr-FR', {
        hour: '2-digit',
        minute: '2-digit',
    }).format(parsed);
}

export function formatDayFr(date) {
    if (!date) return 'Jour a confirmer';
    const parsed = new Date(date);
    if (Number.isNaN(parsed.getTime())) return 'Jour invalide';

    return new Intl.DateTimeFormat('fr-FR', {
        weekday: 'long',
    }).format(parsed);
}

export async function addContact(contactData) {
    return pb.collection('contact').create(contactData);
}

export {
    allartistebysceneId,
    allartistebysceneName,
};
