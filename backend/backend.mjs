import PocketBase from 'pocketbase';
export const pb = new PocketBase('https://lafanfacomtoise.bailly-laura.fr');

export async function artistesSorted() {
    const records = await pb.collection('artiste').getFullList({ sort: 'date_representation' });
    return records;
}

export async function scenesName() {
    const records = await pb.collection('scene').getFullList({ sort: 'nom' });
    return records;
}

export async function artistesName() {
    const records = await pb.collection('artiste').getFullList({ sort: 'nom' });
    return records;
}

export async function artisteID(id) {
    const record = await pb.collection('artiste').getOne(id);
    return record;
}

// ✅ utile pour ta page détail artiste
export async function artisteDetail(id) {
    const record = await pb.collection('artiste').getOne(id, { expand: 'scene' });
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

export async function addArtiste(artisteData) {
    try {
        const record = await pb.collection('artiste').create(artisteData);
        console.log('Artiste ajouté :', record);
        return record;
    } catch (error) {
        console.error("Erreur lors de l'ajout de l'artiste :", error);
        throw error;
    }
}

export async function addScene(sceneData) {
    try {
        const record = await pb.collection('scene').create(sceneData);
        console.log('Scène ajoutée :', record);
        return record;
    } catch (error) {
        console.error("Erreur lors de l'ajout de la scène :", error);
        throw error;
    }
}

export async function updateArtiste(id, artisteData) {
    try {
        const record = await pb.collection('artiste').update(id, artisteData);
        console.log('Artiste modifié :', record);
        return record;
    } catch (error) {
        console.error("Erreur lors de la modification de l'artiste :", error);
        throw error;
    }
}

export async function updateScene(id, sceneData) {
    try {
        const record = await pb.collection('scene').update(id, sceneData);
        console.log('Scène modifiée :', record);
        return record;
    } catch (error) {
        console.error('Erreur lors de la modification de la scène :', error);
        throw error;
    }
}

// Liste artistes + scène (utile pour cartes/listes)
export async function artistesWithScene() {
    const records = await pb.collection('artiste').getFullList({
        sort: 'date_representation',
        expand: 'scene'
    });
    return records;
}

// URL d'image PocketBase (avec fallback)
export function artisteImageUrl(artiste, field = 'image') {
    if (!artiste?.[field]) return '/assets/images/default-artist.avif';
    return pb.files.getURL(artiste, artiste[field]);
}

// Helpers utilises par les pages Astro
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

export async function getArtisteById(id) {
    try {
        return await pb.collection('artiste').getOne(id);
    } catch (error) {
        console.error('Erreur getArtisteById:', error);
        return null;
    }
}

export async function getSceneById(id) {
    try {
        return await pb.collection('scene').getOne(id);
    } catch (error) {
        console.error('Erreur getSceneById:', error);
        return null;
    }
}