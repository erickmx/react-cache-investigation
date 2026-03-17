import { Suspense } from 'react';
import { getCachedCharacters, getCachedEpisodes } from 'common';
import { HomeLayout } from 'components-base';

export const dynamic = 'force-dynamic';

async function getData() {
  const [characters, episodes] = await Promise.all([
    getCachedCharacters(1),
    getCachedEpisodes(1),
  ]);

  return {
    characters: characters.results,
    episodes: episodes.results,
    totalCharacters: characters.info.count,
  };
}

export default async function HomePage() {
  const { characters, episodes, totalCharacters } = await getData();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeLayout
        characters={characters}
        episodes={episodes}
        totalCharacters={totalCharacters}
      />
    </Suspense>
  );
}
