import axios from 'axios';

const API_KEY = '48167569-742bafd1cf9306d4d73187ce8';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query, page = 1, perPage = 15) {
  const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(
    query
  )}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;

  try {
    const response = await axios.get(url);
    const { hits, totalHits } = response.data;
    return { images: hits, total: totalHits };
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
}
