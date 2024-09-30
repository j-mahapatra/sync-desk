import Image from 'next/image';
import React from 'react';

export default function Logo() {
  return (
    <div className='flex items-center justify-center'>
      <Image src={'/logo.png'} alt={'logo'} width={200} height={60} />
    </div>
  );
}
