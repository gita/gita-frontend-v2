import express from 'express';
import path from 'path';
import next from 'next';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Serve index.html when someone navigates to /app
  server.get('/app', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/app/index.html'));
  });

  // Serve other static files under /app
  server.use('/app', express.static(path.join(__dirname, 'public/app')));

  // Handle Next.js routes
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, (err?: any) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});
