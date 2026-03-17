import { ReactNode } from 'react';
import { CardImage } from './CardImage';
import { CardBody } from './CardBody';

export interface CardProps {
  image?: string;
  imageAlt?: string;
  title: string;
  description?: string;
  onSeeMore?: () => void;
  children?: ReactNode;
}

export function Card({ 
  image, 
  imageAlt = 'Card image', 
  title, 
  description, 
  onSeeMore,
  children 
}: CardProps) {
  return (
    <div style={{ backgroundColor: '#151c2c' }} className="rounded-lg shadow-md overflow-hidden hover:shadow-[0_0_20px_rgba(57,255,20,0.3)] transition-all">
      {image && <CardImage src={image} alt={imageAlt} />}
      {children || (
        <CardBody 
          title={title} 
          description={description} 
          onSeeMore={onSeeMore} 
        />
      )}
    </div>
  );
}
