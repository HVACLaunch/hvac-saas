import React, { useEffect, useState } from 'react';
import { supabase } from '@/services/supabaseClient';

export interface Invoice {
  id: string;
  client_name: string;
  amount: number;
  status: 'draft' | 'sent' | 'paid';
  due_date: string;
}

export default function InvoiceList() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchInvoices() {
      setLoading(true);
      const { data, error } = await supabase
        .from<Invoice>('invoices')
        .select('*')
        .order('due_date', { ascending: false });
      if (error) {
        console.error('Error fetching invoices:', error);
      } else {
        setInvoices(data || []);
      }
      setLoading(false);
    }
    fetchInvoices();
  }, []);

  if (loading) {
    return <p>Loading invoices...</p>;
  }

  if (invoices.length === 0) {
    return <p>No invoices found.</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Invoices</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Client</th>
            <th className="py-2 px-4 border-b">Amount</th>
            <th className="py-2 px-4 border-b">Due Date</th>
            <th className="py-2 px-4 border-b">Status</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((inv) => (
            <tr key={inv.id}>
              <td className="py-2 px-4 border-b">{inv.client_name}</td>
              <td className="py-2 px-4 border-b">${inv.amount.toFixed(2)}</td>
              <td className="py-2 px-4 border-b">{new Date(inv.due_date).toLocaleDateString()}</td>
              <td className="py-2 px-4 border-b capitalize">{inv.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
