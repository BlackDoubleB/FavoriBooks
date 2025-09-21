const API_URL = 'https://www.googleapis.com/books/v1/volumes';

module.exports = async function (req, res) {
  // CORS para local
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const q = String(req.query.q ?? '');
    const maxResults = Number(req.query.maxResults ?? 10);
    if (!q) return res.status(400).json({ error: 'Missing query param "q"' });

    const key = process.env['GOOGLE_BOOKS_API_KEY'];
    if (!key) return res.status(500).json({ error: 'Missing GOOGLE_BOOKS_API_KEY' });

    const url = `${API_URL}?q=${encodeURIComponent(q)}&maxResults=${maxResults}&key=${key}`;
    const r = await fetch(url);
    const data = await r.json();
    return res.status(r.status).json(data);
  } catch (err) {
    return res.status(500).json({ error: err?.message ?? 'Unexpected error' });
  }
};
