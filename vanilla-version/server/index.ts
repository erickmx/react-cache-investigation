import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { getCachedCharacters, getCachedEpisodes } from '../../common/src/index';
import { HomeLayout } from '../../components-base/src/components/HomeLayout';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static('public'));

app.get('/', async (_req, res) => {
  try {
    const [characters, episodes] = await Promise.all([
      getCachedCharacters(1),
      getCachedEpisodes(1),
    ]);

    const html = renderToString(
      React.createElement(HomeLayout, {
        characters: characters.results,
        episodes: episodes.results,
        totalCharacters: characters.info.count,
      })
    );

    const fullHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>React Cache Investigation - Vanilla Version</title>
  <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Exo+2:wght@400;500;600&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: 'Exo 2', sans-serif;
      background-color: #0a0e17;
      color: #e8e6e3;
    }
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    .animate-fade-in-up {
      animation: fadeInUp 0.4s ease-out forwards;
      opacity: 0;
    }
    .sidebar-scroll::-webkit-scrollbar {
      width: 6px;
    }
    .sidebar-scroll::-webkit-scrollbar-track {
      background: #0a0e17;
      border-radius: 3px;
    }
    .sidebar-scroll::-webkit-scrollbar-thumb {
      background: #39ff14;
      border-radius: 3px;
      opacity: 0.5;
    }
  </style>
</head>
<body>
  <div id="root">${html}</div>
  <script src="/static/js/bundle.js"></script>
</body>
</html>
    `;

    res.send(fullHtml);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Vanilla SSR server running at http://localhost:${PORT}`);
});
