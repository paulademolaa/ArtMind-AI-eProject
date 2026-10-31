import data from './artworks.json';

const artworks = data.artworks;
export default artworks;

export const heroArtwork = data.hero;

export function getArtwork(id) {
  return artworks.find((art) => art.id === id);
}

export function getByCategory(category) {
  return artworks.filter((art) => art.category === category);
}

export function getSimilar(artwork, count = 4) {
  return artworks
    .filter((art) => art.id !== artwork.id)
    .filter((art) => art.category === artwork.category || art.style === artwork.style)
    .slice(0, count);
}
