import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { processChatRequest, processReportAnalysis } from './api/_lib/acousticService.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Set Permissions-Policy header to explicitly allow camera and microphone in all contexts and iframes
app.use((req, res, next) => {
  res.setHeader('Permissions-Policy', 'camera=*, microphone=*, display-capture=*');
  next();
});

// Health check
app.get('/api', (req: Request, res: Response) => {
  res.json({
    name: 'RuidoCero API',
    status: 'online',
    platform: 'Express Server',
    endpoints: [
      { path: '/api/chat', method: 'POST' },
      { path: '/api/analyze-report', method: 'POST' },
    ],
  });
});

// API endpoint for chatbot
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const result = await processChatRequest(req.body);
    return res.json(result);
  } catch (err: any) {
    console.error('Error in /api/chat:', err);
    return res.status(400).json({ error: err?.message || 'Error procesando solicitud de chat' });
  }
});

// API endpoint for Acoustic Contamination Report Analysis
app.post('/api/analyze-report', async (req: Request, res: Response) => {
  try {
    const result = await processReportAnalysis(req.body);
    return res.json(result);
  } catch (err: any) {
    console.error('Error in /api/analyze-report:', err);
    return res.status(500).json({ error: err?.message || 'Error procesando el reporte acústico' });
  }
});

async function startServer() {
  // Mount Vite middleware in development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer();

export default app;
