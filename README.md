# react-cache-investigation

Application as investment to deep dive in the functionalities of React cache and how it interacts with different Server component applications like vanilla React, Next.js or Astro

---

## Performance Testing Results

### Overview

This document summarizes the performance testing conducted across three platforms using the preload + composition pattern strategy with React cache.

### Platforms Tested

| Platform | Port | Framework | SSR Approach |
|----------|------|-----------|--------------|
| Next.js | 3000 | Next.js 14.2.0 | React Server Components |
| Astro | 4321 | Astro 4.16.19 | Node.js Adapter (SSR) |
| Vanilla | 3001 | React 18.2.0 + Express | Manual SSR |

---

## Lighthouse Performance Comparison

### Desktop Results

| Platform | Accessibility | Best Practices | SEO | Total Timing |
|----------|---------------|----------------|-----|--------------|
| **Next.js** | 94 | 100 | 100 | 4166ms |
| **Astro** | 89 | 96 | 91 | 3919ms |
| **Vanilla** | 97 | 100 | 91 | 4047ms |

### Mobile Results

| Platform | Accessibility | Best Practices | SEO | Total Timing |
|----------|---------------|----------------|-----|--------------|
| **Next.js** | 94 | 100 | 100 | 3971ms |
| **Astro** | 89 | 92 | 91 | 4308ms |
| **Vanilla** | 97 | 100 | 91 | 4035ms |

### Audit Summary

| Platform | Desktop Passed | Desktop Failed | Mobile Passed | Mobile Failed |
|----------|---------------|----------------|---------------|---------------|
| **Next.js** | 42 | 2 | 42 | 2 |
| **Astro** | 32 | 4 | 31 | 5 |
| **Vanilla** | 34 | 2 | 34 | 2 |

---

## Preload + Composition Pattern Analysis

### Pattern Description

The preload + composition pattern involves:
1. **Preloading**: Fetching data on the server during SSR
2. **Composition**: Passing preloaded data as props to components
3. **Caching**: Using React cache or in-memory caching for data reuse

### Platform-Specific Implementation

#### Next.js
- Uses React Server Components (RSC)
- Server-side data fetching with `async` components
- Automatic caching of server components
- Data preloaded during SSR and passed to client
- **Best Practices score**: 100 (both desktop and mobile)
- **SEO score**: 100 (both desktop and mobile)

#### Astro
- Server-side rendering via Node adapter
- Data fetching in component frontmatter
- React components hydrated on client
- Server-rendered HTML includes preloaded data
- Island architecture for partial hydration
- **Lower scores due to SEO and accessibility issues**

#### Vanilla React
- Express server handles SSR
- In-memory caching with 5-minute TTL
- Manual data fetching and caching
- React components composed with preloaded data
- **Highest Accessibility score**: 97

---

## API Request Behavior

### Initial Page Load

Each platform makes the following API requests on initial load:

1. **Character List**: `/character?page=1`
2. **Episode List**: `/episode?page=1`

### Server-Side vs Client-Side

- **All platforms**: API requests are made server-side during SSR
- **Browser network tab**: Only shows static assets and hot updates
- **Preload pattern**: Data is embedded in initial HTML response

### Caching Impact

With the preload + composition pattern:

- **Server-side caching**: Reduces redundant API calls
- **Client-side navigation**: Data is already preloaded, no additional API calls needed
- **Cache TTL**: 5 minutes for in-memory cache (Vanilla)

### Expected API Call Reduction

By using the preload + composition pattern:
- Initial page load: 2 API calls (unavoidable)
- Subsequent navigations: 0 API calls (data preloaded)
- Cache hits: 0 API calls (within TTL)

---

## Performance Analysis

### Next.js
**Strengths:**
- Automatic code splitting
- Built-in caching mechanisms
- RSC reduces client-side JavaScript
- Streaming and suspense support
- **Best SEO and Best Practices scores**

**Considerations:**
- Server Component data not shared with Client Components without serialization

### Astro
**Strengths:**
- Zero JavaScript by default
- Partial hydration for interactive components
- Static output option available
- Island architecture
- **Fastest desktop timing**: 3919ms

**Considerations:**
- Full page SSR for dynamic content
- Client-side hydration adds JavaScript
- **Lower accessibility and SEO scores**

### Vanilla React
**Strengths:**
- Full control over caching strategy
- Simple to understand and debug
- No framework overhead
- **Highest Accessibility score**: 97
- Consistent Best Practices score: 100

**Considerations:**
- Manual SSR implementation required
- Cache management is manual

---

## Conclusion

### Performance Winner
- **Desktop**: Astro (fastest at 3919ms)
- **Mobile**: Next.js (fastest at 3971ms)
- **Best Practices**: Next.js & Vanilla (100 both)
- **SEO**: Next.js (100 both)
- **Accessibility**: Vanilla (97 both)

### Preload + Composition Effectiveness

The preload + composition pattern successfully:
1. Fetches data on the server during SSR
2. Embeds preloaded data in initial HTML response
3. Eliminates client-side data fetching on navigation
4. Reduces API calls to 2 per page load (initial only)

All three platforms successfully implement this pattern with different approaches:
- **Next.js**: Automatic with React Server Components
- **Astro**: Via frontmatter data fetching  
- **Vanilla**: Manual implementation with in-memory cache

### Recommendation

- **For best SEO/Best Practices**: Use Next.js
- **For fastest initial load**: Use Astro (with static adapter)
- **For maximum control**: Use Vanilla React with manual SSR
- **For accessibility**: All platforms perform well (89-97)
