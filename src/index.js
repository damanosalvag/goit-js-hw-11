import simpleLightbox from "simplelightbox";
import Notiflix from "notiflix";
import getPictures from "./getfunction";

const inputTextbox = document.querySelector('#search');
const onSearchBtn = document.querySelector('#search-btn');
const onClearBtn = document.querySelector('#clear-btn');
const gallery = document.querySelector('#gallery');

// render pictures
function renderPost(posts) {
    const { total, totalHits, hits } = posts.data;
    const markup = hits.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
        return `
        <div class="photo-card">
            <a class="photo-large" href="${largeImageURL}">
                <img src="${webformatURL}" alt="${tags}" loading="lazy" />
            </a>
            <div class="info">
                <p class="info-item">
                    <b>Likes</b><br>
                    ${likes}
                </p>
                <p class="info-item">
                    <b>Views</b><br>
                    ${views}
                </p>
                <p class="info-item">
                    <b>Comments</b><br>
                    ${comments}
                </p>
                <p class="info-item">
                    <b>Downloads</b><br>
                    ${downloads}
                </p>
             </div>
        </div>`
    }).join(' ');
    gallery.insertAdjacentHTML('beforeend', markup);
};

// get the object array of photos API
onSearchBtn.addEventListener('click', async() => {
    let page = 1;
    const posts = await getPictures(inputTextbox.value.trim(), page);
    renderPost(posts);
    const gallerySimple = new simpleLightbox('.gallery a');
    gallerySimple.on('show.simplelightbox', () => { console.log('Image is shown'); });
})
