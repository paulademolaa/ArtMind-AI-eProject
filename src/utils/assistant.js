import artworks, { getArtwork } from '../data/artworks';
import { getAssistantReply } from './fakeAI';

const catalogue = artworks
  .map((art) => [art.id, art.title, art.artist, art.date, art.category, art.style, art.medium].join(' | '))
  .join('\n');

const pages = {
  home: '/',
  explore: '/explore',
  categories: '/categories',
  about: '/about',
  search: '/ai/search',
  recognition: '/ai/recognition',
  recommendations: '/ai/recommendations',
  dashboard: '/dashboard',
  favorites: '/favorites',
  collections: '/collections',
  'recently-viewed': '/recently-viewed',
  settings: '/settings',
  signin: '/signin',
  signup: '/signup',
};

const instructions = `You are the ArtMind Assistant on ArtMind, a website for discovering paintings.
You are friendly, knowledgeable about art history, styles, techniques and artists, and you keep answers short (2 to 5 sentences unless the visitor asks for more).
Write plain text only. No markdown, no asterisks, no bullet symbols, no headings.

The site's collection has exactly these paintings (id | title | artist | date | category | style | medium):
${catalogue}

Rules:
- When you recommend or mention paintings from the collection, call show_artworks with their ids so the visitor sees them as cards. Only use ids from the list above.
- Use get_artwork_details when you need a painting's description, palette or museum source.
- You may talk about art and artists outside the collection, but say clearly when a painting is not on ArtMind.
- Use add_to_favorites, remove_from_favorites and list_favorites when the visitor asks about their saved paintings.
- Use open_page when the visitor asks to go somewhere on the site or to open a painting.
- Never invent ids, prices or facts about the collection.`;

const tools = [
  {
    name: 'show_artworks',
    description: 'Show paintings from the collection to the visitor as clickable cards.',
    parameters: {
      type: 'object',
      properties: { ids: { type: 'array', items: { type: 'string' }, description: 'Painting ids from the catalogue, at most 6.' } },
      required: ['ids'],
    },
  },
  {
    name: 'get_artwork_details',
    description: 'Get the full record of one painting: description, palette, tags, museum and source link.',
    parameters: { type: 'object', properties: { id: { type: 'string' } }, required: ['id'] },
  },
  {
    name: 'list_favorites',
    description: "List the paintings the visitor has saved to their favourites.",
    parameters: { type: 'object', properties: {} },
  },
  {
    name: 'add_to_favorites',
    description: "Save a painting to the visitor's favourites.",
    parameters: { type: 'object', properties: { id: { type: 'string' } }, required: ['id'] },
  },
  {
    name: 'remove_from_favorites',
    description: "Remove a painting from the visitor's favourites.",
    parameters: { type: 'object', properties: { id: { type: 'string' } }, required: ['id'] },
  },
  {
    name: 'open_page',
    description: 'Take the visitor to a page of the site, or to one painting when artwork_id is given.',
    parameters: {
      type: 'object',
      properties: {
        page: { type: 'string', enum: Object.keys(pages) },
        artwork_id: { type: 'string', description: 'Open this painting instead of a page.' },
      },
    },
  },
];

function runTool(name, args, site, shown) {
  if (name === 'show_artworks') {
    const found = (args.ids || []).map(getArtwork).filter(Boolean).slice(0, 6);
    found.forEach((art) => shown.push(art));
    return { shown: found.map((art) => art.title) };
  }
  if (name === 'get_artwork_details') {
    return getArtwork(args.id) || { error: 'No painting with that id.' };
  }
  if (name === 'list_favorites') {
    return { favorites: site.favorites.map(getArtwork).filter(Boolean).map((art) => `${art.id} | ${art.title} | ${art.artist}`) };
  }
  if (name === 'add_to_favorites' || name === 'remove_from_favorites') {
    const art = getArtwork(args.id);
    if (!art) return { error: 'No painting with that id.' };
    const saved = site.favorites.includes(art.id);
    if ((name === 'add_to_favorites') !== saved) {
      site.toggleFavorite(art.id);
      site.favorites = saved ? site.favorites.filter((id) => id !== art.id) : [...site.favorites, art.id];
    }
    shown.push(art);
    return { done: true, title: art.title, signedIn: Boolean(site.user) };
  }
  if (name === 'open_page') {
    const path = args.artwork_id && getArtwork(args.artwork_id) ? `/artwork/${args.artwork_id}` : pages[args.page];
    if (!path) return { error: 'Unknown page.' };
    site.goTo = path;
    return { opening: path };
  }
  return { error: 'Unknown tool.' };
}

async function callGemini(contents) {
  const response = await fetch('/api/gemini', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: instructions }] },
      contents,
      tools: [{ functionDeclarations: tools }],
    }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw Object.assign(new Error('gemini'), { status: response.status, code: data.error });
  return data.candidates?.[0]?.content || { role: 'model', parts: [] };
}

// history is the earlier messages of this chat ({ from, text }), site holds favorites, toggleFavorite, user and navigate.
export async function askAssistant(history, question, site) {
  const contents = history
    .filter((message) => message.text)
    .map((message) => ({ role: message.from === 'user' ? 'user' : 'model', parts: [{ text: message.text }] }));
  contents.push({ role: 'user', parts: [{ text: question }] });

  const shown = [];
  const state = { ...site, goTo: null };
  let text = '';

  try {
    for (let round = 0; round < 5; round++) {
      const content = await callGemini(contents);
      contents.push(content);
      const calls = content.parts.filter((part) => part.functionCall);
      text += content.parts.map((part) => part.text || '').join('');

      if (calls.length === 0) {
        if (state.goTo) site.navigate(state.goTo);
        return { text: text.trim() || 'Done.', artworks: dedupe(shown) };
      }

      contents.push({
        role: 'user',
        parts: calls.map(({ functionCall }) => ({
          functionResponse: {
            name: functionCall.name,
            id: functionCall.id,
            response: runTool(functionCall.name, functionCall.args || {}, state, shown),
          },
        })),
      });
    }
    return { text: 'Sorry, I got stuck on that one. Could you ask it another way?', artworks: dedupe(shown) };
  } catch (error) {
    if (error.code === 'no-key') return getAssistantReply(question);
    if (error.status === 429) return { text: 'I have had a lot of questions just now. Please wait a minute and try again.', artworks: [] };
    return { text: 'I could not reach the assistant service. Check your internet connection and try again.', artworks: [] };
  }
}

function dedupe(list) {
  return list.filter((art, index) => list.findIndex((other) => other.id === art.id) === index);
}
