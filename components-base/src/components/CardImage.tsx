export interface CardImageProps {
  src: string;
  alt?: string;
}

export function CardImage({ src, alt = 'Card image' }: CardImageProps) {
  return (
    <div className="w-full h-48 overflow-hidden">
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
      />
    </div>
  );
}
