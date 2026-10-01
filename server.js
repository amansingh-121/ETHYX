import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

// Explicitly serve CSS directory with strict text/css header
app.use('/css', express.static(path.join(__dirname, 'css'), {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css; charset=utf-8');
    }
  }
}));

// Explicitly serve JS directory with application/javascript header
app.use('/js', express.static(path.join(__dirname, 'js'), {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
    }
  }
}));

// Serve root static directory (HTML, favicon, etc.)
app.use(express.static(__dirname, { extensions: ['html'] }));

// Named clean routes
const pages = [
  'about',
  'bopp_tapes',
  'cart',
  'contact-us',
  'ethyx',
  'hdpe_pp_bags',
  'ldpe_bags',
  'paper_courier',
  'protective',
  'valmo',
  'wishlist'
];

pages.forEach((page) => {
  app.get(`/${page}`, (req, res) => {
    res.sendFile(path.join(__dirname, `${page}.html`));
  });
});

// Root index
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Fallback to index.html for unknown HTML paths (only for non-asset requests)
app.use((req, res, next) => {
  if (req.path.startsWith('/css/') || req.path.startsWith('/js/')) {
    return res.status(404).send('Asset not found');
  }
  res.status(404).sendFile(path.join(__dirname, 'index.html'));
});

// Start server if not running in serverless environment
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, HOST, () => {
    console.log(`Ethyx Packaging Solution server running on http://${HOST}:${PORT}`);
  });
}

export default app;
