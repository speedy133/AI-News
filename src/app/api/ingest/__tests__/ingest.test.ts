import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GET } from '../route';

// Mock Next.js Request
const mockRequest = (secret: string | null) => {
  const headers = new Headers();
  if (secret) headers.set('authorization', `Bearer ${secret}`);
  return new Request('http://localhost/api/ingest', {
    method: 'GET',
    headers,
  });
};

vi.mock('@/lib/supabase', () => ({
  createAdminClient: vi.fn().mockReturnValue({
    from: vi.fn().mockReturnThis(),
    select: vi.fn().mockReturnThis(),
    eq: vi.fn().mockResolvedValue({ data: [] }),
    insert: vi.fn().mockResolvedValue({ error: null })
  })
}));

describe('/api/ingest route', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv, CRON_SECRET: 'test-secret', NODE_ENV: 'production' };
  });

  it('returns 401 if CRON_SECRET is missing or invalid', async () => {
    const req = mockRequest('wrong-secret');
    const res = await GET(req);
    expect(res.status).toBe(401);
    
    const data = await res.json();
    expect(data.error).toBe('Unauthorized');
  });

  it('authorizes if CRON_SECRET matches', async () => {
    // In a full integration test, we would mock Supabase and fetch here.
    // Since we just want to ensure it passes authorization, we expect it to 
    // hit the Supabase logic or fetch logic (which will fail if not mocked, 
    // but the status won't be 401).
    const req = mockRequest('test-secret');
    
    // We will just mock global fetch to return an empty array to prevent actual calls
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ articles: [] })
    });

    const res = await GET(req);
    expect(res.status).not.toBe(401);
  });
});
