

"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '../../services/supabaseClient';

interface Client {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

export default function ClientList() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchClients = async () => {
      const { data, error } = await supabase
        .from<Client>('clients')
        .select('*')
        .order('name', { ascending: true });

      if (error) {
        console.error('Error fetching clients:', error);
      } else {
        setClients(data || []);
      }
      setLoading(false);
    };
    fetchClients();
  }, []);

  if (loading) {
    return <div>Loading clients...</div>;
  }

  if (clients.length === 0) {
    return <div>No clients found.</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Client List</h2>
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2 text-left">Name</th>
            <th className="border px-4 py-2 text-left">Email</th>
            <th className="border px-4 py-2 text-left">Phone</th>
          </tr>
        </thead>
        <tbody>
          {clients.map(client => (
            <tr key={client.id}>
              <td className="border px-4 py-2">{client.name}</td>
              <td className="border px-4 py-2">{client.email}</td>
              <td className="border px-4 py-2">{client.phone || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}