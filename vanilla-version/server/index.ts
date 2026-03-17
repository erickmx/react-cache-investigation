import express from 'express';
import { ofetch } from 'ofetch';

const app = express();
const PORT = process.env.PORT || 3001;
const API_ENDPOINT = process.env.API_ENDPOINT || 'https://rickandmortyapi.com/api';

app.use(express.static('public'));

async function fetchApi<T>(endpoint: string): Promise<T> {
  return ofetch(`${API_ENDPOINT}${endpoint}`);
}

app.get('/', async (_req, res) => {
  try {
    const [characters, episodes] = await Promise.all([
      fetchApi<{ info: { count: number }; results: unknown[] }>('/character?page=1'),
      fetchApi<{ info: { count: number }; results: unknown[] }>('/episode?page=1'),
    ]);

    const charData = JSON.stringify(characters.results).replace(/'/g, "\\'");
    const epiData = JSON.stringify(episodes.results).replace(/'/g, "\\'");

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
    .home-layout__main { flex: 1; padding: 1.5rem; }
    .home-layout__cards { margin-top: 2rem; }
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in-up { animation: fadeInUp 0.4s ease-out forwards; opacity: 0; }
  </style>
</head>
<body>
  <div id="root" 
    data-characters='${charData}'
    data-episodes='${epiData}'
    data-total='${characters.info.count}'
  ></div>
  <script>
    window.__INITIAL_DATA__ = {
      characters: ${JSON.stringify(characters.results)},
      episodes: ${JSON.stringify(episodes.results)},
      totalCharacters: ${characters.info.count}
    };
  </script>
  <script src="/static/js/bundle.js"></script>
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
