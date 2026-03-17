'use client';

import { SearchBar } from './SearchBar';
import { Dropdown, DropdownOption, DropdownItemData } from './Dropdown';

export interface NavBarProps {
  onSearch: (query: string) => void;
  onDropdownSelect: (value: string, type: DropdownOption) => void;
}

const characterOptions: DropdownItemData[] = [
  { label: 'All Characters', value: 'all' },
  { label: 'Alive', value: 'alive' },
  { label: 'Dead', value: 'dead' },
  { label: 'Unknown', value: 'unknown' },
];

const episodeOptions: DropdownItemData[] = [
  { label: 'All Episodes', value: 'all' },
  { label: 'Season 1', value: 'season1' },
  { label: 'Season 2', value: 'season2' },
  { label: 'Season 3', value: 'season3' },
];

export function NavBar({ onSearch, onDropdownSelect }: NavBarProps) {
  return (
    <nav style={{ backgroundColor: '#1f2937' }} className="px-6 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <Dropdown
            label="Characters"
            options={characterOptions}
            onSelect={onDropdownSelect}
            type="character"
          />
          <Dropdown
            label="Episodes"
            options={episodeOptions}
            onSelect={onDropdownSelect}
            type="episode"
          />
        </div>

        <div className="flex-shrink-0">
          <h1 style={{ fontFamily: "'Orbitron', sans-serif" }} className="text-white text-xl font-bold">Rick and Morty</h1>
        </div>

        <div className="flex items-center">
          <SearchBar onSearch={onSearch} placeholder="Search..." />
        </div>
      </div>
    </nav>
  );
}
