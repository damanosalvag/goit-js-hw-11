import simpleLightbox from "simplelightbox";
import Notiflix from "notiflix";
import getPictures from "./getfunction";

const inputTextbox = document.querySelector('#search');
const onSearchBtn = document.querySelector('#search-btn');
const onClearBtn = document.querySelector('#clear-btn');
const gallery = document.querySelector('#gallery');
const footerMore = document.querySelector('.footer-more');
const buttonMore = document.querySelector('#load-more-btn');
let pgMore = 1, heightCard = 0;

const gallerySimple = new simpleLightbox('.gallery a');
gallerySimple.on('show.simplelightbox', () => { console.log('Image is shown'); });


// render pictures
function renderPost(posts, page) {
    try {
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
        if (page === 1 && totalHits > 0) {
            gallery.innerHTML = markup;
            const { height: cardHeight } = document.querySelector(".gallery").firstElementChild.getBoundingClientRect();
            heightCard = cardHeight;
            Notiflix.Notify.success(`Hooray! We found ${total} images, but only we can only show you ${totalHits}`);
            pgMore = 1;
            footerMore.style.visibility = 'visible';
            window.scrollBy({
                top: cardHeight * 2,
                behavior: "smooth",
            });
        } else if (page > 1 && totalHits > 0) {
            gallery.insertAdjacentHTML('beforeend', markup);
            window.scrollBy({
                top: heightCard * 2,
                behavior: "smooth",
            });
        } else {
            Notiflix.Notify.info("No found hits");
            let validate = footerMore.style.visibility = 'visible' ? 'hidden' : 'visible';
            return footerMore.style.visibility = validate;
        }; 
        gallerySimple.refresh();
    }
    catch {
        return
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
    if (inputTextbox.value != '') {
        const page = 1;
        const posts = await getPictures(inputTextbox.value.trim(), page);
        renderPost(posts, page);       
    } else {
        return window.alert('Please write something!');
    }
});
// get the object array of photos API, if keydwon intro
inputTextbox.addEventListener('keydown', (event) => {
    if (event.keyCode === 13) {
        event.preventDefault();
        onSearchBtn.click();
    }
});

// get more pictures
buttonMore.addEventListener('click', async () => {
    if (inputTextbox.value != '') {
        pgMore += 1;
        const postsMore = await getPictures(inputTextbox.value.trim(), pgMore);
        renderPost(postsMore, pgMore);      
    } else {
        return window.alert('Please write something!');
    };
});

// cleaning the textbox
onClearBtn.addEventListener('click', () => {
    inputTextbox.value = '';
});

