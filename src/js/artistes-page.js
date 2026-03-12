import { artistesWithScene, artisteImageUrl } from '../component/frontend-utils.mjs';

const list = document.querySelector('#artists-list');

try {
    const artistes = await artistesWithScene();

    list.innerHTML = artistes.map((a) => `
        <article class="artist-card">
            <img class="artist-card__img" src="${artisteImageUrl(a)}" alt="${a.nom}">
            <h3>${a.nom}</h3>
            <p>${a.description ?? ''}</p>
            <a class="artist-card__btn" href="/artiste.html?id=${a.id}">En savoir plus</a>
        </article>
    `).join('');
} catch (e) {
    console.error(e);
    list.innerHTML = '<p>Erreur de chargement des artistes.</p>';
}