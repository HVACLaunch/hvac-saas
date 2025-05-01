

import React, { useState, useEffect, FormEvent } from 'react';
import { supabase } from '../../services/supabaseClient';
import { useRouter } from 'next/router';

interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
}

export default function InvoiceForm({ invoiceId }: { invoiceId?: string }) {
  const router = useRouter();
  const [clients, setClients] = useState<{ id: string; name: string }[]>([]);
  const [clientId, setClientId] = useState<string>('');
  const [date, setDate] = useState<string>(new Date().toISOString().substring(0, 10));
  const [items, setItems] = useState<InvoiceItem[]>([{ description: '', quantity: 1, unitPrice: 0 }]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load clients for dropdown
    supabase.from('clients').select('id, name').then(({ data, error }) => {
      if (error) setError(error.message);
      else if (data) setClients(data);
    });
    // If editing an existing invoice, you could fetch and populate here
  }, []);

  const handleItemChange = (index: number, field: keyof InvoiceItem, value: string | number) => {
    const updated = [...items];
    // @ts-ignore
    updated[index][field] = value;
    setItems(updated);
  };

  const addItem = () => {
    setItems([...items, { description: '', quantity: 1, unitPrice: 0 }]);
  };

  const removeItem = (index: number) => {
    const updated = items.filter((_, i) => i !== index);
    setItems(updated);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const payload = { client_id: clientId, date, items };
    const { error: supaError } = await supabase.from('invoices').insert(payload);
    setLoading(false);
    if (supaError) {
      setError(supaError.message);
    } else {
      router.push('/invoices');
    }
  };

  const total = items.reduce((sum, it) => sum + it.quantity * it.unitPrice, 0);

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <label>Client:</label>
        <select value={clientId} onChange={e => setClientId(e.target.value)} required>
          <option value="">Select a client</option>
          {clients.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Date:</label>
        <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
      </div>
      <h3>Items</h3>
      {items.map((item, idx) => (
        <div key={idx} style={{ borderBottom: '1px solid #ddd', padding: '8px 0' }}>
          <input
            placeholder="Description"
            value={item.description}
            onChange={e => handleItemChange(idx, 'description', e.target.value)}
            required
          />
          <input
            type="number"
            min="1"
            value={item.quantity}
            onChange={e => handleItemChange(idx, 'quantity', Number(e.target.value))}
            required
          />
          <input
            type="number"
            step="0.01"
            value={item.unitPrice}
            onChange={e => handleItemChange(idx, 'unitPrice', Number(e.target.value))}
            required
          />
          <button type="button" onClick={() => removeItem(idx)}>Remove</button>
        </div>
      ))}
      <button type="button" onClick={addItem}>Add Item</button>
      <h4>Total: ${total.toFixed(2)}</h4>
      <button type="submit" disabled={loading}>
        {loading ? 'Saving...' : 'Save Invoice'}
      </button>
    </form>
  );
}