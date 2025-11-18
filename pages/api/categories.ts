import type { NextApiRequest, NextApiResponse } from 'next';

let categories: string[] = ["men", "women", "kids", "accessories"];
let subcategories: { [cat: string]: string[] } = {
  men: ["hoodies", "tees", "joggers", "trainers"],
  women: ["hoodies", "leggings", "trainers"],
  kids: ["hoodies", "jackets", "trainers"],
  accessories: ["bags", "caps", "fragrance"],
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return res.status(200).json({ categories, subcategories });
  }
  if (req.method === 'POST') {
    const { category, subcategory } = req.body;
    if (category && !categories.includes(category)) {
      categories.push(category);
      subcategories[category] = [];
      return res.status(201).json({ category });
    }
    if (category && subcategory) {
      if (!subcategories[category]) subcategories[category] = [];
      if (!subcategories[category].includes(subcategory)) {
        subcategories[category].push(subcategory);
        return res.status(201).json({ category, subcategory });
      }
    }
    return res.status(400).json({ error: 'Invalid request' });
  }
  if (req.method === 'DELETE') {
    const { category, subcategory } = req.body;
    if (category && !subcategory) {
      categories = categories.filter(c => c !== category);
      delete subcategories[category];
      return res.status(200).json({ success: true });
    }
    if (category && subcategory) {
      subcategories[category] = (subcategories[category] || []).filter(s => s !== subcategory);
      return res.status(200).json({ success: true });
    }
    return res.status(400).json({ error: 'Invalid request' });
  }
  res.status(405).end();
}
