

import { supabase } from './supabaseClient'

export interface Invoice {
  id: string
  client_id: string
  amount: number
  status: 'draft' | 'sent' | 'paid'
  created_at?: string
  updated_at?: string
  due_date?: string
  items: Array<{
    description: string
    quantity: number
    unit_price: number
  }>
}

/**
 * Fetch all invoices, optionally filtered by client ID or status.
 */
export async function getInvoices(params?: {
  client_id?: string
  status?: Invoice['status']
}): Promise<Invoice[]> {
  let query = supabase.from<Invoice>('invoices').select('*')

  if (params?.client_id) {
    query = query.eq('client_id', params.client_id)
  }
  if (params?.status) {
    query = query.eq('status', params.status)
  }

  const { data, error } = await query.order('created_at', { ascending: false })
  if (error) throw error
  return data || []
}

/**
 * Fetch a single invoice by ID.
 */
export async function getInvoiceById(id: string): Promise<Invoice | null> {
  const { data, error } = await supabase
    .from<Invoice>('invoices')
    .select('*')
    .eq('id', id)
    .single()
  if (error && error.code !== 'PGRST116') throw error
  return data
}

/**
 * Create a new invoice.
 */
export async function createInvoice(invoice: Omit<Invoice, 'id' | 'created_at' | 'updated_at'>): Promise<Invoice> {
  const { data, error } = await supabase
    .from<Invoice>('invoices')
    .insert(invoice)
    .select()
    .single()
  if (error) throw error
  return data
}

/**
 * Update an existing invoice.
 */
export async function updateInvoice(id: string, updates: Partial<Omit<Invoice, 'id'>>): Promise<Invoice> {
  const { data, error } = await supabase
    .from<Invoice>('invoices')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

/**
 * Delete an invoice.
 */
export async function deleteInvoice(id: string): Promise<void> {
  const { error } = await supabase
    .from('invoices')
    .delete()
    .eq('id', id)
  if (error) throw error
}