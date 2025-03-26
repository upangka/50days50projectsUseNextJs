import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Footer from './_components/footer'
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: '50 Days 50 Projects - Next.js',
  description: 'Just for fun :)'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' className='relative h-fit w-auto'>
      <body
        className={`h-fit min-w-[1024px] overflow-x-auto ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
