import { supabase } from './supabaseClient'

export interface Client {
  id: string
  name: string
  email?: string
  phone?: string
  address?: string
  created_at?: string
}

export interface Job {
  id: string
  client_id: string
  title: string
  description?: string
  date?: string
  status?: 'pending' | 'in_progress' | 'completed'
  created_at?: string
}

const CLIENTS_TABLE = 'clients'
const JOBS_TABLE = 'jobs'

// Clients CRUD

export async function getClientsForUser(userId: string): Promise<Client[]> {
  const { data, error } = await supabase
    .from<Client>(CLIENTS_TABLE)
    .select('*')
    .eq('owner_id', userId)
  if (error) throw error
  return data || []
}

export async function getClientById(clientId: string): Promise<Client | null> {
  const { data, error } = await supabase
    .from<Client>(CLIENTS_TABLE)
    .select('*')
    .eq('id', clientId)
    .single()
  if (error) throw error
  return data
}

export async function createClient(client: Omit<Client, 'id' | 'created_at'> & { owner_id: string }): Promise<Client> {
  const { data, error } = await supabase
    .from<Client>(CLIENTS_TABLE)
    .insert(client)
    .single()
  if (error) throw error
  return data
}

export async function updateClient(clientId: string, updates: Partial<Client>): Promise<Client> {
  const { data, error } = await supabase
    .from<Client>(CLIENTS_TABLE)
    .update(updates)
    .eq('id', clientId)
    .single()
  if (error) throw error
  return data
}

export async function deleteClient(clientId: string): Promise<void> {
  const { error } = await supabase
    .from(CLIENTS_TABLE)
    .delete()
    .eq('id', clientId)
  if (error) throw error
}

// Job History CRUD

export async function getJobsForClient(clientId: string): Promise<Job[]> {
  const { data, error } = await supabase
    .from<Job>(JOBS_TABLE)
    .select('*')
    .eq('client_id', clientId)
    .order('date', { ascending: false })
  if (error) throw error
  return data || []
}

export async function createJob(job: Omit<Job, 'id' | 'created_at'>): Promise<Job> {
  const { data, error } = await supabase
    .from<Job>(JOBS_TABLE)
    .insert(job)
    .single()
  if (error) throw error
  return data
}

export async function updateJob(jobId: string, updates: Partial<Job>): Promise<Job> {
  const { data, error } = await supabase
    .from<Job>(JOBS_TABLE)
    .update(updates)
    .eq('id', jobId)
    .single()
  if (error) throw error
  return data
}

export async function deleteJob(jobId: string): Promise<void> {
  const { error } = await supabase
    .from(JOBS_TABLE)
    .delete()
    .eq('id', jobId)
  if (error) throw error
}
