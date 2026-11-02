import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

function geminiRelay(env) {
  const model = env.GEMINI_MODEL || 'gemini-3.5-flash';

  async function handle(req, res) {
    res.setHeader('Content-Type', 'application/json');

    if (!env.GEMINI_API_KEY) {
      res.statusCode = 503;
      res.end(JSON.stringify({ error: 'no-key' }));
      return;
    }

    let body = '';
    for await (const chunk of req) body += chunk;

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': env.GEMINI_API_KEY },
        body,
      });
      res.statusCode = response.status;
      res.end(await response.text());
    } catch (error) {
      res.statusCode = 502;
      res.end(JSON.stringify({ error: 'unreachable' }));
    }
  }

  const attach = (server) => {
    server.middlewares.use('/api/gemini', (req, res, next) => (req.method === 'POST' ? handle(req, res) : next()));
  };

  return { name: 'gemini-relay', configureServer: attach, configurePreviewServer: attach };
}

export default defineConfig(({ mode }) => ({
  plugins: [react(), geminiRelay(loadEnv(mode, process.cwd(), ''))],
}));
