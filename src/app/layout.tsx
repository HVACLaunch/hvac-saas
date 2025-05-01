import './globals.css'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import { ReactNode } from 'react'

export const metadata = {
  title: 'HVAC SaaS',
  description: 'All-in-one HVAC management platform for technicians'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <Header />
        <main className="container mx-auto px-4">{children}</main>
        <Footer />
      </body>
    </html>
  )
}