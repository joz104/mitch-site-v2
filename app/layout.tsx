import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: "Mitch's Soccer NEXT | Youth Soccer Training & Camps",
  description: 'Empowering communities through soccer. Offering comprehensive soccer training, camps, awareness tours, and coach development programs for all ages.',
  keywords: 'soccer training, youth soccer, soccer camps, coach development, community soccer',
  openGraph: {
    title: "Mitch's Soccer NEXT",
    description: 'Empowering communities through soccer',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
