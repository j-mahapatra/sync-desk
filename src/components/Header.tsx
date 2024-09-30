import React from 'react';
import Logo from './Logo';
import { UserButton } from '@clerk/nextjs';
import OrganizationSelector from './OrganizationSelector';

export default function Header() {
  return (
    <header className='flex w-full justify-between border-b shadow-sm items-center p-2'>
      <Logo />
      <div className='flex w-fit items-center justify-center h-full mx-3'>
        <OrganizationSelector />
        <UserButton />
      </div>
    </header>
  );
}
