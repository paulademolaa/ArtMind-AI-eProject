import artworks from '../data/artworks';

const knownCategories = ['abstract', 'landscape', 'flower', 'nature', 'figurative', 'religious'];
const knownMediums = ['oil', 'tempera', 'watercolor', 'watercolour'];
const knownSurfaces = ['canvas', 'panel', 'paper', 'board'];

export function smartSearch(query) {
  const ignore = ['show', 'find', 'me', 'some', 'with', 'the', 'and', 'for', 'of', 'on', 'in', 'a', 'paintings', 'painting', 'themes', 'theme', 'art', 'artworks'];
  const words = query
    .toLowerCase()
    .replace(/[^a-z\s]/g, ' ')
    .split(/\s+/)
    .filter((word) => word && !ignore.includes(word));

  const intent = [];
  words.forEach((word) => {
    const single = word.endsWith('s') ? word.slice(0, -1) : word;
    if (knownCategories.includes(single)) intent.push('Category: ' + capitalise(single));
    if (knownMediums.includes(word)) intent.push('Medium: ' + capitalise(word));
    if (knownSurfaces.includes(word)) intent.push('Surface: ' + capitalise(word));
  });

  const scored = artworks.map((art) => {
    const text = [art.title, art.artist, art.category, art.style, art.medium, ...art.tags].join(' ').toLowerCase();
    let score = 0;
    words.forEach((word) => {
      if (word.length > 2 && text.includes(word.replace(/s$/, ''))) score++;
    });
    return { art, score };
  });

  const wantedCategories = intent.filter((i) => i.startsWith('Category: ')).map((i) => i.replace('Category: ', ''));
  const wantedMediums = intent.filter((i) => i.startsWith('Medium: ')).map((i) => i.replace('Medium: ', ''));

  const results = scored
    .filter((item) => item.score > 0)
    .filter((item) => wantedCategories.length === 0 || wantedCategories.includes(item.art.category))
    .filter((item) => wantedMediums.length === 0 || wantedMediums.some((m) => item.art.medium.includes(m)))
    .sort((a, b) => b.score - a.score)
    .map((item, index) => ({
      ...item.art,
      match: Math.max(70, 98 - index * 2) + '%',
    }));

  return { intent: [...new Set(intent)], results };
}

export function analyseImage() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        style: { name: 'Impressionism', confidence: 87, alternative: 'Post-Impressionism 9%' },
        category: { name: 'Landscape', confidence: 92, alternative: 'Nature 6%' },
        medium: { name: 'Oil on canvas', confidence: 81, alternative: 'Pastel 11%' },
        era: { name: '1875 – 1890', confidence: 74, alternative: '1890 – 1905 18%' },
        colours: [
          { name: 'Sky blue', hex: '#7399BF', percent: 32 },
          { name: 'Sea green', hex: '#5C8054', percent: 24 },
          { name: 'Chalk', hex: '#DBD1B3', percent: 18 },
          { name: 'Ochre', hex: '#B38C66', percent: 14 },
          { name: 'Slate', hex: '#404D59', percent: 12 },
        ],
        closestMatchId: 'cliff-walk-at-pourville',
        similarIds: ['water-lily-pond', 'the-herring-net', 'view-of-genoa', 'auvers-panoramic-view'],
      });
    }, 3000);
  });
}

export function getRecommendations(favoriteIds, count = 8) {
  const favourites = artworks.filter((art) => favoriteIds.includes(art.id));
  const likedCategories = favourites.map((art) => art.category);
  const likedStyles = favourites.map((art) => art.style);

  return artworks
    .filter((art) => !favoriteIds.includes(art.id))
    .map((art) => {
      let reason = 'Popular this week';
      if (likedStyles.includes(art.style)) reason = 'Similar style';
      else if (likedCategories.includes(art.category)) reason = 'You like ' + art.category;
      return { ...art, reason };
    })
    .sort((a, b) => (a.reason === 'Popular this week') - (b.reason === 'Popular this week'))
    .slice(0, count);
}

export function getAssistantReply(message) {
  const text = message.toLowerCase();

  if (text.includes('abstract expressionism')) {
    return {
      text: 'Abstract Expressionism was a post-war movement in New York (late 1940s–1950s). Painters such as Pollock and Rothko used gesture, scale and fields of colour to express emotion directly. Its roots go back to early abstract painters like Kandinsky — here are some of his works:',
      artworks: pick(['improvisation-no-30', 'painting-with-green-center', 'landscape-with-two-poplars']),
    };
  }
  if (text.includes('oil') && (text.includes('watercolor') || text.includes('watercolour'))) {
    return {
      text: 'Oil paint mixes pigment with oil. It dries slowly, so artists can blend and layer it for days, giving rich, deep colour. Watercolour mixes pigment with water and gum. It is transparent, dries quickly and uses the white paper for light, so it feels fresh and is hard to correct.',
      artworks: [],
    };
  }
  if (text.includes('blue')) {
    return {
      text: 'Here are three paintings where blue sets the mood:',
      artworks: pick(['cliff-walk-at-pourville', 'magnolias-on-blue-velvet', 'the-herring-net']),
    };
  }
  if (text.includes('landscape')) {
    return {
      text: 'Some landscapes from the collection, from calm to dramatic:',
      artworks: pick(['water-lily-pond', 'landscape-sunset', 'valley-of-aosta']),
    };
  }
  if (text.includes('pointillism') || text.includes('seurat')) {
    return {
      text: 'Pointillism uses small dots or dabs of pure colour placed side by side. From a distance, your eye mixes them together, which makes the colours shimmer. Georges Seurat developed the technique in the 1880s.',
      artworks: pick(['la-grande-jatte-oil-sketch']),
    };
  }
  if (text.includes('monet') || text.includes('impressionism')) {
    return {
      text: 'Impressionism began in France in the 1870s. Painters like Monet worked outdoors with quick, visible brushstrokes to capture light and atmosphere. Try these:',
      artworks: pick(['water-lily-pond', 'cliff-walk-at-pourville', 'two-sisters-on-the-terrace']),
    };
  }
  return {
    text: 'Good question! I can explain art styles and techniques, tell you about artists, or recommend paintings. Try asking “Recommend landscape paintings” or “What is abstract expressionism?”',
    artworks: [],
  };
}

function pick(ids) {
  return artworks.filter((art) => ids.includes(art.id));
}

function capitalise(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
