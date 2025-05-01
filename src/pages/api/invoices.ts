

import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../../services/supabaseClient'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      // Retrieve all invoices
      const { data, error } = await supabase
        .from('invoices')
        .select('*')
        .order('created_at', { ascending: false })
      if (error) throw error
      return res.status(200).json(data)
    } else if (req.method === 'POST') {
      // Create a new invoice
      const { client_id, amount, status, due_date, items } = req.body
      const { data, error } = await supabase
        .from('invoices')
        .insert([{ client_id, amount, status, due_date, items }])
        .single()
      if (error) throw error
      return res.status(201).json(data)
    } else {
      res.setHeader('Allow', ['GET', 'POST'])
      return res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  } catch (error: any) {
    console.error('Invoices API error:', error)
    return res.status(500).json({ error: error.message })
  }
}