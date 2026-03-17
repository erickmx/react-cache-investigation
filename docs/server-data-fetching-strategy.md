# Server Data Fetching Strategy

## Overview

This document describes the server data fetching strategy implemented across all three application versions (Next.js, Astro, Vanilla) in the react-cache-investigation monorepo.

## Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         Rick and Morty API                         │
└─────────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      COMMON PACKAGE                                │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  Cached Fetch Functions (React cache())                     │   │
│  │  • getCachedCharacters(page) - memoized character fetch    │   │
│  │  • getCachedEpisodes(page) - memoized episode fetch        │   │
│  └─────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│                   COMPONENTS-BASE PACKAGE                          │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  UI Components                                             │   │
│  │  • HomeLayout - Main layout container                      │   │
│  │  • Sidebar - Episode & character filters                    │   │
│  │  • CardGrid, Card, NavBar, HeaderBanner, Categories...     │   │
│  └─────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
                                  │
          ┌───────────────────────┼───────────────────────┐
          ▼                       ▼                       ▼
┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐
│   NEXT.JS       │   │     ASTRO       │   │    VANILLA      │
│   VERSION       │   │    VERSION      │   │    VERSION      │
│                 │   │                 │   │                 │
│ • Server Comp   │   │ • Server Island │ │ • Express SSR   │
│ • 'use cache'  │   │ • client:visible│ │ • renderToString│
│ • Parallel     │   │ • Parallel fetch│ │ • Parallel fetch│
│   fetching     │   │   (server-side) │   │   (server-side) │
└─────────────────┘   └─────────────────┘   └─────────────────┘
```

## Data Flow

### 1. API Requests (Common Package)

The `common/src/index.ts` provides cached versions of fetch functions using React's `cache()` function:

```typescript
import { cache } from 'react';

const getCharactersFromAPI = async (page: number) => {
  return getAllCharacters(page);
};

export const getCachedCharacters = cache(getCharactersFromAPI);
export const getCachedEpisodes = cache(async (page: number) => {
  return getAllEpisodes(page);
});
```

**Why React cache?**
- Prevents duplicate API requests within the same render pass
- Memoizes expensive network calls
- Works seamlessly with Server Components

### 2. Component Composition (Components-Base)

The `HomeLayout` component composes all UI elements:

```
┌────────────────────────────────────────────────────────┐
│                      NavBar                            │
│  [Characters ▼] [Episodes ▼]        [Rick & Morty]   │
├────────────────────────────────────────────────────────┤
│                   HeaderBanner                        │
│              [Hero Image Area]                        │
├──────────────┬─────────────────────────────────────────┤
│              │              Categories                │
│   Sidebar    │        [Characters] [Episodes]        │
│              ├─────────────────────────────────────────┤
│  Episodes    │              CardGrid                  │
│  └ S1        │  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐    │
│  └ S2        │  │Card │ │Card │ │Card │ │Card │    │
│  └ S3        │  └─────┘ └─────┘ └─────┘ └─────┘    │
│              │                                         │
│  Characters  │                                         │
│  └ All       │                                         │
│  └ Alive    ├─────────────────────────────────────────┤
│  └ Dead     │              Pagination                  │
│  └ Unknown  │           [< 1 2 3 ... >]               │
└──────────────┴─────────────────────────────────────────┘
```

### 3. App-Specific Implementations

#### Next.js (Server Components + Preload Pattern)

```typescript
// src/app/page.tsx
import { getCachedCharacters, getCachedEpisodes } from '@Package/common';
import { HomeLayout } from '@Package/components-base';

export default async function HomePage() {
  // Parallel fetching - preload pattern
  const [characters, episodes] = await Promise.all([
    getCachedCharacters(1),
    getCachedEpisodes(1),
  ]);

  return (
    <HomeLayout
      characters={characters.results}
      episodes={episodes.results}
    />
  );
}
```

**Caching Strategy:**
- `'use cache'` directive for component-level caching
- `cacheLife('hours')` - cache data for hours
- React cache for request deduplication

#### Astro (Server Island Pattern)

```astro
---
// src/pages/index.astro
import HomeLayoutClient from '../components/HomeLayoutClient';
import { getCachedCharacters, getCachedEpisodes } from '@Package/common';

