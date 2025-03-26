import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

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
        <footer className='fixed bottom-0 flex w-screen justify-center rounded-full border-t-2 border-gray-100 bg-black italic shadow-2xl shadow-amber-50 select-none'>
          <div className='py-3'>
            <a
              href='https://gitee.com/pkmer/50days50projects-use-next-js'
              className='font-bold text-green-600'
            >
              Pkmer
            </a>{' '}
            is built with{' '}
            <a href='https://nextjs.org/' className='font-bold text-green-600'>
              Next.js
            </a>
            , inspired by {''}
            <a className='text-green-600' href='https://github.com/bradtraversy/50projects50days'>
              50 Projects 50 Days
            </a>
          </div>
        </footer>
      </body>
    </html>
  )
}
