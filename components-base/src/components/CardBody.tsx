export interface CardBodyProps {
  title: string;
  description?: string;
  onSeeMore?: () => void;
}

export function CardBody({ title, description, onSeeMore }: CardBodyProps) {
  return (
    <div className="p-4">
      <h3 style={{ color: '#e8e6e3' }} className="text-lg font-semibold mb-2">{title}</h3>
      {description && (
        <p style={{ color: '#8b9dc3' }} className="text-sm mb-3 line-clamp-3">{description}</p>
      )}
      {onSeeMore && (
        <button
          onClick={onSeeMore}
          style={{ color: '#39ff14' }}
          className="hover:opacity-80 text-sm font-medium"
        >
          See more
        </button>
      )}
    </div>
  );
}
