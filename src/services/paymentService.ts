

/**
 * paymentService.ts
 * 
 * A service module for managing payments via Supabase.
 */
import { supabase } from './supabaseClient'

export interface Payment {
  id: number
  invoice_id: number
  amount: number
  status: 'pending' | 'paid' | 'failed'
  method: string
  created_at: string
  updated_at?: string
}

/**
 * Create a new payment record.
 * @param paymentData - Partial payment details (invoice_id, amount, method, etc.)
 */
export async function createPayment(paymentData: Omit<Partial<Payment>, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from<Payment>('payments')
    .insert({ ...paymentData, status: 'pending' })
    .single()
  if (error) throw error
  return data
}

/**
 * Retrieve a payment by its ID.
 * @param id - Payment record ID
 */
export async function getPaymentById(id: number) {
  const { data, error } = await supabase
    .from<Payment>('payments')
    .select('*')
    .eq('id', id)
    .single()
  if (error) throw error
  return data
}

/**
 * List all payments for a given invoice.
 * @param invoiceId - ID of the invoice
 */
export async function getPaymentsByInvoice(invoiceId: number) {
  const { data, error } = await supabase
    .from<Payment>('payments')
    .select('*')
    .eq('invoice_id', invoiceId)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

/**
 * Update the status or other fields of a payment.
 * @param id - Payment ID
 * @param updates - Fields to update
 */
export async function updatePayment(id: number, updates: Partial<Omit<Payment, 'id' | 'invoice_id' | 'created_at'>>) {
  const { data, error } = await supabase
    .from<Payment>('payments')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .single()
  if (error) throw error
  return data
}

/**
 * Delete a payment record.
 * @param id - Payment ID to delete
 */
export async function deletePayment(id: number) {
  const { error } = await supabase
    .from('payments')
    .delete()
    .eq('id', id)
  if (error) throw error
  return true
}