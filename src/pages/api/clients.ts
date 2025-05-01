

import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/services/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      // Fetch all clients
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return res.status(200).json(data);
    }

    if (req.method === 'POST') {
      // Create a new client
      const { name, email, phone } = req.body;
      const { data, error } = await supabase
        .from('clients')
        .insert([{ name, email, phone }])
        .single();

      if (error) throw error;
      return res.status(201).json(data);
    }

    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (error: any) {
    console.error('API Error:', error);
    res.status(500).json({ error: error.message });
  }
}