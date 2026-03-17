export type CategoryType = 'characters' | 'episodes';

export interface CategoriesProps {
  activeCategory: CategoryType;
  onCategoryChange: (category: CategoryType) => void;
}

export function Categories({ activeCategory, onCategoryChange }: CategoriesProps) {
  return (
    <div className="flex gap-4 justify-center py-6">
      <button
        onClick={() => onCategoryChange('characters')}
        style={{ 
          backgroundColor: activeCategory === 'characters' ? '#39ff14' : '#374151',
          color: activeCategory === 'characters' ? '#0a0e17' : '#e8e6e3'
        }}
        className="px-6 py-3 rounded-full font-semibold transition-colors"
      >
        Characters
      </button>
      <button
        onClick={() => onCategoryChange('episodes')}
        style={{ 
          backgroundColor: activeCategory === 'episodes' ? '#39ff14' : '#374151',
          color: activeCategory === 'episodes' ? '#0a0e17' : '#e8e6e3'
        }}
        className="px-6 py-3 rounded-full font-semibold transition-colors"
      >
        Episodes
      </button>
    </div>
  );
}
