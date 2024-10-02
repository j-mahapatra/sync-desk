import { Button } from '@/components/ui/button';
import { Zap } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className='relative flex flex-col items-center h-full w-full'>
      <div className='absolute flex w-full justify-end text-white py-5 px-10'>
        <Button variant={'outline'} className='text-lg text-black' asChild>
          <Link href={'/sign-up'}>Signup</Link>
        </Button>
        <Button variant={'link'} className='text-lg text-white' asChild>
          <Link href={'/sign-in'}>Signin</Link>
        </Button>
      </div>
      <div className='flex-1 flex flex-col h-full justify-center items-center space-y-5 px-5 sm:px-10'>
        <Image
          src='/logo.png'
          alt='sync-desk-logo'
          width={600}
          height={200}
          className='invert'
        />
        <p className='text-slate-300 text-xl sm:text-2xl text-center font-light max-w-3xl'>
          Collaborations have never been <strong>easier</strong>. Bring your
          ideas together and make something <strong>great</strong>.
        </p>
        <Button variant={'secondary'} asChild>
          <Link href='/dashboard'>
            <Zap className='mr-2 h-6 w-6' />
            Get Started
          </Link>
        </Button>
      </div>
      <footer className='absolute bottom-0 text-slate-300 text-sm py-2'>
        Copyright &copy;2024 SyncDesk. All rights reserved.
      </footer>
    </div>
  );
}
