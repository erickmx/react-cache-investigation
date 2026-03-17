# Performance Results - Next.js Platform

## Test Environment
- **Platform**: Next.js 14.2.0
- **Port**: 3000
- **Test Date**: March 17, 2026
- **API Endpoint**: http://localhost:3002 (api-interceptor proxy)

## Lighthouse Performance Results

### Desktop
| Metric | Score |
|--------|-------|
| Accessibility | 94 |
| Best Practices | 100 |
| SEO | 100 |
| Total Timing | 4166ms |

### Mobile
| Metric | Score |
|--------|-------|
| Accessibility | 94 |
| Best Practices | 100 |
| SEO | 100 |
| Total Timing | 3971ms |

### Audit Details
- **Passed**: 42 audits
- **Failed**: 2 audits

## API Request Analysis

### Initial Page Load
- Character list fetch: `/character?page=1`
- Episode list fetch: `/episode?page=1`

### Server-Side Rendering Behavior
Next.js uses React Server Components with server-side rendering by default.
The page fetches data on the server during SSR.

### Caching Behavior
- Next.js implements its own caching mechanism
- Data is cached on the server between requests
- The preload + composition pattern is used for data fetching

## Preload + Composition Pattern
The application uses:
- Server Components for data fetching
- Preloading data on the server
- Composition of components with shared data
- Data embedded in initial HTML response

## Notes
- API requests are made server-side during SSR
- Client-side navigation uses preloaded data
- No additional API calls needed after initial load
