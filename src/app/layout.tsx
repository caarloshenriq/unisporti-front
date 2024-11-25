import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
// import { AuthProvider } from '@/contexts/AuthContext';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Unisporti',
  description: 'baooo',
  icons: {
    icon: '/logo.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <link rel="icon" href="/master-revestimentos.png" />
      <body className={inter.className}>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  )
}
