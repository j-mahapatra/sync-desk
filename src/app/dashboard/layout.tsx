import Header from '@/components/Header';
import type { Metadata } from 'next';
import '@liveblocks/react-ui/styles.css';

export const metadata: Metadata = {
  title: 'Create Workspace - Sync Desk',
  description:
    'Sync Desk is a real-time collaboration tool that uses AI to help distributed teams write, design, and plan together more efficiently.',
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex w-full h-screen overflow-hidden flex-col bg-slate-100'>
      <Header />
      {children}
    </div>
  );
}
