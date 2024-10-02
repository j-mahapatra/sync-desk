import type { Metadata } from 'next';
import { Fira_Sans } from 'next/font/google';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'Sync Desk',
  description:
    'Sync Desk is a real-time collaboration tool that uses AI to help distributed teams write, design, and plan together more efficiently.',
};

const firaSans = Fira_Sans({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-geist-sans',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body
          className={`flex flex-col ${firaSans.className} antialiased h-screen`}
        >
          <Toaster />
          <main className='flex-1 bg-black'>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
