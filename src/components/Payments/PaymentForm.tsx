
import React, { useState } from 'react'
import { supabase } from '@/services/supabaseClient'

interface PaymentFormProps {
  clientId: string
  onSuccess?: () => void
}

export default function PaymentForm({ clientId, onSuccess }: PaymentFormProps) {
  const [amount, setAmount] = useState<number>(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Call Supabase function or API to create payment intent
      const { data, error: supabaseError } = await supabase
        .from('payments')
        .insert([{ client_id: clientId, amount, status: 'pending' }])

      if (supabaseError) throw supabaseError

      // TODO: Integrate Stripe checkout/session here

      onSuccess?.()
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '0 auto' }}>
      <div>
        <label htmlFor="amount">Amount ($):</label>
        <input
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          required
          min={0.01}
          step={0.01}
        />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit" disabled={loading}>
        {loading ? 'Processing...' : 'Pay'}
      </button>
    </form>
  )
}