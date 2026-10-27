// ------------------------------------------------------------
// Other content used across the site: categories, collections, team.
// Counts like "3,912 artworks" are sample numbers for the design.
// ------------------------------------------------------------

export const categories = [
  {
    name: 'Abstract',
    coverId: 'improvisation-no-30',
    count: '1,248',
    styles: ['Expressionism', 'De Stijl'],
    description: 'Colour, line and form carry the meaning — Kandinsky to Mondrian.',
  },
  {
    name: 'Landscape',
    coverId: 'cliff-walk-at-pourville',
    count: '3,912',
    styles: ['Impressionism', 'Realism', 'Romanticism'],
    description: 'Countryside, coast and city views — from Romantic storms to Impressionist light.',
  },
  {
    name: 'Flower',
    coverId: 'bouquet-in-earthenware-vase',
    count: '1,036',
    styles: ['Baroque', 'Post-Impressionism'],
    description: 'Dutch bouquets, Redon’s dreamlike blooms, Heade’s magnolias.',
  },
  {
    name: 'Nature',
    coverId: 'view-of-cotopaxi',
    count: '2,207',
    styles: ['Hudson River School', 'Tonalism'],
    description: 'Wilderness, water and weather on a grand scale.',
  },
  {
    name: 'Figurative',
    coverId: 'two-sisters-on-the-terrace',
    count: '2,684',
    styles: ['Impressionism', 'Realism'],
    description: 'Portraits, everyday scenes and modern life.',
  },
  {
    name: 'Religious',
    coverId: 'saint-martin-and-the-beggar',
    count: '1,311',
    styles: ['Early Renaissance', 'Mannerism'],
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
    description: 'How Kandinsky, Hartley and Mondrian let colour speak for itself.',
    artworkIds: ['improvisation-no-30', 'painting-with-green-center', 'movement-no-10', 'composition-no-1-gray-red'],
  },
  {
    id: 'mothers-and-daughters',
    title: 'Mothers & Daughters',
    label: 'AI-curated',
    description: 'Tender domestic scenes by Cassatt, Renoir and Corot.',
    artworkIds: ['the-childs-bath', 'two-sisters-on-the-terrace', 'on-a-balcony'],
  },
];

// The project team. Replace the placeholder entries with real details.
export const team = [
  {
    name: 'Paul Ademola',
    role: 'Product designer & front-end developer',
    skills: 'Nigeria · React · CSS',
    github: 'https://github.com/paulademolaa',
    linkedin: 'https://www.linkedin.com/in/paul-ademola-68697226b',
  },
  { name: 'Team member', role: 'Role on the project', skills: 'Skills · Tools', github: 'https://github.com/ji-blaq', linkedin: '#' },
  { name: 'Treasure Amao', role: 'Role on the project', skills: 'Skills · Tools', github: 'https://github.com/temzycodes', linkedin: '#' },
  { name: 'Team member', role: 'Role on the project', skills: 'Skills · Tools', github: 'https://github.com/sno-div', linkedin: '#' },
  { name: 'Louis', role: 'Role on the project', skills: 'Skills · Tools', github: 'https://github.com/louis-d-great', linkedin: '#' },
  { name: 'Team member', role: 'Role on the project', skills: 'Skills · Tools', github: 'https://github.com/olagunjupopizzy-coder', linkedin: '#' },
];
