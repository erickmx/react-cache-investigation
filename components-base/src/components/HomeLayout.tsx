'use client';

import { useState } from 'react';
import type { Character, Episode } from 'common';
import { NavBar } from './NavBar';
import { HeaderBanner } from './HeaderBanner';
import { Sidebar } from './Sidebar';
import { Categories, type CategoryType } from './Categories';
import { CardGrid } from './CardGrid';
import { Card } from './Card';
import { PaginationFooter } from './PaginationFooter';
import './HomeLayout.css';

export interface HomeLayoutProps {
  characters: Character[];
  episodes: Episode[];
  totalCharacters?: number;
}

export function HomeLayout({
  characters,
  episodes,
  totalCharacters,
}: HomeLayoutProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('characters');
  const [selectedCharacterStatus, setSelectedCharacterStatus] = useState('all');
  const [selectedEpisodeCode, setSelectedEpisodeCode] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil((totalCharacters || characters.length) / itemsPerPage);

  const handleSearch = (query: string) => {
    console.log('Search:', query);
  };

  const handleDropdownSelect = (value: string, type: string) => {
    console.log('Dropdown select:', value, type);
  };

  const handleCategoryChange = (category: CategoryType) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  const handleCharacterFilterChange = (status: string) => {
    setSelectedCharacterStatus(status);
    setCurrentPage(1);
  };

  const handleEpisodeFilterChange = (episodeCode: string) => {
    setSelectedEpisodeCode(episodeCode);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const filteredCharacters = characters.filter(character => {
    if (selectedCharacterStatus === 'all') return true;
    return character.status.toLowerCase() === selectedCharacterStatus;
  });

  const paginatedCharacters = filteredCharacters.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="home-layout">
      <NavBar onSearch={handleSearch} onDropdownSelect={handleDropdownSelect} />
      
      <HeaderBanner 
        imageUrl="https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=1200&h=400&fit=crop"
        altText="Rick and Morty Banner"
      />

      <div className="home-layout__container">
        <Sidebar
          episodes={episodes}
          onCharacterFilterChange={handleCharacterFilterChange}
          onEpisodeFilterChange={handleEpisodeFilterChange}
          selectedCharacterStatus={selectedCharacterStatus}
          selectedEpisodeCode={selectedEpisodeCode}
        />

        <main className="home-layout__main">
          <Categories
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />

          <div className="home-layout__cards">
            <CardGrid columns={4}>
              {paginatedCharacters.map((character, index) => (
                <div
                  key={character.id}
                  className="home-layout__card-animate"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <Card
                    image={character.image}
                    imageAlt={character.name}
                    title={character.name}
                    description={`${character.species} • ${character.status}`}
                  />
                </div>
              ))}
            </CardGrid>
          </div>

          <PaginationFooter
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </main>
      </div>
    </div>
  );
}
