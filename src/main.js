import { fetchImages } from './js/pixabay-api.js';
import { renderImages, clearGallery } from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const loadMoreButton = document.getElementById('load-more');
const loader = document.getElementById('loader');

let query = '';
let currentPage = 1;
const imagesPerPage = 15;
let totalHits = 0;

searchForm.addEventListener('submit', async event => {
  event.preventDefault();
  query = searchInput.value.trim();

  if (!query) {
    iziToast.error({ title: 'Error', message: 'Please enter a search query!' });
    return;
  }

  currentPage = 1;
  clearGallery();
  toggleLoader(true);
  loadMoreButton.classList.add('hidden');

  try {
    const { images, total } = await fetchImages(
      query,
      currentPage,
      imagesPerPage
    );
    totalHits = total;
    toggleLoader(false);

    if (images.length === 0) {
      iziToast.warning({
        title: 'Error!',
        message: 'No images found. Please try a different search query.',
      });
    } else {
      renderImages(images);
      if (images.length < totalHits) {
        loadMoreButton.classList.remove('hidden');
      }
    }
  } catch (error) {
    toggleLoader(false);
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again!',
    });
  }
});

loadMoreButton.addEventListener('click', async () => {
  currentPage += 1;
  toggleLoader(true);

  try {
    const { images } = await fetchImages(query, currentPage, imagesPerPage);
    toggleLoader(false);

    if (images.length === 0 || currentPage * imagesPerPage >= totalHits) {
      loadMoreButton.classList.add('hidden');
      iziToast.info({
        title: 'End of Results',
        message: "We're sorry, but you've reached the end of search results.",
      });
    } else {
      renderImages(images);
      smoothScroll();
    }
  } catch (error) {
    toggleLoader(false);
    iziToast.error({ title: 'Error', message: 'Failed to load more images.' });
  }
});

function toggleLoader(visible) {
  loader.classList.toggle('hidden', !visible);
}

function smoothScroll() {
  const cardHeight = document
    .querySelector('.gallery a')
    .getBoundingClientRect().height;
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
