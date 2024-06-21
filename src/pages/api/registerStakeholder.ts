import { NextApiRequest, NextApiResponse } from 'next';

let stakeholders: { [key: string]: { stakeholderType: number; info: string; } } = {};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { wallet, stakeholderType, info } = req.body;

    if (!wallet || stakeholders[wallet]) {
      return res.status(400).json({ error: 'Stakeholder ya registrado o dirección inválida' });
    }

    stakeholders[wallet] = { stakeholderType, info };
    res.status(200).json({ message: 'Stakeholder registrado exitosamente' });
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
}
