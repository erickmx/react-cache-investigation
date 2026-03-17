import { HomeLayout } from 'components-base';
import type { Character, Episode } from 'common';

export interface HomeLayoutClientProps {
  characters: Character[];
  episodes: Episode[];
  totalCharacters?: number;
}

export default function HomeLayoutClient({
  characters,
  episodes,
  totalCharacters,
}: HomeLayoutClientProps) {
  return (
    <HomeLayout
      characters={characters}
      episodes={episodes}
      totalCharacters={totalCharacters}
    />
  );
}
