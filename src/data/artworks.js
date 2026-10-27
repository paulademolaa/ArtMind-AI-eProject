// ------------------------------------------------------------
// ARTWORK DATA
// All paintings are public-domain works from the Art Institute of
// Chicago (AIC) open-access collection (CC0). Titles, artists, dates
// and mediums come from the museum's records.
//
// Each artwork has:
//   id        - used in the page address, e.g. /artwork/water-lily-pond
//   aicId     - the museum's own id (for the "View on AIC" link)
//   imageId   - used to build the image address (see imageUrl below)
//   category  - one of the six ArtMind categories
//   palette   - sample "dominant colours" (used by the AI features)
//   tags      - simple keywords the Smart Search looks for
// ------------------------------------------------------------

// Builds an image address from the museum's image service.
// width = how many pixels wide we want the picture to be.
export function imageUrl(imageId, width = 843) {
  return `https://www.artic.edu/iiif/2/${imageId}/full/${width},/0/default.jpg`;
}

const artworks = [
  // ---------- ABSTRACT ----------
  {
    id: 'improvisation-no-30',
    aicId: 8991,
    imageId: 'b5bc6b66-9e6e-fe57-dcec-fc49e820e904',
    title: 'Improvisation No. 30 (Cannons)',
    artist: 'Vasily Kandinsky',
    date: '1913',
    medium: 'Oil on canvas',
    surface: 'Canvas',
    category: 'Abstract',
    style: 'Expressionism',
    palette: ['#C8432B', '#2F5D9B', '#E9C46A', '#3B3B3B', '#EDE6D6'],
    tags: ['abstract', 'colour', 'bold', 'red', 'blue', 'modern', 'oil', 'canvas'],
    description:
      'Swirling lines and bursts of colour fill the canvas. In the lower right, two cannons can be made out among the shapes, a rare hint of a real subject in Kandinsky’s early abstract work.',
  },
  {
    id: 'painting-with-green-center',
    aicId: 8987,
    imageId: 'c68f33ec-feb1-5277-334b-b71ac15ae394',
    title: 'Painting with Green Center',
    artist: 'Vasily Kandinsky',
    date: '1913',
    medium: 'Oil on canvas',
    surface: 'Canvas',
    category: 'Abstract',
    style: 'Expressionism',
    palette: ['#3E7D4A', '#D9472B', '#2C4F8C', '#F0D27A', '#1D1D1D'],
    tags: ['abstract', 'green', 'colour', 'modern', 'oil', 'canvas'],
    description:
      'A green shape sits at the centre of a crowded, energetic composition of colour and line. The painting shows Kandinsky moving away from recognisable subjects altogether.',
  },
  {
    id: 'movement-no-10',
    aicId: 90207,
    imageId: '768387ba-f972-b43b-39f7-98cb37dad883',
    title: 'Movement No. 10',
    artist: 'Marsden Hartley',
    date: '1917',
    medium: 'Oil on composition board',
    surface: 'Board',
    category: 'Abstract',
    style: 'Modernism',
    palette: ['#2B4A7A', '#E8DCC4', '#C8A050', '#7A2E2E', '#141414'],
    tags: ['abstract', 'geometric', 'modern', 'american', 'oil'],
    description:
      'Flat, overlapping shapes are arranged like a still life seen from several angles at once. Hartley was one of the first American painters to work in an abstract way.',
  },
  {
    id: 'composition-no-1-gray-red',
    aicId: 65821,
    imageId: '254c654f-354a-0f4f-28b5-8eb01a02e95c',
    title: 'Composition (No. 1) Gray-Red',
    artist: 'Piet Mondrian',
    date: '1935',
    medium: 'Oil on canvas',
    surface: 'Canvas',
    category: 'Abstract',
    style: 'De Stijl',
    palette: ['#E6E3DC', '#C8C5BE', '#B3261E', '#141414', '#FFFFFF'],
    tags: ['abstract', 'geometric', 'grid', 'minimal', 'red', 'grey', 'modern', 'oil', 'canvas'],
    description:
      'Black lines divide a pale surface into rectangles, with a single block of red. Mondrian used only straight lines and a few colours to create balance.',
  },
  {
    id: 'landscape-with-two-poplars',
    aicId: 8980,
    imageId: '9694ca0c-c4c4-e48d-566f-4d248990cff4',
    title: 'Landscape with Two Poplars',
    artist: 'Vasily Kandinsky',
    date: '1912',
    medium: 'Oil on canvas',
    surface: 'Canvas',
    category: 'Abstract',
    style: 'Expressionism',
    palette: ['#3C6E8F', '#E4B84A', '#B5442E', '#4F7A3A', '#F2EBDD'],
    tags: ['abstract', 'landscape', 'trees', 'colour', 'oil', 'canvas'],
    description:
      'Two tall poplar trees still anchor this landscape, but the hills, sky and figures are dissolving into bright, free patches of colour.',
  },

  // ---------- LANDSCAPE ----------
  {
    id: 'water-lily-pond',
    aicId: 87088,
    imageId: '8534685d-1102-e1e3-e194-94f6e925e8b0',
    title: 'Water Lily Pond',
    artist: 'Claude Monet',
    date: '1900',
    medium: 'Oil on canvas',
    surface: 'Canvas',
    category: 'Landscape',
    style: 'Impressionism',
    palette: ['#4A6141', '#788C6A', '#8C7895', '#C09E99', '#2E3B2D'],
    tags: ['landscape', 'water', 'pond', 'garden', 'bridge', 'green', 'calm', 'impressionism', 'oil', 'canvas'],
    description:
      'Monet painted the Japanese footbridge over the water-lily pond in his garden at Giverny many times. Here the bridge, foliage and lilies melt into soft strokes of green, violet and rose.',
  },
  {
    id: 'cliff-walk-at-pourville',
    aicId: 14620,
    imageId: 'b0effb1c-ff23-bbaa-f809-9fd94e31c1a0',
    title: 'Cliff Walk at Pourville',
    artist: 'Claude Monet',
    date: '1882',
    medium: 'Oil on canvas',
    surface: 'Canvas',
    category: 'Landscape',
    style: 'Impressionism',
    palette: ['#7399BF', '#5C8054', '#DBD1B3', '#B38C66', '#404D59'],
    tags: ['landscape', 'sea', 'coast', 'cliff', 'blue', 'sky', 'impressionism', 'oil', 'canvas'],
    description:
      'Two figures stand on a windy clifftop above the sea on the Normandy coast. Quick, broken brushstrokes capture moving grass, light and air.',
  },
  {
    id: 'auvers-panoramic-view',
    aicId: 14556,
    imageId: '90bc0cec-0d4e-9af5-3912-52a082a428e5',
    title: 'Auvers, Panoramic View',
    artist: 'Paul Cezanne',
    date: '1873–75',
    medium: 'Oil on canvas',
    surface: 'Canvas',
    category: 'Landscape',
    style: 'Impressionism',
    palette: ['#6E8B5A', '#C9B98F', '#A15E3B', '#8FA7B8', '#3F4A35'],
    tags: ['landscape', 'village', 'rooftops', 'green', 'oil', 'canvas'],
    description:
      'A view over the rooftops of a French village, built up from blocks of colour. Cezanne’s careful structure points towards later modern painting.',
  },
  {
    id: 'view-of-genoa',
    aicId: 25806,
    imageId: 'bd8432e6-65f7-a32a-4e1a-85593633fa8f',
    title: 'View of Genoa',
    artist: 'Jean Baptiste Camille Corot',
    date: '1834',
    medium: 'Oil on paper, mounted on canvas',
    surface: 'Paper',
    category: 'Landscape',
    style: 'Realism',
    palette: ['#9FB4C7', '#D8C9A6', '#B08A5B', '#6F7D63', '#F1EADB'],
    tags: ['landscape', 'city', 'coast', 'sea', 'italy', 'light', 'oil'],
    description:
      'A bright, quiet view of the Italian port city of Genoa, painted outdoors. Corot’s clear light and simple shapes influenced the Impressionists.',
  },
  {
    id: 'landscape-sunset',
    aicId: 64740,
    imageId: '0b66bb30-3170-f7d1-543a-93e02ffe194f',
    title: 'Landscape, Sunset',
    artist: 'George Inness',
    date: '1887–89',
    medium: 'Oil on canvas',
    surface: 'Canvas',
    category: 'Landscape',
    style: 'Tonalism',
    palette: ['#C8873A', '#5A4A2E', '#8E6F3F', '#2E2A1E', '#E2B66D'],
    tags: ['landscape', 'sunset', 'warm', 'golden', 'earthy', 'calm', 'oil', 'canvas'],
    description:
      'Warm evening light glows behind soft, dark trees. Inness used hazy tones to create a peaceful, almost dreamlike mood.',
  },
  {
    id: 'valley-of-aosta',
    aicId: 109938,
    imageId: '564e2e3f-eb93-88a7-d265-8fea006facff',
    title: 'Valley of Aosta: Snowstorm, Avalanche, and Thunderstorm',
    artist: 'Joseph Mallord William Turner',
    date: '1836–37',
    medium: 'Oil on canvas',
    surface: 'Canvas',
    category: 'Landscape',
    style: 'Romanticism',
    palette: ['#8A8A80', '#D9CDA8', '#4E4A42', '#B59B67', '#F2EEE3'],
    tags: ['landscape', 'mountains', 'storm', 'dramatic', 'romantic', 'oil', 'canvas'],
    description:
      'A storm, an avalanche and a thunderstorm sweep through an Alpine valley. Turner turns the power of nature into whirling light and colour.',
  },

  // ---------- FLOWER ----------
  {
    id: 'still-life-with-flowers',
    aicId: 110982,
    imageId: 'bdb9f780-83be-dd12-191d-54a77c5444ab',
    title: 'Still Life with Flowers',
    artist: 'Odilon Redon',
    date: '1905',
    medium: 'Oil on canvas',
    surface: 'Canvas',
    category: 'Flower',
    style: 'Post-Impressionism',
    palette: ['#6B6255', '#C7A46B', '#B5503C', '#8DA0B5', '#E9DFC9'],
    tags: ['flower', 'flowers', 'still life', 'vase', 'dreamy', 'oil', 'canvas'],
    description:
      'A loose bouquet seems to float against a soft, glowing background. Redon’s flowers feel more like a dream than a careful record.',
  },
  {
    id: 'bouquet-in-earthenware-vase',
    aicId: 64029,
    imageId: '599e0546-ed58-0224-a623-39a8e3b51ef8',
    title: 'Bouquet of Flowers in an Earthenware Vase',
    artist: 'Jan Brueghel the Elder',
    date: 'c. 1610',
    medium: 'Oil on panel',
    surface: 'Panel',
    category: 'Flower',
    style: 'Baroque',
    palette: ['#1A1A16', '#C9A13E', '#B8432F', '#F2E6CC', '#4F6B3A'],
    tags: ['flower', 'flowers', 'bouquet', 'still life', 'dark', 'dutch', 'flemish', 'oil', 'panel'],
    description:
      'Dozens of flowers, many blooming at different times of year, are gathered into one impossible bouquet against a dark background.',
  },
  {
    id: 'chrysanthemums',
    aicId: 16617,
    imageId: '479aff61-784e-e833-fd82-50ba8c819514',
    title: 'Chrysanthemums',
    artist: 'Pierre-Auguste Renoir',
    date: '1881–82',
    medium: 'Oil on canvas',
    surface: 'Canvas',
    category: 'Flower',
    style: 'Impressionism',
    palette: ['#E8D9A8', '#C7653F', '#4E7B9B', '#F3EEDF', '#6E7F4C'],
    tags: ['flower', 'flowers', 'bright', 'warm', 'impressionism', 'oil', 'canvas'],
    description:
      'A full vase of chrysanthemums painted with soft, feathery strokes of warm colour.',
  },
  {
    id: 'magnolias-on-blue-velvet',
    aicId: 100829,
    imageId: '0729fbba-51e3-a2d7-6d4d-61c2be62af3f',
    title: 'Magnolias on Light Blue Velvet Cloth',
    artist: 'Martin Johnson Heade',
    date: '1885–95',
    medium: 'Oil on canvas',
    surface: 'Canvas',
    category: 'Flower',
    style: 'Realism',
    palette: ['#F3EFE6', '#9FB7C9', '#3E4F2E', '#C9B79A', '#1E2418'],
    tags: ['flower', 'flowers', 'magnolia', 'white', 'blue', 'calm', 'oil', 'canvas'],
    description:
      'Large white magnolia blossoms lie on a soft blue cloth, painted with smooth, careful detail.',
  },
  {
    id: 'flowers-in-a-vase',
    aicId: 8610,
    imageId: '3ad78710-cc0e-4ece-6ab7-97d7542c3dc8',
    title: 'Flowers in a Vase',
    artist: 'Unknown Dutch artist',
    date: 'c. 1750',
    medium: 'Oil on panel',
    surface: 'Panel',
    category: 'Flower',
    style: 'Dutch still life',
    palette: ['#2A2318', '#D9B26A', '#B24A3A', '#F0E2C2', '#5C6E3D'],
    tags: ['flower', 'flowers', 'vase', 'still life', 'dutch', 'oil', 'panel'],
    description:
      'A tall arrangement of flowers in a vase, in the tradition of detailed Dutch flower painting.',
  },

  // ---------- NATURE ----------
  {
    id: 'view-of-cotopaxi',
    aicId: 76571,
    imageId: '33fc29fc-097b-576b-c9e6-c3352d9d3f15',
    title: 'View of Cotopaxi',
    artist: 'Frederic Edwin Church',
    date: '1857',
    medium: 'Oil on canvas',
    surface: 'Canvas',
    category: 'Nature',
    style: 'Hudson River School',
    palette: ['#C9B48A', '#5E6E4A', '#8EA6B8', '#3C3A2C', '#EDE3C8'],
    tags: ['nature', 'volcano', 'mountain', 'waterfall', 'tropical', 'dramatic', 'oil', 'canvas'],
    description:
      'The Cotopaxi volcano in Ecuador rises above a lush tropical valley. Church travelled to South America to paint its scenery.',
  },
  {
    id: 'home-of-the-heron',
    aicId: 64724,
    imageId: '0f2d999d-0173-2935-a6d0-0175bb97b2a9',
    title: 'The Home of the Heron',
    artist: 'George Inness',
    date: '1893',
    medium: 'Oil on canvas',
    surface: 'Canvas',
    category: 'Nature',
    style: 'Tonalism',
    palette: ['#C77F3A', '#3E3A2A', '#8C6A3C', '#D9A55A', '#1E1C16'],
    tags: ['nature', 'bird', 'heron', 'marsh', 'sunset', 'warm', 'golden', 'earthy', 'calm', 'oil', 'canvas'],
    description:
      'A lone heron stands in a misty marsh at dusk. Soft golden light and dark trees create a quiet, thoughtful mood.',
  },
  {
    id: 'distant-view-of-niagara-falls',
    aicId: 90048,
    imageId: '18092196-50ae-3ff1-9205-1b3110e966c3',
    title: 'Distant View of Niagara Falls',
    artist: 'Thomas Cole',
    date: '1830',
    medium: 'Oil on wood panel',
    surface: 'Panel',
    category: 'Nature',
    style: 'Hudson River School',
    palette: ['#5C7A5A', '#BFB59A', '#8BA4B5', '#3A3A2C', '#E5DCC3'],
    tags: ['nature', 'waterfall', 'water', 'trees', 'american', 'oil', 'panel'],
    description:
      'Niagara Falls appears in the distance beyond wild trees and rocks, as it might have looked before towns grew up around it.',
  },
  {
    id: 'pond-in-the-woods',
    aicId: 95993,
    imageId: '44c6f2f1-90fc-f386-734b-fbb9427b6ff3',
    title: 'Pond in the Woods',
    artist: 'Narcisse Virgile Diaz de la Peña',
    date: '1862',
    medium: 'Oil on canvas',
    surface: 'Canvas',
    category: 'Nature',
    style: 'Barbizon School',
    palette: ['#3C4A2C', '#8C8A5C', '#C9C19A', '#5E6B4A', '#1E2216'],
    tags: ['nature', 'forest', 'woods', 'pond', 'water', 'trees', 'green', 'calm', 'oil', 'canvas'],
    description:
      'Light breaks through the trees onto a still pond deep in the forest. Barbizon painters loved working outdoors in the woods near Paris.',
  },
  {
    id: 'mist-rising-in-the-catskills',
    aicId: 71971,
    imageId: '30491751-fb43-fc27-51fe-d068be7b6568',
    title: 'Mist Rising at Sunset in the Catskills',
    artist: 'Sanford Robinson Gifford',
    date: 'c. 1861',
    medium: 'Oil on canvas',
    surface: 'Canvas',
    category: 'Nature',
    style: 'Hudson River School',
    palette: ['#D9A55A', '#7A5A3A', '#3F4A5C', '#C9B48A', '#F0D9A8'],
    tags: ['nature', 'mountains', 'sunset', 'mist', 'warm', 'golden', 'calm', 'oil', 'canvas'],
    description:
      'Golden mist fills a mountain valley at sunset. Gifford was known for paintings full of glowing, hazy light.',
  },
  {
    id: 'the-herring-net',
    aicId: 25865,
    imageId: '5dca7347-c6dc-24dd-d073-d705b9cdc575',
    title: 'The Herring Net',
    artist: 'Winslow Homer',
    date: '1885',
    medium: 'Oil on canvas',
    surface: 'Canvas',
    category: 'Nature',
    style: 'Realism',
    palette: ['#4A5A6A', '#8C8A7A', '#C9B88A', '#2A2E30', '#D9D2BE'],
    tags: ['nature', 'sea', 'ocean', 'fishermen', 'boat', 'blue', 'grey', 'oil', 'canvas'],
    description:
      'Two fishermen haul a heavy net full of herring into their small boat on a rough grey sea.',
  },

  // ---------- FIGURATIVE ----------
  {
    id: 'two-sisters-on-the-terrace',
    aicId: 14655,
    imageId: '3a608f55-d76e-fa96-d0b1-0789fbc48f1e',
    title: 'Two Sisters (On the Terrace)',
    artist: 'Pierre-Auguste Renoir',
    date: '1881',
    medium: 'Oil on canvas',
    surface: 'Canvas',
    category: 'Figurative',
    style: 'Impressionism',
    palette: ['#2E3F6B', '#C93A2E', '#6E8B4A', '#E9D9B5', '#9FB4C7'],
    tags: ['figurative', 'people', 'portrait', 'girls', 'garden', 'colourful', 'impressionism', 'oil', 'canvas'],
    description:
      'A young woman and a little girl sit on a terrace above the river, surrounded by flowers and greenery.',
  },
  {
    id: 'the-childs-bath',
    aicId: 111442,
    imageId: '3b885ae0-4d46-5fe4-d70a-00474827f02c',
    title: 'The Child’s Bath',
    artist: 'Mary Cassatt',
    date: '1893',
    medium: 'Oil on canvas',
    surface: 'Canvas',
    category: 'Figurative',
    style: 'Impressionism',
    palette: ['#E8D9C4', '#6B8A9C', '#B5784E', '#3E5A4A', '#F3EEE6'],
    tags: ['figurative', 'people', 'mother', 'child', 'tender', 'impressionism', 'oil', 'canvas'],
    description:
      'A woman gently washes a child’s feet. Seen from above, the scene feels close and tender.',
  },
  {
    id: 'la-grande-jatte-oil-sketch',
    aicId: 61616,
    imageId: '081be15c-8812-c174-eeb2-cf318a2e67cf',
    title: 'Oil Sketch for “A Sunday on La Grande Jatte — 1884”',
    artist: 'Georges Seurat',
    date: '1884',
    medium: 'Oil on panel',
    surface: 'Panel',
    category: 'Figurative',
    style: 'Post-Impressionism',
    palette: ['#6E8B4A', '#3E5A2E', '#C9B88A', '#7A8FB5', '#E5DCC3'],
    tags: ['figurative', 'people', 'park', 'river', 'pointillism', 'oil', 'panel'],
    description:
      'A small study for Seurat’s famous painting of Parisians relaxing on an island in the River Seine, made with short dabs of colour.',
  },
  {
    id: 'interrupted-reading',
    aicId: 81512,
    imageId: '1c2d32a7-790c-501a-e124-00f28cf5052d',
    title: 'Interrupted Reading',
    artist: 'Jean Baptiste Camille Corot',
    date: 'c. 1870',
    medium: 'Oil on canvas, mounted on board',
    surface: 'Canvas',
    category: 'Figurative',
    style: 'Realism',
    palette: ['#7A5A3A', '#D9C9A6', '#3E3428', '#B5946B', '#1E1A14'],
    tags: ['figurative', 'people', 'woman', 'reading', 'book', 'quiet', 'earthy', 'oil', 'canvas'],
    description:
      'A young woman rests her head on her hand, a book open on her lap, lost in thought.',
  },
  {
    id: 'on-a-balcony',
    aicId: 26650,
    imageId: 'f0150d21-33ab-f6ea-0d4d-32d459f091fe',
    title: 'On a Balcony',
    artist: 'Mary Cassatt',
    date: '1878–79',
    medium: 'Oil on canvas',
    surface: 'Canvas',
    category: 'Figurative',
    style: 'Impressionism',
    palette: ['#E9E2D3', '#5E7B4A', '#C9A06B', '#3E4A3A', '#F3EEE3'],
    tags: ['figurative', 'people', 'woman', 'reading', 'garden', 'impressionism', 'oil', 'canvas'],
    description:
      'A woman in a pale dress reads a newspaper on a balcony full of plants and soft daylight.',
  },

  // ---------- RELIGIOUS ----------
  {
    id: 'virgin-and-child-with-two-angels',
    aicId: 80526,
    imageId: 'eb49ab17-f2d9-275a-ee71-e8f0016b34aa',
    title: 'Virgin and Child with Two Angels',
    artist: 'Sandro Botticelli',
    date: '1485–95',
    medium: 'Tempera on panel',
    surface: 'Panel',
    category: 'Religious',
    style: 'Early Renaissance',
    palette: ['#2E4A7A', '#C9A04A', '#B5443A', '#E9DCC0', '#1A1A1A'],
    tags: ['religious', 'renaissance', 'madonna', 'angels', 'gold', 'tempera', 'panel'],
    description:
      'Mary holds the infant Christ, with two angels beside them, in a round painting from Renaissance Florence.',
  },
  {
    id: 'the-annunciation',
    aicId: 7503,
    imageId: 'e35161fb-cd78-b757-8000-15ba3ebb0fc3',
    title: 'The Annunciation',
    artist: 'George Hitchcock',
    date: '1887',
    medium: 'Oil on canvas',
    surface: 'Canvas',
    category: 'Religious',
    style: 'Impressionism',
    palette: ['#E9E6DC', '#6E8B5A', '#B5C9D9', '#3E4A3A', '#F3F0E8'],
    tags: ['religious', 'lilies', 'garden', 'white', 'light', 'oil', 'canvas'],
    description:
      'A bible story set in a sunlit field of white lilies, painted by an American artist working in the Netherlands.',
  },
  {
    id: 'saint-martin-and-the-beggar',
    aicId: 67362,
    imageId: '52098776-6e2e-9683-e258-7b1cec8660dd',
    title: 'Saint Martin and the Beggar',
    artist: 'El Greco',
    date: 'c. 1597–1600',
    medium: 'Oil on canvas',
    surface: 'Canvas',
    category: 'Religious',
    style: 'Mannerism',
    palette: ['#3E5A7A', '#E9E6DC', '#7A4A2E', '#C9A04A', '#1E1E24'],
    tags: ['religious', 'saint', 'horse', 'dramatic', 'oil', 'canvas'],
    description:
      'Saint Martin, on a white horse, cuts his cloak in half to share it with a beggar. El Greco stretches the figures to make them feel spiritual.',
  },
  {
    id: 'the-crucifixion',
    aicId: 111622,
    imageId: '35afa43f-bdb5-06b8-81c5-416927ffe8ee',
    title: 'The Crucifixion',
    artist: 'Carlo Crivelli',
    date: 'c. 1487',
    medium: 'Tempera on panel',
    surface: 'Panel',
    category: 'Religious',
    style: 'Early Renaissance',
    palette: ['#C9A04A', '#7A2E2E', '#2E3A5C', '#E9DCC0', '#1A1A1A'],
    tags: ['religious', 'renaissance', 'gold', 'tempera', 'panel'],
    description:
      'A gold-background panel from the Italian Renaissance, painted with sharp detail and rich colour.',
  },
  {
    id: 'the-adoration-of-the-magi',
    aicId: 25743,
    imageId: '24c1565b-f22d-fb73-4a7f-f35bcb3dcc09',
    title: 'The Adoration of the Magi',
    artist: 'Raffaello Botticini',
    date: 'c. 1495',
    medium: 'Tempera on panel',
    surface: 'Panel',
    category: 'Religious',
    style: 'Early Renaissance',
    palette: ['#C9A04A', '#3E5A7A', '#B5443A', '#E9DCC0', '#2A2418'],
    tags: ['religious', 'renaissance', 'kings', 'gold', 'tempera', 'panel'],
    description:
      'The three kings bring gifts to the infant Christ, surrounded by a crowd of richly dressed followers.',
  },
];

export default artworks;

// The large hero image on the home page (a different Monet water lily painting).
export const heroArtwork = {
  aicId: 97933,
  imageId: '7a23ad22-2044-6d7d-6315-9b101dadc559',
  title: 'Water Lily Pond',
  artist: 'Claude Monet',
  date: '1917–19',
  medium: 'Oil on canvas',
};

// ---------- Small helper functions ----------

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
