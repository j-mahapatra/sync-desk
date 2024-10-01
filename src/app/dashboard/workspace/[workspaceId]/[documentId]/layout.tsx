import type { Metadata } from 'next';
import DocumentSidebar from '@/components/DocumentSidebar';

export const metadata: Metadata = {
  title: 'Document - Sync Desk',
  description:
    'Sync Desk is a real-time collaboration tool that uses AI to help distributed teams write, design, and plan together more efficiently.',
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex w-full h-full'>
      <DocumentSidebar />
      {children}
    </div>
  );
}
