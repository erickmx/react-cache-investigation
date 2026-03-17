---
name: api-interceptor
description: API interceptor for debugging server-to-server requests. Use when you need to intercept, log, and query API requests/responses for debugging external API calls in your applications.
metadata:
  priority: 3
  docs:
    - "https://github.com/erickmx/react-cache-investigation"
  pathPatterns:
    - 'api-interceptor/**'
    - '**/interceptor*'
  bashPatterns:
    - 'api-interceptor.*(dev|start|mcp)'
    - 'node.*mcp-server'
  promptSignals:
    phrases:
      - "api interceptor"
      - "proxy server"
      - "debug api requests"
      - "log requests"
      - "sqlite query"
    minScore: 4

---

# API Interceptor

The API interceptor is a Node.js proxy server that intercepts requests to external APIs, logs them to SQLite, and provides an MCP server for AI agents to query logged requests.

## Architecture

- **Express Proxy Server**: Forwards requests to target APIs while logging them
- **SQLite Database**: Stores request/response data for easy querying
- **MCP Server**: Provides AI-accessible tools to query and analyze logged requests

## Database Schema

### Request Table
| Field | Type | Description |
|-------|------|-------------|
| requestId | INTEGER | Auto-incremented primary key |
| timeRequest | TEXT | ISO timestamp of request |
| url | TEXT | Full URL of the request |
| method | TEXT | HTTP method (GET, POST, etc.) |
| headers | TEXT | JSON string of request headers |
| cookies | TEXT | JSON string of cookies |
| body | TEXT | Request body (JSON string) |

### Response Table
| Field | Type | Description |
|-------|------|-------------|
| id | INTEGER | Auto-incremented primary key |
| requestId | INTEGER | Foreign key to request |
| status | INTEGER | HTTP status code |
| headers | TEXT | JSON string of response headers |
| cookies | TEXT | JSON string of response cookies |
| body | TEXT | Response body (JSON string) |

## Running the Server

```bash
# Start the proxy server (port 3001 by default)
cd api-interceptor
yarn dev

# Start the MCP server for AI agent integration
yarn mcp
```

## REST API Endpoints

- `GET /api/requests` - Query intercepted requests with filters
- `GET /api/requests/:id` - Get specific request by ID
- `GET /api/stats` - Get request statistics
- `GET /health` - Health check

### Query Parameters for /api/requests

| Parameter | Type | Description |
|-----------|------|-------------|
| startDate | string | Start date filter (ISO format) |
| endDate | string | End date filter (ISO format) |
| url | string | URL pattern to filter by |
| method | string | HTTP method filter |
| status | number | HTTP status code filter |
| limit | number | Max results (default 100) |
| offset | number | Pagination offset |

## MCP Server Tools

### query_requests
Query intercepted API requests with optional filters.

```typescript
// Parameters
{
  startDate?: string;  // ISO format start date
  endDate?: string;    // ISO format end date
  url?: string;        // URL pattern (partial match)
  method?: string;    // HTTP method (GET, POST, etc.)
  status?: number;    // HTTP status code
  limit?: number;     // Max results (default 100)
  offset?: number;    // Pagination offset
}
```

### get_request_by_id
Get a specific request by its ID.

```typescript
// Parameters
{
  requestId: number;  // The request ID to retrieve
}
```

### get_request_stats
Get statistics about intercepted requests.

Returns: total count, requests grouped by method, responses grouped by status code.

## Use Cases

1. **Debugging API issues**: Intercept requests to see exactly what's being sent/received
2. **Testing external APIs**: Record and replay API calls for testing
3. **Performance analysis**: Analyze response times and status codes
4. **AI-assisted debugging**: Use MCP tools to query and analyze requests via AI agents