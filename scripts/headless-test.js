const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  const out = [];
  const browser = await puppeteer.launch({ args: ['--no-sandbox','--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(30000);

  page.on('console', (msg) => {
    const type = msg.type();
    const text = msg.text();
    const location = msg.location ? msg.location() : {};
    out.push({ kind: 'console', type, text, location });
    console.log('PAGE LOG:', type, text);
  });

  page.on('pageerror', (err) => {
    out.push({ kind: 'pageerror', message: err.message, stack: err.stack });
    console.error('PAGE ERROR:', err.message);
  });

  page.on('response', (res) => {
    if (res.status() >= 400) {
      out.push({ kind: 'response', url: res.url(), status: res.status() });
      console.warn('BAD RESPONSE:', res.status(), res.url());
    }
  });

  const base = 'http://localhost:3001';

  // Gather product id from file-backed store if present
  let productId = null;
  try {
    const storeFile = path.resolve(process.cwd(), '.local_admin_store.json');
    if (fs.existsSync(storeFile)) {
      const store = JSON.parse(fs.readFileSync(storeFile,'utf8')||'{}');
      const key = store['nextjs-commerce-admin'];
      if (key && Array.isArray(key.products) && key.products.length>0) {
        productId = key.products[0].id;
      }
    }
  } catch (e) {}

  const pages = [ '/', '/admin', '/categories', '/shop/men/hoodies' ];
  if (productId) pages.push(`/product/${encodeURIComponent(productId)}`);

  for (const p of pages) {
    try {
      console.log('Visiting', base + p);
      const res = await page.goto(base + p, { waitUntil: ['networkidle0','domcontentloaded'] });
      out.push({ kind: 'visit', url: base+p, status: res && res.status ? res.status() : null });
      // wait an extra moment for client-side logs
      await new Promise((r) => setTimeout(r, 500));
    } catch (err) {
      console.error('Navigation error', p, err.message);
      out.push({ kind: 'naverror', url: p, message: err.message });
    }
  }

  await browser.close();
  const file = path.resolve(process.cwd(), 'tmp-headless-log.json');
  fs.writeFileSync(file, JSON.stringify(out, null, 2), 'utf8');
  console.log('Saved headless logs to', file);
  // Exit with non-zero if any console/pageerror found
  const hasError = out.some(o => (o.kind === 'console' && (o.type === 'error' || o.type === 'warning')) || o.kind === 'pageerror' || (o.kind === 'response' && o.status >= 500));
  if (hasError) {
    console.error('Headless detected errors/warnings — see tmp-headless-log.json');
    process.exit(2);
  }
  process.exit(0);
})();
