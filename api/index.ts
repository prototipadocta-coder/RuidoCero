export default function handler(req: any, res: any) {
  res.status(200).json({
    name: 'RuidoCero API',
    status: 'online',
    platform: 'Vercel Serverless Functions',
    endpoints: [
      { path: '/api/chat', method: 'POST', description: 'Consultas al asistente acústico' },
      { path: '/api/analyze-report', method: 'POST', description: 'Auditoría y análisis legal de reportes acústicos' },
    ],
    timestamp: new Date().toISOString(),
  });
}
