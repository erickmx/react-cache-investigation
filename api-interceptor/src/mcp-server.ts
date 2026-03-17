// @ts-expect-error - MCP SDK types not available
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp';
// @ts-expect-error - MCP SDK types not available
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio';
import { z } from 'zod';
import { queryRequests, getRequestById, getRequestStats } from './database.js';

const server = new McpServer({
  name: 'api-interceptor',
  version: '1.0.0',
});

server.tool(
  'query_requests',
  'Query intercepted API requests with optional filters like date range, URL, method, and status',
  {
    startDate: z.string().optional().describe('Start date filter (ISO format)'),
    endDate: z.string().optional().describe('End date filter (ISO format)'),
    url: z.string().optional().describe('URL pattern to filter by (partial match)'),
    method: z.string().optional().describe('HTTP method filter (GET, POST, etc.)'),
    status: z.number().optional().describe('HTTP status code filter'),
    limit: z.number().optional().describe('Maximum number of results (default 100)'),
    offset: z.number().optional().describe('Offset for pagination'),
  },
  async ({ startDate, endDate, url, method, status, limit, offset }: {
    startDate?: string;
    endDate?: string;
    url?: string;
    method?: string;
    status?: number;
    limit?: number;
    offset?: number;
  }) => {
    const results = queryRequests({
      startDate,
      endDate,
      url,
      method,
      status,
      limit,
      offset,
    });

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(results, null, 2),
        },
      ],
    };
  }
);

server.tool(
  'get_request_by_id',
  'Get a specific request by its ID',
  {
    requestId: z.number().describe('The request ID to retrieve'),
  },
  async ({ requestId }: { requestId: number }) => {
    const result = getRequestById(requestId);

    if (!result) {
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({ error: 'Request not found' }, null, 2),
          },
        ],
      };
    }

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(result, null, 2),
        },
      ],
    };
  }
);

server.tool(
  'get_request_stats',
  'Get statistics about intercepted requests including total count, requests by method, and responses by status code',
  {},
  async () => {
    const stats = getRequestStats();

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(stats, null, 2),
        },
      ],
    };
  }
);

const transport = new StdioServerTransport();
server.connect(transport).catch(console.error);