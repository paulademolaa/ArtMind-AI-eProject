import artworks from './artworks';

// How many paintings are in a category, counted from artworks.json
// (so the numbers always tally with the real collection).
function countIn(name) {
  return String(artworks.filter((art) => art.category === name).length);
}

// The most common styles in a category (up to 3), e.g. ['Impressionism', 'Realism'].
function stylesIn(name) {
  const counts = {};
  artworks
    .filter((art) => art.category === name)
    .forEach((art) => {
      counts[art.style] = (counts[art.style] || 0) + 1;
    });
  return Object.keys(counts)
    .sort((a, b) => counts[b] - counts[a])
    .slice(0, 3);
}

export const categories = [
  {
    name: 'Abstract',
    count: countIn('Abstract'),
    styles: stylesIn('Abstract'),
    coverId: 'improvisation-no-30',
    description: 'Colour, line and form carry the meaning — Kandinsky to Mondrian.',
  },
  {
    name: 'Landscape',
    count: countIn('Landscape'),
    styles: stylesIn('Landscape'),
    coverId: 'cliff-walk-at-pourville',
    description: 'Countryside, coast and city views — from Romantic storms to Impressionist light.',
  },
  {
    name: 'Flower',
    count: countIn('Flower'),
    styles: stylesIn('Flower'),
    coverId: 'bouquet-in-earthenware-vase',
    description: 'Dutch bouquets, Redon’s dreamlike blooms, Heade’s magnolias.',
  },
  {
    name: 'Nature',
    count: countIn('Nature'),
    styles: stylesIn('Nature'),
    coverId: 'view-of-cotopaxi',
    description: 'Wilderness, water and weather on a grand scale.',
  },
  {
    name: 'Figurative',
    count: countIn('Figurative'),
    styles: stylesIn('Figurative'),
    coverId: 'two-sisters-on-the-terrace',
    description: 'Portraits, everyday scenes and modern life.',
  },
  {
    name: 'Religious',
    count: countIn('Religious'),
    styles: stylesIn('Religious'),
    coverId: 'saint-martin-and-the-beggar',
    description: 'Devotional and biblical subjects, from gilded Renaissance panels to 19th-century visions.',
  },
];

export const collections = [
  {
    id: 'quiet-waters',
    title: 'Quiet Waters',
    label: 'AI-curated · Editor approved',
    description:
      'Ponds, harbours and still reflections — paintings that slow you down, from Thomas Cole’s Niagara to Monet’s lily ponds.',
    artworkIds: [
      'water-lily-pond',
      'home-of-the-heron',
      'the-herring-net',
      'distant-view-of-niagara-falls',
      'pond-in-the-woods',
      'cliff-walk-at-pourville',
    ],
  },
  {
    id: 'gold-and-devotion',
    title: 'Gold & Devotion',
    label: 'Editor’s pick',
    description: 'Gilded panels and sacred stories from the Early Renaissance.',
    artworkIds: ['the-adoration-of-the-magi', 'virgin-and-child-with-two-angels', 'the-crucifixion'],
  },
  {
    id: 'birth-of-abstraction',
    title: 'The Birth of Abstraction',
    label: 'AI-curated',
    description: 'How Kandinsky and Mondrian let colour, line and form speak for themselves.',
    artworkIds: ['improvisation-no-30', 'painting-with-green-center', 'composition-no-1-gray-red', 'landscape-with-two-poplars'],
  },
  {
    id: 'mothers-and-daughters',
    title: 'Mothers & Daughters',
    label: 'AI-curated',
    description: 'Tender domestic scenes by Cassatt, Renoir and Corot.',
    artworkIds: ['the-childs-bath', 'two-sisters-on-the-terrace', 'on-a-balcony'],
  },
];

export const team = [
  {
    name: 'Paul Ademola',
    role: 'Team Leader | Front-end developer',
    skills: 'Figma · React · CSS',
    github: 'https://github.com/paulademolaa',
    linkedin: 'https://www.linkedin.com/in/paul-ademola-68697226b',
  },
  { name: 'Ajimati Oluwatimilehin', role: 'Front-end developer', skills: 'React · CSS', github: 'https://github.com/ji-blaq', linkedin: '#' },
  { name: 'Treasure Amao', role: 'Class Rep. | Front-end developer', skills: 'React · CSS', github: 'https://github.com/temzycodes', linkedin: '#' },
  { name: 'Emeje James', role: 'Front-end developer', skills: 'React · CSS', github: 'https://github.com/sno-div', linkedin: '#' },
  { name: 'Arogundade Louis', role: 'Front-end developer', skills: 'React · CSS', github: 'https://github.com/louis-d-great', linkedin: '#' },
  { name: 'Olagunju Isreal', role: 'Front-end developer', skills: 'React · CSS', github: 'https://github.com/olagunjupopizzy-coder', linkedin: '#' },
];
