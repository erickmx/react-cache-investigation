import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, '../../data/interceptor.db');

export const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS requests (
    requestId INTEGER PRIMARY KEY AUTOINCREMENT,
    timeRequest TEXT NOT NULL,
    url TEXT NOT NULL,
    method TEXT NOT NULL,
    headers TEXT,
    cookies TEXT,
    body TEXT
  );

  CREATE TABLE IF NOT EXISTS responses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    requestId INTEGER NOT NULL,
    status INTEGER NOT NULL,
    headers TEXT,
    cookies TEXT,
    body TEXT,
    FOREIGN KEY (requestId) REFERENCES requests(requestId)
  );

  CREATE INDEX IF NOT EXISTS idx_requests_time ON requests(timeRequest);
  CREATE INDEX IF NOT EXISTS idx_requests_url ON requests(url);
  CREATE INDEX IF NOT EXISTS idx_requests_method ON requests(method);
  CREATE INDEX IF NOT EXISTS idx_responses_request ON responses(requestId);
`);

export interface RequestRecord {
  requestId: number;
  timeRequest: string;
  url: string;
  method: string;
  headers: string | null;
  cookies: string | null;
  body: string | null;
}

export interface ResponseRecord {
  id: number;
  requestId: number;
  status: number;
  headers: string | null;
  cookies: string | null;
  body: string | null;
}

export interface QueryFilters {
  startDate?: string;
  endDate?: string;
  url?: string;
  method?: string;
  status?: number;
  limit?: number;
  offset?: number;
}

export function insertRequest(
  timeRequest: string,
  url: string,
  method: string,
  headers: Record<string, string> | null,
  cookies: Record<string, string> | null,
  body: unknown
): number {
  const stmt = db.prepare(`
    INSERT INTO requests (timeRequest, url, method, headers, cookies, body)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  const result = stmt.run(
    timeRequest,
    url,
    method,
    headers ? JSON.stringify(headers) : null,
    cookies ? JSON.stringify(cookies) : null,
    body ? JSON.stringify(body) : null
  );
  return result.lastInsertRowid as number;
}

export function insertResponse(
  requestId: number,
  status: number,
  headers: Record<string, string> | null,
  cookies: Record<string, string> | null,
  body: unknown
): void {
  const stmt = db.prepare(`
    INSERT INTO responses (requestId, status, headers, cookies, body)
    VALUES (?, ?, ?, ?, ?)
  `);
  stmt.run(
    requestId,
    status,
    headers ? JSON.stringify(headers) : null,
    cookies ? JSON.stringify(cookies) : null,
    body ? JSON.stringify(body) : null
  );
}

export function queryRequests(filters: QueryFilters): Array<RequestRecord & { response?: ResponseRecord }> {
  let sql = `
    SELECT r.*, res.id as res_id, res.status as res_status, res.headers as res_headers, 
           res.cookies as res_cookies, res.body as res_body
    FROM requests r
    LEFT JOIN responses res ON r.requestId = res.requestId
    WHERE 1=1
  `;
  const params: unknown[] = [];

  if (filters.startDate) {
    sql += ' AND r.timeRequest >= ?';
    params.push(filters.startDate);
  }
  if (filters.endDate) {
    sql += ' AND r.timeRequest <= ?';
    params.push(filters.endDate);
  }
  if (filters.url) {
    sql += ' AND r.url LIKE ?';
    params.push(`%${filters.url}%`);
  }
  if (filters.method) {
    sql += ' AND r.method = ?';
    params.push(filters.method);
  }
  if (filters.status) {
    sql += ' AND res.status = ?';
    params.push(filters.status);
  }

  sql += ' ORDER BY r.timeRequest DESC';

  if (filters.limit) {
    sql += ' LIMIT ?';
    params.push(filters.limit);
  }
  if (filters.offset) {
    sql += ' OFFSET ?';
    params.push(filters.offset);
  }

  const stmt = db.prepare(sql);
  const rows = stmt.all(...params) as Array<RequestRecord & { res_id?: number; res_status?: number; res_headers?: string; res_cookies?: string; res_body?: string }>;

  return rows.map((row): RequestRecord & { response?: ResponseRecord } => ({
    requestId: row.requestId,
    timeRequest: row.timeRequest,
    url: row.url,
    method: row.method,
    headers: row.headers,
    cookies: row.cookies,
    body: row.body,
    response: row.res_id
      ? {
          id: row.res_id,
          requestId: row.requestId,
          status: row.res_status!,
          headers: row.res_headers ?? null,
          cookies: row.res_cookies ?? null,
          body: row.res_body ?? null,
        }
      : undefined,
  }));
}

export function getRequestById(requestId: number): (RequestRecord & { response?: ResponseRecord }) | null {
  const stmt = db.prepare(`
    SELECT r.*, res.id as res_id, res.status as res_status, res.headers as res_headers,
           res.cookies as res_cookies, res.body as res_body
    FROM requests r
    LEFT JOIN responses res ON r.requestId = res.requestId
    WHERE r.requestId = ?
  `);
  const row = stmt.get(requestId) as (RequestRecord & { res_id?: number; res_status?: number; res_headers?: string; res_cookies?: string; res_body?: string }) | undefined;

  if (!row) return null;

  return {
    requestId: row.requestId,
    timeRequest: row.timeRequest,
    url: row.url,
    method: row.method,
    headers: row.headers,
    cookies: row.cookies,
    body: row.body,
    response: row.res_id
      ? {
          id: row.res_id,
          requestId: row.requestId,
          status: row.res_status!,
          headers: row.res_headers ?? null,
          cookies: row.res_cookies ?? null,
          body: row.res_body ?? null,
        }
      : undefined,
  };
}

export function getRequestStats(): { total: number; byMethod: Record<string, number>; byStatus: Record<string, number> } {
  const totalStmt = db.prepare('SELECT COUNT(*) as count FROM requests');
  const total = (totalStmt.get() as { count: number }).count;

  const methodStmt = db.prepare('SELECT method, COUNT(*) as count FROM requests GROUP BY method');
  const byMethod: Record<string, number> = {};
  for (const row of methodStmt.all() as Array<{ method: string; count: number }>) {
    byMethod[row.method] = row.count;
  }

  const statusStmt = db.prepare(`
    SELECT res.status, COUNT(*) as count 
    FROM responses res 
    GROUP BY res.status
  `);
  const byStatus: Record<string, number> = {};
  for (const row of statusStmt.all() as Array<{ status: number; count: number }>) {
    byStatus[row.status.toString()] = row.count;
  }

  return { total, byMethod, byStatus };
}