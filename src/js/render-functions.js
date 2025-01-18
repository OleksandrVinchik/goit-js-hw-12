import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.getElementById('gallery');
let lightbox;

export function renderImages(images) {
  const markup = images
    .map(
      image => `
      <a href="${image.largeImageURL}" class="gallery-item" data-lightbox="gallery">
        <img src="${image.webformatURL}" alt="${image.tags}" />
        <p>Likes: ${image.likes} | Views: ${image.views} | Comments: ${image.comments} | Downloads: ${image.downloads}</p>
      </a>`
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);

  if (!lightbox) {
    lightbox = new SimpleLightbox('.gallery a');
  } else {
    lightbox.refresh();
  }
}

export function clearGallery() {
  gallery.innerHTML = '';
}
