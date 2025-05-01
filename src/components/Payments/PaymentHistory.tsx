import React, { useEffect, useState } from 'react';
import { supabase } from '../../services/supabaseClient';

interface Payment {
  id: string;
  amount: number;
  status: string;
  created_at: string;
}

export default function PaymentHistory() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPayments() {
      setLoading(true);
      const { data, error } = await supabase
        .from<Payment>('payments')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        setError(error.message);
      } else {
        setPayments(data);
      }
      setLoading(false);
    }

    loadPayments();
  }, []);

  if (loading) return <p>Loading payment history...</p>;
  if (error) return <p>Error loading payments: {error}</p>;
  if (payments.length === 0) return <p>No payments found.</p>;

  return (
    <div>
      <h2>Payment History</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ borderBottom: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Date</th>
            <th style={{ borderBottom: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>Amount</th>
            <th style={{ borderBottom: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p) => (
            <tr key={p.id}>
              <td style={{ borderBottom: '1px solid #eee', padding: '8px' }}>
                {new Date(p.created_at).toLocaleDateString()}
              </td>
              <td style={{ borderBottom: '1px solid #eee', padding: '8px', textAlign: 'right' }}>
                ${ (p.amount / 100).toFixed(2) }
              </td>
              <td style={{ borderBottom: '1px solid #eee', padding: '8px', textAlign: 'center' }}>
                {p.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
