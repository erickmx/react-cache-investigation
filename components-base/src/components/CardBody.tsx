export interface CardBodyProps {
  title: string;
  description?: string;
  onSeeMore?: () => void;
}

export function CardBody({ title, description, onSeeMore }: CardBodyProps) {
  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      {description && (
        <p className="text-gray-600 text-sm mb-3 line-clamp-3">{description}</p>
      )}
      {onSeeMore && (
        <button
          onClick={onSeeMore}
          className="text-blue-500 hover:text-blue-600 text-sm font-medium"
        >
          See more
        </button>
      )}
    </div>
  );
}
