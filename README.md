# ArtMind AI

**An AI-powered digital art discovery website** — built with React and plain CSS as an Aptech eProject (AI-integrated web development).

ArtMind AI turns a traditional online painting gallery into a personal, intelligent experience. Visitors can explore paintings by category and style, search in plain language, upload a photo to identify a painting, get personalised recommendations, and chat with an AI art assistant.

> **Note:** This is a front-end project. The "AI" features are **simulated** in the browser (see [How the AI works](#how-the-ai-works)) so every page works without a server. They are written so they can be swapped for real AI services later.

---

## Contents

- [Features](#features)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
- [Project structure](#project-structure)
- [Pages](#pages)
- [How the AI works](#how-the-ai-works)
- [Design system](#design-system)
- [Working on this project as a team](#working-on-this-project-as-a-team)
- [Team](#team)
- [Credits](#credits)

---

## Features

| Feature | What it does |
|---|---|
| **Smart gallery** | Browse paintings with filters for category, artistic style, surface and medium, plus sorting and "Load more". |
| **AI Smart Search** | Type a sentence like *"oil paintings with nature themes"* — ArtMind shows what it understood and the matching paintings. |
| **AI Image Recognition** | Upload (or drag in) a photo of a painting to see its likely style, category, medium, era, dominant colours and the closest match. |
| **Personalised recommendations** | Suggestions based on your favourites and chosen interests, each with a short reason ("Warm palette", "Similar style"). |
| **AI Art Assistant** | A chatbot that answers questions about styles, techniques and artists, and recommends paintings inside the chat. |
| **Favorites, collections & history** | Save paintings with the heart button, view them as a grid or list, browse curated collections, and see the paintings you viewed recently. |
| **Dashboard** | Recently viewed, favourite categories, fresh picks and saved artworks. |
| **Artwork details** | Full catalogue details, description, colour palette, and download as **PDF** or **Word**. |
| **Accounts** | Sign up and sign in (saved in the browser for this demo). The navbar shows your profile, the dashboard shows your name, and visitors are asked to sign up before opening the dashboard, favourites, collections, recently viewed or account settings. |
| **Responsive** | Designed for desktop (1440px), tablet (768px) and mobile (390px). |

---

## Tech stack

- **[React 18](https://react.dev/)** — the user interface, written with simple function components and hooks (`useState`, `useEffect`, `useContext`)
- **[React Router 6](https://reactrouter.com/)** — moving between pages without reloading
- **Plain CSS** — no Tailwind or CSS frameworks; one global stylesheet plus one CSS file per page/component
- **[Vite](https://vitejs.dev/)** — the development server and build tool

---

## Getting started

### 1. Install the tools

You need **[Node.js](https://nodejs.org/) version 18 or newer**. Check with:

```bash
node -v
```

### 2. Get the code

```bash
git clone https://github.com/paulademolaa/ArtMind-AI-eProject.git
cd ArtMind-AI-eProject
```

### 3. Install the packages

```bash
npm install
```

### 4. Start the website

```bash
npm run dev
```

Open the address it prints (usually **http://localhost:5173**) in your browser. The page updates automatically when you save a file.

### Adding or changing a painting

1. Put the image in `public/images/` and name it after the painting's id, e.g. `public/images/my-painting.jpg`.
2. Add an entry to `src/data/artworks.json` with the same `id`, plus `"image": "/images/my-painting.jpg"`.

**Images not showing?** Make sure you have pulled the latest code (`git pull`). The images live in `public/images`, so the site doesn't need any other website to show them.

### Other commands

| Command | What it does |
|---|---|
| `npm run build` | Makes an optimised version of the site in the `dist/` folder, ready to upload to a host |
| `npm run preview` | Opens the built version locally to check it |

---

## Project structure

```
ArtMind-AI-eProject/
├── index.html              ← the single HTML page (loads the fonts)
├── public/
│   └── images/             ← the painting images (<id>.jpg) + CREDITS.md
├── scripts/
│   └── download-images.mjs ← re-downloads the images (run by a GitHub Action)
├── package.json            ← project info and packages
├── vite.config.js          ← Vite settings
└── src/
    ├── main.jsx            ← starting point: puts <App /> on the page
    ├── App.jsx             ← list of all pages and their addresses (routes)
    ├── index.css           ← GLOBAL styles: colours, fonts, buttons, grids
    │
    ├── data/
    │   ├── artworks.json   ← the 31 paintings (title, artist, image, tags…)
    │   ├── artworks.js     ← small helpers that read artworks.json
    │   └── siteData.js     ← categories, collections and the team
    │
    ├── context/
    │   ├── AuthContext.jsx       ← who is signed in (sign up / sign in / sign out)
    │   └── FavoritesContext.jsx  ← shares the saved paintings with every page
    │
    ├── utils/
    │   ├── fakeAI.js       ← the simulated AI (search, recognition, chat…)
    │   └── recentlyViewed.js ← remembers the paintings you opened
    │
    ├── components/         ← reusable pieces used on many pages
    │   ├── Navbar.jsx / .css
    │   ├── Footer.jsx / .css
    │   ├── ArtworkCard.jsx / .css
    │   ├── PageLayout.jsx        ← Navbar + page + Footer
    │   ├── DashboardLayout.jsx   ← sidebar for signed-in pages
    │   ├── AuthLayout.jsx        ← split screen for sign in / sign up
    │   ├── RequireAuth.jsx       ← sends visitors to Sign Up for account-only pages
    │   ├── PasswordInput.jsx
    │   ├── Icon.jsx              ← simple SVG icons
    │   └── ScrollToTop.jsx
    │
    └── pages/              ← one file (and one CSS file) per page
        ├── Home.jsx, Explore.jsx, ArtworkDetails.jsx
        ├── Categories.jsx, CategoryDetail.jsx, About.jsx
        ├── SmartSearch.jsx, ImageRecognition.jsx
        ├── Recommendations.jsx, Assistant.jsx
        ├── Dashboard.jsx, Favorites.jsx, Collections.jsx, CollectionDetail.jsx
        ├── RecentlyViewed.jsx, Settings.jsx
        └── SignIn.jsx, SignUp.jsx, ForgotPassword.jsx, ResetPassword.jsx, NotFound.jsx
```

**Tip for beginners:** every file starts with a short comment explaining what it does. A good reading order is `App.jsx` → `components/PageLayout.jsx` → `pages/Home.jsx` → `components/ArtworkCard.jsx` → `data/artworks.json`.

---

## Pages

| Address | Page |
|---|---|
| `/` | Home |
| `/explore` | Explore Art (gallery with filters) |
| `/artwork/:id` | Artwork details, e.g. `/artwork/water-lily-pond` |
| `/categories` | All six categories |
| `/categories/:name` | One category, e.g. `/categories/landscape` |
| `/about` | About us, team and contact form |
| `/ai/search` | AI Smart Search (`?q=` holds the search text) |
| `/ai/recognition` | AI Image Recognition |
| `/ai/recommendations` | Personalised recommendations |
| `/ai/assistant` | AI Art Assistant (chat) |
| `/dashboard` | User dashboard |
| `/favorites` | Favorites & collections |
| `/collections`, `/collections/:id` | All collections, and one collection |
| `/recently-viewed` | Paintings you opened recently |
| `/settings` | Account settings (profile, password, preferences, delete account) |
| `/signin`, `/signup`, `/forgot-password`, `/reset-password` | Account pages |

---

## How the AI works

All AI behaviour lives in **`src/utils/fakeAI.js`**, in four small functions:

| Function | Used by | What it does now | How to make it real later |
|---|---|---|---|
| `smartSearch(query)` | Smart Search | Finds keywords (category, medium, surface) and scores each painting | Send the query to an NLP model or the OpenAI API |
| `analyseImage()` | Image Recognition | Waits 3 seconds and returns a sample result | Send the image to a computer-vision model (e.g. TensorFlow, OpenCV) on a Python/Flask or Node server |
| `getRecommendations(favoriteIds)` | Recommendations, Dashboard, Details | Suggests paintings that share a category or style with your favourites | Use a recommendation model on the server |
| `getAssistantReply(message)` | Art Assistant | Looks for keywords and returns a ready-made answer | Call a chat model (e.g. the OpenAI API) from a backend |

Because each page only calls these functions, you can replace what's inside them without changing the pages.

**Honest AI labelling:** anything produced by "AI" in the interface is marked with a ✦ label and wording like *"AI prediction · not guaranteed"*, so it is never confused with verified catalogue facts.

---

## Design system

The site follows the ArtMind AI Figma design (file: *eProject CPISM*). All values are CSS variables at the top of `src/index.css`.

**Colours**

| Name | Value | Use |
|---|---|---|
| White | `#FFFFFF` | Page background |
| Ink | `#131313` | Text, buttons, dark sections |
| Surface | `#F4F2ED` | Alternate section background |
| Accent (cobalt) | `#1236C4` | Links, active states, AI labels |
| Accent light | `#7D8FE8` | Accent on dark backgrounds |

**Fonts** (from Google Fonts)

- **Bodoni Moda** — headings (italic for accent words and artwork titles)
- **Commissioner** — body text, navigation and buttons
- **Poppins** — small uppercase labels, prices, dates and counts

**Screen sizes:** desktop styles first, then `@media (max-width: 1024px)` for tablet and `@media (max-width: 640px)` for mobile.

---

## Working on this project as a team

A simple workflow so we don't overwrite each other's work:

```bash
# 1. Always start from the latest code
git checkout main
git pull

# 2. Make a branch for your task
git checkout -b feature/contact-form-backend

# 3. Save your work
git add .
git commit -m "Connect contact form to the backend"

# 4. Upload your branch
git push -u origin feature/contact-form-backend
```

Then open a **Pull Request** on GitHub so a teammate can review it before it is merged into `main`.

**Ideas for next steps**

- Connect the AI functions in `fakeAI.js` to real AI services
- Add a backend (Node.js/Express or Python/Flask) for accounts, favourites and the contact form
- Load artworks from the [Art Institute of Chicago API](https://api.artic.edu/docs/) instead of a fixed list
- Add the team's photos and links in `src/data/siteData.js`

---

## Team

ArtMind AI was created by a team of six:

| Name | GitHub |
|---|---|
| Paul Ademola | [@paulademolaa](https://github.com/paulademolaa) |
| Ajimati  Oluwatimilehin | [@ji-blaq](https://github.com/ji-blaq) |
| Treasure Amao | [@temzycodes](https://github.com/temzycodes) |
| Emeje James | [@sno-div](https://github.com/sno-div) |
| Louis | [@louis-d-great](https://github.com/louis-d-great) |
| Olagunju Israel | [@olagunjupopizzy-coder](https://github.com/olagunjupopizzy-coder) |

---

## Credits

- **Artwork images:** public-domain paintings from the [Art Institute of Chicago](https://www.artic.edu/) collection. The image files in `public/images` were downloaded from [Wikimedia Commons](https://commons.wikimedia.org/), and `public/images/CREDITS.md` lists the source for each one. Titles, artists, dates and mediums come from the museum's records. The short descriptions were written for this project.
- **Fonts:** Bodoni Moda, Commissioner and Poppins from [Google Fonts](https://fonts.google.com/).
- Created for educational purposes as part of an Aptech eProject.
