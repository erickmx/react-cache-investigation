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
        className={`px-6 py-3 rounded-full font-semibold transition-colors ${
          activeCategory === 'characters'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        Characters
      </button>
      <button
        onClick={() => onCategoryChange('episodes')}
        className={`px-6 py-3 rounded-full font-semibold transition-colors ${
          activeCategory === 'episodes'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        Episodes
      </button>
    </div>
  );
}
