import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../services/supabaseClient';

type Payment = {
  id?: number;
  client_id: number;
  amount: number;
  method: string;
  status: string;
  invoice_id?: number;
  created_at?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    // Fetch all payments
    const { data, error } = await supabase
      .from<Payment>('payments')
      .select('*');

    if (error) {
      console.error('Error fetching payments:', error);
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json(data);
  }

  if (req.method === 'POST') {
    const { client_id, amount, method, status, invoice_id } = req.body;

    if (!client_id || !amount || !method || !status) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newPayment = {
      client_id,
      amount,
      method,
      status,
      invoice_id: invoice_id || null,
    };

    const { data, error } = await supabase
      .from<Payment>('payments')
      .insert(newPayment)
      .single();

    if (error) {
      console.error('Error creating payment:', error);
      return res.status(500).json({ error: error.message });
    }

    return res.status(201).json(data);
  }

  // Method not allowed
  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
