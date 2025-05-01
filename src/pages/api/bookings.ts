import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/services/supabaseClient';

// GET: List all bookings
// POST: Create a new booking
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'GET':
      {
        const { data, error } = await supabase
          .from('bookings')
          .select('*')
          .order('start_time', { ascending: true });

        if (error) {
          return res.status(500).json({ error: error.message });
        }
        return res.status(200).json(data);
      }
    case 'POST':
      {
        const { client_id, start_time, end_time, description } = req.body;
        if (!client_id || !start_time || !end_time) {
          return res.status(400).json({ error: 'Missing required fields' });
        }
        const { data, error } = await supabase
          .from('bookings')
          .insert([{ client_id, start_time, end_time, description }])
          .single();

        if (error) {
          return res.status(500).json({ error: error.message });
        }
        return res.status(201).json(data);
      }
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
