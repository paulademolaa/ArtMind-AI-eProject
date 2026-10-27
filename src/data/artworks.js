// ------------------------------------------------------------
// ARTWORK DATA HELPERS
// The paintings themselves are stored in artworks.json (easy to read
// and edit). The image files are in public/images/<id>.jpg.
//
// Each artwork has:
//   id        - used in the page address, e.g. /artwork/water-lily-pond
//   image     - path to the picture in public/images
//   category  - one of the six ArtMind categories
//   palette   - sample "dominant colours" (used by the AI features)
//   tags      - simple keywords the Smart Search looks for
//   sourceUrl - the painting's page on the Art Institute of Chicago site
// ------------------------------------------------------------
import data from './artworks.json';

const artworks = data.artworks;
export default artworks;

// The large hero image on the home page.
export const heroArtwork = data.hero;

// Find one artwork by its id. Returns undefined if not found.
export function getArtwork(id) {
  return artworks.find((art) => art.id === id);
}

// All artworks in one category, e.g. getByCategory('Landscape')
export function getByCategory(category) {
  return artworks.filter((art) => art.category === category);
}

// "Similar" artworks: same category or same style (but not the same painting).
export function getSimilar(artwork, count = 4) {
  return artworks
    .filter((art) => art.id !== artwork.id)
    .filter((art) => art.category === artwork.category || art.style === artwork.style)
    .slice(0, count);
}
