# Performance Results - Astro Platform

## Test Environment
- **Platform**: Astro 4.16.19
- **Port**: 4321
- **Test Date**: March 17, 2026
- **API Endpoint**: http://localhost:3002 (api-interceptor proxy)
- **Adapter**: @astrojs/node (standalone mode)

## Lighthouse Performance Results

### Desktop
| Metric | Score |
|--------|-------|
| Accessibility | 89 |
| Best Practices | 96 |
| SEO | 91 |
| Total Timing | 3919ms |

### Mobile
| Metric | Score |
|--------|-------|
| Accessibility | 89 |
| Best Practices | 92 |
| SEO | 91 |
| Total Timing | 4308ms |

### Audit Details
- **Passed**: 32 audits (desktop), 31 audits (mobile)
- **Failed**: 4 audits (desktop), 5 audits (mobile)

## API Request Analysis

### Initial Page Load
- Character list fetch: `/character?page=1`
- Episode list fetch: `/episode?page=1`

### Server-Side Rendering Behavior
Astro uses a static-first approach with optional SSR.
This configuration uses server-side rendering via Node adapter.

### Caching Behavior
- Astro can cache entire pages or individual components
- React components are hydrated on the client
- Data fetched during SSR is embedded in the initial HTML

## Preload + Composition Pattern
The application uses:
- Astro's data fetching in frontmatter
- React components for interactive elements
- Server-rendered data passed as props to components
- Island architecture for partial hydration

## Notes
- API requests are made server-side during SSR
- Partial hydration means less JavaScript on client
- Best for static content with dynamic islands
