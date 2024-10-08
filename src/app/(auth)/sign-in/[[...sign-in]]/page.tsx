import React from 'react';
import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className='grid h-screen place-items-center'>
      <SignIn forceRedirectUrl={'/dashboard'} afterSignOutUrl={'/'} />
    </div>
  );
}
