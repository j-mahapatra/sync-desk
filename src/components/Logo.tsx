import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function Logo() {
  return (
    <div className='flex items-center justify-center'>
      <Link href='/dashboard'>
        <Image src={'/logo.png'} alt={'logo'} width={200} height={60} />
      </Link>
    </div>
  );
}
