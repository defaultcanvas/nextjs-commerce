import type { NextApiRequest, NextApiResponse } from 'next';

let products: any[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return res.status(200).json(products);
  }
  if (req.method === 'POST') {
    const product = req.body;
    product.id = `${product.category}-${product.subcategory}-${Date.now()}`;
    products.push(product);
    return res.status(201).json(product);
  }
  if (req.method === 'PUT') {
    const { id, ...rest } = req.body;
    products = products.map(p => p.id === id ? { ...p, ...rest } : p);
    return res.status(200).json({ success: true });
  }
  if (req.method === 'DELETE') {
    const { id } = req.body;
    products = products.filter(p => p.id !== id);
    return res.status(200).json({ success: true });
  }
  res.status(405).end();
}
