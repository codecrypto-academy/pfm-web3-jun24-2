import { NextApiRequest, NextApiResponse } from 'next';

let stakeholders: { [key: string]: { stakeholderType: number; info: string; } } = {};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { wallet } = req.query;

  if (typeof wallet !== 'string' || !stakeholders[wallet]) {
    return res.status(200).json({ registered: false });
  }

  res.status(200).json({ registered: true, stakeholder: stakeholders[wallet] });
}
