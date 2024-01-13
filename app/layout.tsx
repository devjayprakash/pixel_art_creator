import Navbar from '@/components/navbar';
import connectMongo from '@/lib/database';
import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Pixel Art maker',
  description: 'Pixel art maker',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await connectMongo();

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} bg-black text-white`}>
          <Providers>
            <main className="dark">
              <Navbar />
              {children}
            </main>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