// Server-side data fetching
const [characters, episodes] = await Promise.all([
  getCachedCharacters(1),
  getCachedEpisodes(1),
]);
---

<HomeLayoutClient
  client:visible
  characters={characters.results}
  episodes={episodes.results}
/>
```

**Server Island Approach:**
- Data fetched at build/request time in `.astro` frontmatter
- React component hydrates client-side with `client:visible`
- Interactive components (dropdowns, pagination) work after hydration

#### Vanilla (Custom SSR with Express)

```typescript
// server/index.ts
import express from 'express';
import { renderToString } from 'react-dom/server';
import { getCachedCharacters, getCachedEpisodes } from '@Package/common';

const app = express();

app.get('/', async (req, res) => {
  // Server-side data fetching
  const [characters, episodes] = await Promise.all([
    getCachedCharacters(1),
    getCachedEpisodes(1),
  ]);

  // Render to HTML
  const html = renderToString(
    <HomeLayout
      characters={characters.results}
      episodes={episodes.results}
    />
  );

  res.send(`<!DOCTYPE html>...${html}...`);
});
```

## Design System

### Color Palette (Cosmic/Space Theme)

| Role | Color | Hex |
|------|-------|-----|
| Background (Deep) | Space Navy | `#0a0e17` |
| Background (Card) | Dark Slate | `#151c2c` |
| Primary Accent | Electric Green | `#39ff14` |
| Secondary Accent | Warm Amber | `#ffbe0b` |
| Text Primary | Off White | `#e8e6e3` |
| Text Secondary | Muted Gray | `#8b9dc3` |
| Danger | Crimson | `#ff3860` |
| Status: Alive | Lime | `#39ff14` |
| Status: Dead | Crimson | `#ff3860` |
| Status: Unknown | Gray | `#6b7280` |

### Typography

| Element | Font | Weight |
|---------|------|--------|
| Headings | Orbitron | 700, 900 |
| Body | Exo 2 | 400, 500, 600 |
| Mono/Code | JetBrains Mono | 400 |

### Effects

- **Card hover**: Subtle glow with green accent (`box-shadow: 0 0 20px rgba(57, 255, 20, 0.3)`)
- **Page load**: Staggered fade-in animation (50ms delay per element)
- **Sidebar**: Glassmorphism effect (`backdrop-filter: blur(10px)`)
- **Buttons**: Scale transform on hover (1.02)

## File Structure

```
react-cache-investigation/
├── common/
│   └── src/
│       ├── index.ts          # Cached fetch functions
│       └── types.ts          # TypeScript interfaces
├── components-base/
│   └── src/
│       ├── index.ts          # Exports
│       └── components/
│           ├── HomeLayout.tsx    # Main layout
│           ├── Sidebar.tsx       # Filters
│           ├── CardGrid.tsx      # Existing
│           ├── Card.tsx          # Existing
│           └── ...
├── nextjs-version/
│   └── src/app/
│       └── page.tsx          # Server Component with data fetch
├── astro-version/
│   ├── src/
│   │   ├── components/
│   │   │   └── HomeLayoutClient.tsx  # React island
│   │   └── pages/
│   │       └── index.astro    # Server-side data
│   └── astro.config.mjs
└── vanilla-version/
    ├── server/
    │   └── index.ts           # Express SSR
    └── src/
        └── index.tsx         # Client entry
```

## API Endpoints Used

| Endpoint | Description | Used In |
|----------|-------------|---------|
| `/character?page={n}` | Get paginated characters | CardGrid (10 per page) |
| `/episode?page={n}` | Get paginated episodes | Sidebar (first 10) |

## Performance Considerations

1. **Parallel Fetching**: Use `Promise.all` to fetch characters and episodes simultaneously
2. **React Cache**: Memoize API calls to avoid duplicate requests
3. **Next.js Caching**: Use `'use cache'` + `cacheLife()` for appropriate TTL
4. **Astro Islands**: Only hydrate interactive components
5. **Vanilla SSR**: Fetch data once on server, send hydrated HTML to client

## Testing Strategy

Each implementation should verify:
- [ ] Characters display correctly (10 items)
- [ ] Episodes display in sidebar (10 items)
- [ ] Dropdown filters work
- [ ] Categories toggle works
- [ ] Pagination renders (non-functional for now)
- [ ] No duplicate API requests (check network tab)
