import SimpleLightbox from "simplelightbox";
// Дополнительный импорт стилей
import "simplelightbox/dist/simple-lightbox.min.css";
// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line
const galleryEl = document.querySelector('.gallery');

const markup = galleryItems.map(({ original, preview, description }) =>
    `<a class="gallery__item" href="${original}">
        <img
        class="gallery__image"
        src="${preview}"
        alt="${description}"
        />
    </a>`
).join('');

galleryEl.insertAdjacentHTML('afterbegin', markup);

const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
})