import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ padding: '1rem', borderBottom: '1px solid #eaeaea', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
        <Link href="/">
          HVAC SaaS
        </Link>
      </div>
      <nav>
        <Link href="/booking" style={{ marginRight: '1rem' }}>Booking</Link>
        <Link href="/crm" style={{ marginRight: '1rem' }}>CRM</Link>
        <Link href="/invoices" style={{ marginRight: '1rem' }}>Invoices</Link>
        <Link href="/payments">Payments</Link>
      </nav>
    </footer>
  );
}
