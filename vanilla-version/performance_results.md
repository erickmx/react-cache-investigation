# Performance Results - Vanilla React Platform

## Test Environment
- **Platform**: React 18.2.0 with Express SSR
- **Port**: 3001
- **Test Date**: March 17, 2026
- **API Endpoint**: http://localhost:3002 (api-interceptor proxy)
- **Server**: Express with React Server Components (manual SSR)

## Lighthouse Performance Results

### Desktop
| Metric | Score |
|--------|-------|
| Accessibility | 97 |
| Best Practices | 100 |
| SEO | 91 |
| Total Timing | 4047ms |

### Mobile
| Metric | Score |
|--------|-------|
| Accessibility | 97 |
| Best Practices | 100 |
| SEO | 91 |
| Total Timing | 4035ms |

### Audit Details
- **Passed**: 34 audits
- **Failed**: 2 audits

## API Request Analysis

### Initial Page Load
- Character list fetch: `/character?page=1`
- Episode list fetch: `/episode?page=1`

### Server-Side Rendering Behavior
Vanilla React with manual SSR using Express server.
The server fetches data and renders React components to HTML.

### Caching Behavior
- In-memory caching implemented in common package
- Cache TTL: 5 minutes
- Cache keys include page number and app ID

## Preload + Composition Pattern
The application uses:
- Express server for SSR
- React components composed together
- Shared data fetching via common package
- Manual cache management

## Notes
- API requests are made server-side during SSR
- Full control over caching implementation
- No automatic caching - requires manual management
