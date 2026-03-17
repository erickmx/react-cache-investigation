import { useState } from 'react';
import type { Episode } from 'common';

export interface SidebarProps {
  episodes: Episode[];
  onCharacterFilterChange?: (status: string) => void;
  onEpisodeFilterChange?: (episodeCode: string) => void;
  selectedCharacterStatus?: string;
  selectedEpisodeCode?: string;
}

const characterStatusOptions = [
  { label: 'All Characters', value: 'all' },
  { label: 'Alive', value: 'alive' },
  { label: 'Dead', value: 'dead' },
  { label: 'Unknown', value: 'unknown' },
];

const seasonOptions = [
  { label: 'All Episodes', value: 'all' },
  { label: 'Season 1', value: 'S01' },
  { label: 'Season 2', value: 'S02' },
  { label: 'Season 3', value: 'S03' },
];

function getSeasonFromEpisode(episode: string): string {
  const match = episode.match(/S(\d+)E\d+/);
  return match ? `S${match[1].padStart(2, '0')}` : '';
}

export function Sidebar({
  episodes,
  onCharacterFilterChange,
  onEpisodeFilterChange,
  selectedCharacterStatus = 'all',
  selectedEpisodeCode = 'all',
}: SidebarProps) {
  const [isCharacterDropdownOpen, setIsCharacterDropdownOpen] = useState(false);
  const [isEpisodeDropdownOpen, setIsEpisodeDropdownOpen] = useState(false);

  const filteredEpisodes = selectedEpisodeCode === 'all'
    ? episodes
    : episodes.filter(ep => getSeasonFromEpisode(ep.episode) === selectedEpisodeCode);

  const selectedCharacterLabel = characterStatusOptions.find(
    opt => opt.value === selectedCharacterStatus
  )?.label || 'All Characters';

  const selectedEpisodeLabel = seasonOptions.find(
    opt => opt.value === selectedEpisodeCode
  )?.label || 'All Episodes';

  return (
    <aside className="w-72 min-w-[280px] bg-[#151c2c]/80 backdrop-blur-xl border-r border-[#39ff14]/20 p-4 flex flex-col gap-6 h-full overflow-y-auto sidebar-scroll">
      <div className="space-y-2">
        <h3 className="text-[#39ff14] font-['Orbitron'] font-bold text-sm uppercase tracking-wider">
          Character Status
        </h3>
        <div className="relative">
          <button
            onClick={() => {
              setIsCharacterDropdownOpen(!isCharacterDropdownOpen);
              setIsEpisodeDropdownOpen(false);
            }}
            className="w-full px-4 py-3 bg-[#0a0e17] border border-[#8b9dc3]/30 rounded-lg text-[#e8e6e3] font-['Exo_2'] flex items-center justify-between hover:border-[#39ff14]/50 transition-all duration-300"
          >
            <span>{selectedCharacterLabel}</span>
            <svg
              className={`w-4 h-4 transition-transform ${isCharacterDropdownOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {isCharacterDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-[#151c2c] border border-[#8b9dc3]/30 rounded-lg overflow-hidden z-50 shadow-[0_0_20px_rgba(57,255,20,0.1)]">
              {characterStatusOptions.map(option => (
                <button
                  key={option.value}
                  onClick={() => {
                    onCharacterFilterChange?.(option.value);
                    setIsCharacterDropdownOpen(false);
                  }}
                  className={`w-full px-4 py-3 text-left font-['Exo_2'] transition-colors ${
                    selectedCharacterStatus === option.value
                      ? 'bg-[#39ff14]/20 text-[#39ff14]'
                      : 'text-[#e8e6e3] hover:bg-[#0a0e17]'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-[#39ff14] font-['Orbitron'] font-bold text-sm uppercase tracking-wider">
          Episodes
        </h3>
        <div className="relative">
          <button
            onClick={() => {
              setIsEpisodeDropdownOpen(!isEpisodeDropdownOpen);
              setIsCharacterDropdownOpen(false);
            }}
            className="w-full px-4 py-3 bg-[#0a0e17] border border-[#8b9dc3]/30 rounded-lg text-[#e8e6e3] font-['Exo_2'] flex items-center justify-between hover:border-[#39ff14]/50 transition-all duration-300"
          >
            <span>{selectedEpisodeLabel}</span>
            <svg
              className={`w-4 h-4 transition-transform ${isEpisodeDropdownOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {isEpisodeDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-[#151c2c] border border-[#8b9dc3]/30 rounded-lg overflow-hidden z-50 shadow-[0_0_20px_rgba(57,255,20,0.1)]">
              {seasonOptions.map(option => (
                <button
                  key={option.value}
                  onClick={() => {
                    onEpisodeFilterChange?.(option.value);
                    setIsEpisodeDropdownOpen(false);
                  }}
                  className={`w-full px-4 py-3 text-left font-['Exo_2'] transition-colors ${
                    selectedEpisodeCode === option.value
                      ? 'bg-[#39ff14]/20 text-[#39ff14]'
                      : 'text-[#e8e6e3] hover:bg-[#0a0e17]'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2 flex-1 overflow-hidden flex flex-col">
        <h3 className="text-[#39ff14] font-['Orbitron'] font-bold text-sm uppercase tracking-wider">
          Episode List
        </h3>
        <div className="flex-1 overflow-y-auto space-y-1 pr-2 sidebar-scroll">
          {filteredEpisodes.slice(0, 10).map((episode) => (
            <button
              key={episode.id}
              onClick={() => onEpisodeFilterChange?.(episode.episode)}
              className="w-full px-3 py-2 text-left font-['Exo_2'] text-sm text-[#8b9dc3] hover:text-[#e8e6e3] hover:bg-[#0a0e17]/50 rounded transition-all duration-200"
            >
              <span className="text-[#ffbe0b] font-mono text-xs mr-2">
                {episode.episode}
              </span>
              <span className="truncate">{episode.name}</span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
