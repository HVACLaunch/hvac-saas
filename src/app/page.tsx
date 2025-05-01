// src/app/page.tsx
import Link from 'next/link';

const cardStyle: React.CSSProperties = {
  display: 'block',
  padding: '1rem',
  borderRadius: '8px',
  border: '1px solid #ddd',
  textAlign: 'center',
  textDecoration: 'none',
  color: '#333',
  fontWeight: 500,
};

export default function HomePage() {
  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <header style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h1>Welcome to HVAC SaaS</h1>
        <p>Your all‑in‑one platform for HVAC business management.</p>
      </header>

      <section style={{ display: 'grid', gap: '1.5rem', maxWidth: '600px', margin: '0 auto' }}>
        <Link href="/booking">
          <div style={cardStyle}>Booking Calendar</div>
        </Link>
        <Link href="/crm">
          <div style={cardStyle}>Client & Job CRM</div>
        </Link>
        <Link href="/invoices">
          <div style={cardStyle}>Invoices & Quotes</div>
        </Link>
        <Link href="/payments">
          <div style={cardStyle}>Payments</div>
        </Link>
      </section>
    </main>
  );
}