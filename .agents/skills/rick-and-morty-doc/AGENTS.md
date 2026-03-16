# Rick and Morty API Documentation

This skill provides documentation for the Rick and Morty API.

## API Information

- **Base URL**: `https://rickandmortyapi.com/api`
- **Resources**: Characters (826), Locations (126), Episodes (51)
- **Pagination**: Up to 20 documents per page

## Endpoints

### Character
- `GET /character` - Get all characters
- `GET /character/{id}` - Get single character
- `GET /character/{ids}` - Get multiple characters
- `GET /character/?name=&status=&species=&type=&gender=` - Filter

### Episode
- `GET /episode` - Get all episodes
- `GET /episode/{id}` - Get single episode
- `GET /episode/{ids}` - Get multiple episodes
- `GET /episode/?name=&episode=` - Filter

### Location
- `GET /location` - Get all locations
- `GET /location/{id}` - Get single location
- `GET /location/{ids}` - Get multiple locations
- `GET /location/?name=&type=&dimension=` - Filter

## Response Schema

### Info Object
```typescript
interface Info {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}
```

### Character Object
```typescript
interface Character {
  id: number;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  type: string;
  gender: 'Female' | 'Male' | 'Genderless' | 'unknown';
  origin: { name: string; url: string };
  location: { name: string; url: string };
  image: string;
  episode: string[];
  url: string;
  created: string;
}
```

### Episode Object
```typescript
interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string; // e.g., "S01E01"
  characters: string[];
  url: string;
  created: string;
}
```

## Filter Parameters

### Characters
- `name`: Character name
- `status`: alive, dead, unknown
- `species`: Species name
- `type`: Type/subspecies
- `gender`: female, male, genderless, unknown

### Episodes
- `name`: Episode name
- `episode`: Episode code (S01E01)

## Library

This project uses `ofetch` for making HTTP requests. See [unjs/ofetch](https://github.com/unjs/ofetch) for library documentation.
