'use client';

import { useState, ChangeEvent, FormEvent } from 'react';

export interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export function SearchBar({ onSearch, placeholder = 'Search...' }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        style={{ backgroundColor: '#0a0e17', border: '1px solid #374151', color: '#e8e6e3' }}
        className="px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#39ff14] focus:border-transparent w-64"
      />
      <button
        type="submit"
        style={{ backgroundColor: '#39ff14', color: '#0a0e17' }}
        className="px-4 py-2 rounded-r-md hover:opacity-90 transition-opacity font-semibold"
      >
        Search
      </button>
    </form>
  );
}
