# rick-and-morty-doc

Skill for working with the Rick and Morty API documentation and implementing fetch utilities.

## Usage

This skill provides guidance on:
- Rick and Morty API endpoints and parameters
- Response schemas for Characters, Episodes, and Locations
- Pagination handling
- Filtering and search parameters

## API Endpoints

### Base URL
`https://rickandmortyapi.com/api`

### Characters
- `GET /character` - Get all characters (paginated, 20 per page)
- `GET /character/{id}` - Get single character
- `GET /character/{id,id,id}` - Get multiple characters
- `GET /character/?name={name}&status={status}&...` - Filter characters

### Episodes
- `GET /episode` - Get all episodes
- `GET /episode/{id}` - Get single episode
- `GET /episode/{id,id,id}` - Get multiple episodes
- `GET /episode/?name={name}&episode={code}` - Filter episodes

## Important Notes

- All resources support pagination via `?page={number}`
- Filter parameters can be combined with `&`
- Character status values: `alive`, `dead`, `unknown`
- Character gender values: `female`, `male`, `genderless`, `unknown`
- Episode codes follow format `S01E01`
