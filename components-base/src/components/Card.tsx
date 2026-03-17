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
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
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
