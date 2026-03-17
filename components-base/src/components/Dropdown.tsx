'use client';

import { useState, useRef, useEffect } from 'react';
import { DropdownItem } from './DropdownItem';

export type DropdownOption = 'character' | 'episode';

export interface DropdownItemData {
  label: string;
  value: string;
}

export interface DropdownProps {
  label: string;
  options: DropdownItemData[];
  onSelect: (value: string, type: DropdownOption) => void;
  type: DropdownOption;
}

export function Dropdown({ label, options, onSelect, type }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleItemClick = (value: string) => {
    onSelect(value, type);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
      >
        {label}
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-50">
          {options.map((option) => (
            <DropdownItem
              key={option.value}
              label={option.label}
              value={option.value}
              onClick={handleItemClick}
            />
          ))}
        </div>
      )}
    </div>
  );
}
