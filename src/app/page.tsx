

// src/app/page.tsx
import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <header style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h1>Welcome to HVAC SaaS</h1>
        <p>Your all‑in‑one platform for HVAC business management.</p>
      </header>

      <section style={{ display: 'grid', gap: '1.5rem', maxWidth: '600px', margin: '0 auto' }}>
        <Link href="/booking">
          <a style={cardStyle}>Booking Calendar</a>
        </Link>
        <Link href="/crm">
          <a style={cardStyle}>Client & Job CRM</a>
        </Link>
        <Link href="/invoices">
          <a style={cardStyle}>Invoices & Quotes</a>
        </Link>
        <Link href="/payments">
          <a style={cardStyle}>Payments</a>
        </Link>
      </section>
    </main>
  );

  function cardStyle() {
    return {
      display: 'block',
      padding: '1rem',
      borderRadius: '8px',
      border: '1px solid #ddd',
      textAlign: 'center',
      textDecoration: 'none',
      color: '#333',
      fontWeight: 500,
    };
  }
}