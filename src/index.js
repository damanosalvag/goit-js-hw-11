import simpleLightbox from "simplelightbox";
import Notiflix from "notiflix";
import getPictures from "./getfunction";

const inputTextbox = document.querySelector('#search');
const onSearchBtn = document.querySelector('#search-btn');
const onClearBtn = document.querySelector('#clear-btn');
const gallery = document.querySelector('#gallery');
const footerMore = document.querySelector('.footer-more');
const buttonMore = document.querySelector('#load-more-btn');
let pgMore = 1, totalHitsRender=0;


// render pictures
function renderPost(posts, page) {
    const { total, totalHits, hits } = posts.data;
    const markup = hits.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
        return `
        <figure class="photo-card">
            <a class="photo-large" href="${largeImageURL}">
                <img class='gallery__image' src="${webformatURL}" alt="${tags}" loading="lazy" />
            </a>
            <figcaption class="info">
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
             </figcaption>
        </figure>`
    }).join(' ');
    try {
        if (page === 1) {
            gallery.innerHTML = markup;
            Notiflix.Notify.success(`Hooray! We found ${total} images, but only we can only show you ${totalHits}`)
            totalHitsRender = 40;
            pgMore = 1;
        } else if (page > 1 && totalHitsRender <= totalHits) {
            gallery.insertAdjacentHTML('beforeend', markup);
            totalHitsRender = page * 40;
        };    
    }
    catch {
        Notiflix.Notify.warning("We have reached the limit of images we can show you, subscribe to expand your limit!");
    }
};
// On clear button
inputTextbox.addEventListener('input', () => {
    if (inputTextbox.value === '') {
        onClearBtn.style.visibility = 'hidden';
    } else {
        onClearBtn.style.visibility = 'visible';
    };
});

// get the object array of photos API
onSearchBtn.addEventListener('click', async () => {
    const page = 1;
    const posts = await getPictures(inputTextbox.value.trim(), page);
    renderPost(posts, page);
    const gallerySimple_1 = new simpleLightbox('.gallery a');
    gallerySimple_1.on('show.simplelightbox', () => { console.log('Image is shown'); });
    footerMore.style.visibility = 'visible';
});

// get more pictures
buttonMore.addEventListener('click', async () => {
    pgMore += 1;
    const postsMore = await getPictures(inputTextbox.value.trim(), pgMore);
    renderPost(postsMore, pgMore);
    const gallerySimple_2 = new simpleLightbox('.gallery a');
    gallerySimple_2.on('show.simplelightbox', () => { console.log('Image is shown'); });
});

// cleaning the textbox
onClearBtn.addEventListener('click', () => {
    inputTextbox.value = '';
})

