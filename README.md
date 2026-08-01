# Shreya Gardi — Portfolio Website (Frontend + Backend)

A single-page portfolio in **lavender + baby pink**, with a Node.js/Express/MongoDB
backend that saves contact form messages to a real database.

## Structure
```
portfolio/
├── public/                          ← FRONTEND
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── assets/Shreya_Gardi_Resume.pdf
├── server/                          ← BACKEND
│   ├── server.js
│   └── .env.example
├── package.json
└── .gitignore
```

## Option A — Just view the frontend (no backend)
Open `public/index.html` directly in a browser, or use VS Code's Live Server extension.
The contact form will try the backend first; if it can't reach one, it automatically
falls back to opening your email app instead. Everything else (hero, about, skills,
projects, timeline, etc.) works with zero setup.

## Option B — Run the full stack (frontend + backend + database)
This makes the contact form actually save messages to MongoDB.

**1. Install Node.js** (v18+) from https://nodejs.org if you don't have it.

**2. Get a free MongoDB Atlas database**
   - Go to https://mongodb.com → create a free account → create a Cluster
   - Click "Connect" → "Connect your application" → copy the connection string

**3. Install dependencies** (from the `portfolio` folder):
   ```
   npm install
   ```

**4. Set up your environment variables**
   ```
   cd server
   cp .env.example .env
   ```
   Open `.env` and paste your real MongoDB connection string into `MONGODB_URI`.
   Never share or commit this file — it's already in `.gitignore`.

**5. Start the server**
   ```
   npm start
   ```
   You should see:
   ```
   Connected to MongoDB Atlas
   Server running on http://localhost:5000
   ```

**6. Open the site**
   Visit **http://localhost:5000** in your browser (Express serves the frontend
   automatically). Submit the contact form — check your terminal for a log line,
   and visit **http://localhost:5000/api/messages** to see all saved messages
   as JSON.

## Projects shown on the site
Pulled directly from your GitHub (github.com/shreyaa333):
- **MERN Blogging Platform — Inkwell** (`blog-platform-`)
- **ParkSmartly — Smart Parking App** (`parksmartly-app`)
- **Personal Portfolio Website** (`personal-portfolio-website`)

The Calculator projects (`calculator`, `calc-py`) were left out per your request.

## Things to personalize before publishing
- **Photo**: swap the initials circle in the hero (`.portrait-placeholder` in
  `public/index.html`) for a real `<img>` of yourself.
- **Project descriptions**: written from your repo READMEs — tweak wording to taste.

## Deploying
- **Frontend only**: GitHub Pages, Netlify, or Vercel — drag and drop the `public` folder.
- **Full stack**: Render, Railway, or Cyclic for the Express server (set `MONGODB_URI`
  as an environment variable there, same as your local `.env`), with MongoDB Atlas as
  the database. Update `API_BASE` in `public/script.js` if the frontend is hosted
  separately from the backend.
