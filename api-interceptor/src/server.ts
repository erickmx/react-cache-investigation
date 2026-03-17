import express, { Request, Response } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { insertRequest, insertResponse, queryRequests, getRequestById, getRequestStats, QueryFilters } from './database.js';

const app = express();
const PORT = process.env.PORT || 3001;
const TARGET_API = process.env.TARGET_API || 'https://rickandmortyapi.com';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const proxyOptions: any = {
  target: TARGET_API,
  changeOrigin: true,
  onProxyReq: (proxyReq: any, req: any) => {
    const timeRequest = new Date().toISOString();
    const url = req.originalUrl || '';
    const method = req.method || 'GET';
    const headers = req.headers as Record<string, string>;

    const requestId = insertRequest(timeRequest, url, method, headers, null, null);

    proxyReq.on('response', (proxyRes: any) => {
      let responseData = '';

      proxyRes.on('data', (chunk: Buffer) => {
        responseData += chunk.toString();
      });

      proxyRes.on('end', () => {
        const status = proxyRes.statusCode || 200;
        const responseHeaders = proxyRes.headers as Record<string, string>;
        insertResponse(requestId, status, responseHeaders, null, responseData);
      });
    });
  },
  onError: (_err: Error, _req: Request, res: Response) => {
    res.status(500).json({ error: 'Proxy error' });
  },
};

app.use('/', createProxyMiddleware(proxyOptions));

app.get('/api/requests', (req: Request, res: Response) => {
  const query = req.query as Record<string, unknown>;
  
  const getString = (val: unknown): string | undefined => {
    if (val === undefined) return undefined;
    if (Array.isArray(val)) return val[0];
    return String(val);
  };

  const filters: QueryFilters = {
    startDate: getString(query.startDate),
    endDate: getString(query.endDate),
    url: getString(query.url),
    method: getString(query.method),
    status: query.status ? parseInt(getString(query.status) || '0', 10) : undefined,
    limit: query.limit ? parseInt(getString(query.limit) || '100', 10) : 100,
    offset: query.offset ? parseInt(getString(query.offset) || '0', 10) : 0,
  };

  const results = queryRequests(filters);
  res.json(results);
});

app.get('/api/requests/:id', (req: Request, res: Response) => {
  const idParam = req.params.id;
  const id = typeof idParam === 'string' ? parseInt(idParam, 10) : 0;
  const result = getRequestById(id);

  if (!result) {
    res.status(404).json({ error: 'Request not found' });
    return;
  }

  res.json(result);
});

app.get('/api/stats', (_req: Request, res: Response) => {
  const stats = getRequestStats();
  res.json(stats);
});

app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`API Interceptor running on http://localhost:${PORT}`);
  console.log(`Proxying requests to ${TARGET_API}`);
});