export interface HeaderBannerProps {
  imageUrl?: string;
  altText?: string;
}

export function HeaderBanner({ 
  imageUrl = 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=1200&h=400&fit=crop', 
  altText = 'Rick and Morty Banner' 
}: HeaderBannerProps) {
  return (
    <div className="w-full h-48 md:h-64 overflow-hidden relative">
      <img
        src={imageUrl}
        alt={altText}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
    </div>
  );
}
