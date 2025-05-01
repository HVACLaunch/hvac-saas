import { supabase } from './supabaseClient'

export type Booking = {
  id: number
  client_id: number
  user_id: number
  start_time: string // ISO datetime
  end_time: string   // ISO datetime
  notes?: string
  created_at: string
}

/**
 * Fetch all bookings for a given user.
 * @param userId The ID of the user whose bookings to fetch.
 */
export async function getBookingsForUser(userId: number): Promise<Booking[]> {
  const { data, error } = await supabase
    .from<Booking>('bookings')
    .select('*')
    .eq('user_id', userId)
    .order('start_time', { ascending: true })

  if (error) {
    throw new Error(`Error fetching bookings: ${error.message}`)
  }
  return data || []
}

/**
 * Create a new booking.
 */
export async function createBooking(booking: Omit<Booking, 'id' | 'created_at'>): Promise<Booking> {
  const { data, error } = await supabase
    .from<Booking>('bookings')
    .insert(booking)
    .single()

  if (error) {
    throw new Error(`Error creating booking: ${error.message}`)
  }
  return data
}

/**
 * Update an existing booking by ID.
 */
export async function updateBooking(id: number, updates: Partial<Omit<Booking, 'id' | 'created_at'>>): Promise<Booking> {
  const { data, error } = await supabase
    .from<Booking>('bookings')
    .update(updates)
    .eq('id', id)
    .single()

  if (error) {
    throw new Error(`Error updating booking: ${error.message}`)
  }
  return data
}

/**
 * Delete a booking by ID.
 */
export async function deleteBooking(id: number): Promise<void> {
  const { error } = await supabase
    .from('bookings')
    .delete()
    .eq('id', id)

  if (error) {
    throw new Error(`Error deleting booking: ${error.message}`)
  }
}
