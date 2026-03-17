import express from 'express';
import { ofetch } from 'ofetch';

const app = express();
const PORT = process.env.PORT || 3001;
const API_ENDPOINT = process.env.API_ENDPOINT || 'https://rickandmortyapi.com/api';

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
}

interface Episode {
  id: number;
  name: string;
  episode: string;
}

async function fetchApi<T>(endpoint: string): Promise<T> {
  return ofetch(`${API_ENDPOINT}${endpoint}`);
}

app.get('/', async (_req, res) => {
  try {
    const characters = await fetchApi<{ info: { count: number }; results: Character[] }>('/character?page=1');
    const episodes = await fetchApi<{ info: { count: number }; results: Episode[] }>('/episode?page=1');

    const characterCards = characters.results.slice(0, 10).map((char: Character, index: number) => `
      <div class="home-layout__card-animate" style="animation-delay: ${index * 50}ms">
        <div class="bg-[#151c2c] rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
          <img src="${char.image}" alt="${char.name}" class="w-full h-48 object-cover">
          <div class="p-4">
            <h3 class="text-lg font-semibold text-[#e8e6e3] mb-2">${char.name}</h3>
            <p class="text-sm text-[#8b9dc3]">${char.species} • ${char.status}</p>
          </div>
        </div>
      </div>
    `).join('');

    const episodeList = episodes.results.slice(0, 10).map((ep: Episode) => `
      <button class="w-full px-3 py-2 text-left font-['Exo_2'] text-sm text-[#8b9dc3] hover:text-[#e8e6e3] hover:bg-[#0a0e17]/50 rounded transition-all duration-200">
        <span class="text-[#ffbe0b] font-mono text-xs mr-2">${ep.episode}</span>
        <span class="truncate">${ep.name}</span>
      </button>
    `).join('');

    const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>React Cache Investigation - Vanilla Version</title>
  <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Exo+2:wght@400;500;600&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Exo 2', sans-serif;
      background-color: #0a0e17;
      color: #e8e6e3;
    }
    .home-layout { min-height: 100vh; }
    .home-layout__container { display: flex; }
    .home-layout__sidebar { width: 280px; min-width: 280px; background: rgba(21, 28, 44, 0.8); backdrop-filter: blur(24px); border-right: 1px solid rgba(57, 255, 20, 0.2); padding: 1rem; display: flex; flex-direction: column; gap: 1.5rem; height: calc(100vh - 280px); overflow-y: auto; }
    .home-layout__main { flex: 1; padding: 1.5rem; }
    .home-layout__cards { margin-top: 2rem; display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; }
    .home-layout__section-title { color: #39ff14; font-family: 'Orbitron', sans-serif; font-weight: 700; font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.05em; }
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .home-layout__card-animate { animation: fadeInUp 0.4s ease-out forwards; opacity: 0; }
    .sidebar-scroll::-webkit-scrollbar { width: 6px; }
    .sidebar-scroll::-webkit-scrollbar-track { background: #0a0e17; border-radius: 3px; }
    .sidebar-scroll::-webkit-scrollbar-thumb { background: #39ff14; border-radius: 3px; opacity: 0.5; }
    .home-layout__banner { height: 200px; overflow: hidden; position: relative; }
    .home-layout__banner img { width: 100%; height: 100%; object-fit: cover; }
    .home-layout__banner::after { content: ''; position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.6), transparent); }
    .home-layout__navbar { background: #1f2937; padding: 1rem 1.5rem; display: flex; justify-content: space-between; align-items: center; }
    .home-layout__logo { font-family: 'Orbitron', sans-serif; font-weight: 700; font-size: 1.25rem; color: #e8e6e3; }
    .home-layout__categories { display: flex; justify-content: center; gap: 1rem; padding: 1.5rem; }
    .home-layout__category-btn { padding: 0.75rem 1.5rem rounded-full font-semibold; transition: all 0.2s; }
    .home-layout__category-btn--active { background: #39ff14; color: #0a0e17; }
    .home-layout__category-btn--inactive { background: #374151; color: #e8e6e3; }
    .home-layout__pagination { display: flex; justify-content: center; gap: 0.5rem; padding: 2rem 0; }
    .home-layout__page-btn { padding: 0.5rem 1rem; border-radius; background: #374151; color: #e8e6e3; }
    .home-layout__page-btn:disabled { opacity: 0.5; cursor: not-allowed; }
  </style>
</head>
<body>
  <div class="home-layout">
    <nav class="home-layout__navbar">
      <div style="display: flex; gap: 1rem;">
        <button class="home-layout__category-btn home-layout__category-btn--active">Characters</button>
        <button class="home-layout__category-btn home-layout__category-btn--inactive">Episodes</button>
      </div>
      <h1 class="home-layout__logo">Rick and Morty</h1>
      <div style="display: flex; gap: 0.5rem;">
        <input type="text" placeholder="Search..." style="padding: 0.5rem 1rem; border-radius: 0.25rem; border: 1px solid #374151; background: #0a0e17; color: #e8e6e3;">
        <button style="padding: 0.5rem 1rem; background: #39ff14; color: #0a0e17; border-radius: 0.25rem; font-weight: 600;">Search</button>
      </div>
    </nav>
    <div class="home-layout__banner">
      <img src="https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=1200&h=400&fit=crop" alt="Rick and Morty Banner">
    </div>
    <div class="home-layout__container">
      <aside class="home-layout__sidebar sidebar-scroll">
        <div>
          <h3 class="home-layout__section-title">Character Status</h3>
          <button style="width: 100%; padding: 0.75rem; background: #0a0e17; border: 1px solid rgba(139, 157, 195, 0.3); border-radius: 0.5rem; color: #e8e6e3; display: flex; justify-content: space-between; align-items: center; margin-top: 0.5rem;">
            <span>All Characters</span>
            <span>▼</span>
          </button>
        </div>
        <div>
          <h3 class="home-layout__section-title">Episodes</h3>
          <button style="width: 100%; padding: 0.75rem; background: #0a0e17; border: 1px solid rgba(139, 157, 195, 0.3); border-radius: 0.5rem; color: #e8e6e3; display: flex; justify-content: space-between; align-items: center; margin-top: 0.5rem;">
            <span>All Episodes</span>
            <span>▼</span>
          </button>
        </div>
        <div style="flex: 1; overflow: hidden; display: flex; flex-direction: column;">
          <h3 class="home-layout__section-title">Episode List</h3>
          <div style="flex: 1; overflow-y: auto; margin-top: 0.5rem;">
            ${episodeList}
          </div>
        </div>
      </aside>
      <main class="home-layout__main">
        <div class="home-layout__categories">
          <button class="home-layout__category-btn home-layout__category-btn--active">Characters</button>
          <button class="home-layout__category-btn home-layout__category-btn--inactive">Episodes</button>
        </div>
        <div class="home-layout__cards">
          ${characterCards}
        </div>
        <div class="home-layout__pagination">
          <button class="home-layout__page-btn" disabled>First</button>
          <button class="home-layout__page-btn" disabled>Prev</button>
          <button class="home-layout__page-btn" style="background: #39ff14; color: #0a0e17;">1</button>
          <button class="home-layout__page-btn">2</button>
          <button class="home-layout__page-btn">3</button>
          <span style="padding: 0.5rem;">...</span>
          <button class="home-layout__page-btn">83</button>
          <button class="home-layout__page-btn">Next</button>
          <button class="home-layout__page-btn">Last</button>
        </div>
      </main>
    </div>
  </div>
</body>
</html>`;

    res.send(fullHtml);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Internal Server Error: ' + error);
  }
});

app.listen(PORT, () => {
  console.log('Vanilla SSR server running at http://localhost:' + PORT);
});
