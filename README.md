# ArtMind AI

**An AI-powered digital art discovery website**, built with React and plain CSS as an Aptech eProject (AI-integrated web development).

ArtMind AI turns a traditional online painting gallery into a personal, intelligent experience. Visitors can explore 60 public-domain paintings by category and style, search in plain language, upload a photo to identify a painting, get personalised recommendations, and chat with an AI art assistant.

> **Note:** ArtMind AI is a fully front-end project. Everything, including the AI features, runs in the browser, so the site works without any server or API key (see [How the AI works](#how-the-ai-works)).

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
| **AI Smart Search** | Type a sentence like *"oil paintings with nature themes"*. ArtMind shows what it understood and the matching paintings. |
| **AI Image Recognition** | Upload (or drag in) a photo of a painting to see its likely style, category, medium, era, dominant colours and the closest match. |
| **Personalised recommendations** | Suggestions based on your favourites and chosen interests, each with a short reason ("Warm palette", "Similar style"). |
| **AI Art Assistant** | A chatbot that answers questions about styles, techniques and artists, and recommends paintings inside the chat. |
| **Floating chat** | The assistant is also available from a chat bubble on every page. |
| **Favorites, collections & history** | Save paintings with the heart button, view them as a grid or list, browse curated collections, and see the paintings you viewed recently. Saved paintings and history are kept per account. |
| **Dashboard** | Recently viewed, favourite categories, fresh picks and saved artworks. |
| **Artwork details** | Full catalogue details, description, colour palette, and download as **PDF** or **Word**. |
| **Accounts** | Sign up, sign in, forgot/reset password and account settings (saved in the browser for this demo). The navbar shows your avatar, and visitors are asked to sign up before opening account-only pages. |
| **Motion** | Gentle scroll-in animations, smooth hover transitions and smooth scrolling. |
| **Responsive** | Designed for desktop (1440px), tablet (768px) and mobile (390px). |

---

## Tech stack

- **[React 18](https://react.dev/)**: the user interface, written with function components and hooks (`useState`, `useEffect`, `useContext`)
- **[React Router 6](https://reactrouter.com/)**: moving between pages without reloading
- **Plain CSS**: no Tailwind or CSS frameworks; one global stylesheet plus one CSS file per page/component
- **[Lucide React](https://lucide.dev/) and [React Icons](https://react-icons.github.io/react-icons/)**: interface icons
- **[Vite 5](https://vitejs.dev/)**: runs the site on your computer while you work, and builds it for publishing

---

## Getting started

### 1. Install Node.js

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
3. Add the image's source to `public/images/CREDITS.md`.

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
├── index.html                  ← the single HTML page (loads the fonts)
├── .github/workflows/
│   └── download-images.yml     ← GitHub Action that runs the image download script
├── public/
│   ├── favicon.svg / .png      ← the site icon
│   └── images/                 ← the painting images (<id>.jpg) + CREDITS.md
├── scripts/
│   └── download-images.mjs     ← re-downloads the painting images
├── package.json                ← project info and packages
├── vite.config.js              ← Vite settings
└── src/
    ├── main.jsx                ← starting point: puts <App /> on the page
    ├── App.jsx                 ← list of all pages and their addresses (routes)
    ├── index.css               ← GLOBAL styles: colours, fonts, buttons, grids
    │
    ├── assets/                 ← team photos used on the About page
    │
    ├── data/
    │   ├── artworks.json       ← the 60 paintings (title, artist, image, tags…)
    │   ├── artworks.js         ← small helpers that read artworks.json
    │   └── siteData.js         ← categories, collections and the team
    │
    ├── context/
    │   ├── AuthContext.jsx     ← who is signed in (sign up / sign in / sign out)
    │   └── FavoritesContext.jsx← shares the saved paintings with every page
    │
    ├── utils/
    │   ├── assistant.js        ← connects the chat page and chat bubble to the assistant
    │   ├── fakeAI.js           ← the AI logic (search, recognition, recommendations, chat)
    │   └── recentlyViewed.js   ← remembers the paintings you opened
    │
    ├── components/             ← reusable pieces used on many pages
    │   ├── Navbar.jsx / .css
    │   ├── Footer.jsx / .css
    │   ├── ArtworkCard.jsx / .css
    │   ├── ChatWidget.jsx / .css   ← floating assistant chat bubble
    │   ├── PageLayout.jsx          ← Navbar + page + Footer
    │   ├── DashboardLayout.jsx / .css ← sidebar for signed-in pages
    │   ├── AuthLayout.jsx / .css   ← split screen for sign in / sign up
    │   ├── RequireAuth.jsx         ← sends visitors to Sign Up for account-only pages
    │   ├── ScrollAnimations.jsx    ← scroll-in animations
    │   ├── ScrollToTop.jsx
    │   ├── UserAvatar.jsx
    │   ├── PasswordInput.jsx
    │   └── Icon.jsx
    │
    └── pages/                  ← one file (and usually one CSS file) per page
        ├── Home, Explore, ArtworkDetails
        ├── Categories, CategoryDetail, About
        ├── SmartSearch, ImageRecognition, Recommendations, Assistant
        ├── Dashboard, Favorites, Collections, CollectionDetail
        ├── RecentlyViewed, Settings
        └── SignIn, SignUp, ForgotPassword, ResetPassword, NotFound
```

**Tip for beginners:** a good reading order is `App.jsx` → `components/PageLayout.jsx` → `pages/Home.jsx` → `components/ArtworkCard.jsx` → `data/artworks.json`.

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
| `/dashboard` | User dashboard 🔒 |
| `/favorites` | Favorites & collections 🔒 |
| `/collections`, `/collections/:id` | All collections, and one collection 🔒 |
| `/recently-viewed` | Paintings you opened recently 🔒 |
| `/settings` | Account settings (profile, password, preferences, delete account) 🔒 |
| `/signin`, `/signup`, `/forgot-password`, `/reset-password` | Account pages |

🔒 = needs an account (visitors are sent to Sign Up).

---

## How the AI works

All AI behaviour lives in **`src/utils/fakeAI.js`**, in four small functions that run in the browser:

| Function | Used by | What it does |
|---|---|---|
| `smartSearch(query)` | Smart Search | Understands the words in your sentence (category, medium, surface) and ranks the matching paintings |
| `analyseImage()` | Image Recognition | Shows the predicted style, category, medium, era, dominant colours and closest match for an uploaded image (this version returns a sample analysis) |
| `getRecommendations(favoriteIds)` | Recommendations, Dashboard, Details | Suggests paintings that share a category or style with your favourites |
| `getAssistantReply(message)` | Art Assistant, floating chat | Recognises what you are asking about and answers, recommending paintings where useful |

Because each page only calls these functions, the AI logic can be improved in one place without changing the pages. No API key or server is needed.

**Honest AI labelling:** anything produced by "AI" in the interface is marked with wording like *"AI prediction · not guaranteed"*, so it is never confused with verified catalogue facts.

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

- **Bodoni Moda**: headings (italic for accent words and artwork titles)
- **Commissioner**: body text, navigation and buttons
- **Poppins**: small uppercase labels, prices, dates and counts

**Screen sizes:** desktop styles first, then `@media (max-width: 1024px)` for tablet and `@media (max-width: 640px)` for mobile.

---

## Working on this project as a team

### Set your name once (so your commits count as yours)

On your own computer, run this once with **the email on your GitHub account**:

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

If the email doesn't match your GitHub account, your commits won't show on your profile or in the Contributors list.

### Daily workflow

```bash
# 1. Always start from the latest code
git checkout main
git pull

# 2. Make a branch for your task
git checkout -b feature/new-colour-filter

# 3. Save your work
git add .
git commit -m "Add a new colour filter to Explore"

# 4. Upload your branch
git push -u origin feature/new-colour-filter
```

Then open a **Pull Request** on GitHub so a teammate can review it before it is merged into `main`.

**Before you push:** run `npm run dev` and check the site still opens, so `main` always works for everyone.

### Ideas for next steps

- Add more paintings to `src/data/artworks.json` (and their images to `public/images`)
- Teach the assistant more questions and answers in `src/utils/fakeAI.js`
- Make Image Recognition analyse the uploaded photo for real
- Keep the team's details up to date in `src/data/siteData.js`

---

## Team

ArtMind AI was created by a team of six:

| Name | GitHub |
|---|---|
| Paul Ademola | [@paulademolaa](https://github.com/paulademolaa) |
| Ajimati Oluwatimilehin | [@ji-blaq](https://github.com/ji-blaq) |
| Treasure Amao | [@temzycodes](https://github.com/temzycodes) |
| Emeje James | [@sno-div](https://github.com/sno-div) |
| Louis | [@louis-d-great](https://github.com/louis-d-great) |
| Olagunju Israel | [@olagunjupopizzy-coder](https://github.com/olagunjupopizzy-coder) |

---

## Credits

- **Artwork images:** public-domain paintings from the [Art Institute of Chicago](https://www.artic.edu/) and other museums (each painting's museum is listed in `artworks.json` and on its details page). The image files in `public/images` were downloaded from [Wikimedia Commons](https://commons.wikimedia.org/), and `public/images/CREDITS.md` lists the source for each one. Titles, artists, dates and mediums come from the museums' records. The short descriptions were written for this project.
- **Fonts:** Bodoni Moda, Commissioner and Poppins from [Google Fonts](https://fonts.google.com/).
- **Icons:** [Lucide](https://lucide.dev/) and [React Icons](https://react-icons.github.io/react-icons/).
- Created for educational purposes as part of an Aptech eProject.
