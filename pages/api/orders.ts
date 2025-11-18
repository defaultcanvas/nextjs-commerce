import type { NextApiRequest, NextApiResponse } from 'next';

let orders: any[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return res.status(200).json(orders);
  }
  if (req.method === 'POST') {
    const order = req.body;
    order.id = `order-${Date.now()}`;
    orders.push(order);
    return res.status(201).json(order);
  }
  res.status(405).end();
}
