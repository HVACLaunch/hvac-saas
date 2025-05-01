

import Link from 'next/link';

export default function Header() {
  return (
    <header style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1rem 2rem',
      backgroundColor: '#fff',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
        HVAC SaaS
      </div>
      <nav style={{ display: 'flex', gap: '1rem' }}>
        <Link href="/"><a>Home</a></Link>
        <Link href="/booking"><a>Booking</a></Link>
        <Link href="/clients"><a>CRM</a></Link>
        <Link href="/invoices"><a>Invoices</a></Link>
        <Link href="/payments"><a>Payments</a></Link>
      </nav>
    </header>
  );
}