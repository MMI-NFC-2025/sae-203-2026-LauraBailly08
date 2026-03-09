import PocketBase from 'pocketbase'; 
const pb = new PocketBase('http://127.0.0.1:8090');

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
    const records = await pb.collection('artiste').getFullList({ filter: scene="${id}", sort: 'date_representation' }); 
    return records; 
}

export async function allartistebysceneName(nom) {
    const scene = await pb.collection('scene').getFirstListItem(nom="${nom}");
    const records = await pb.collection('artiste').getFullList({ filter: scene="${scene.id}", sort: 'date_representation' }); 
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