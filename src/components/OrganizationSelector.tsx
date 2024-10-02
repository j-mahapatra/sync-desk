import { OrganizationSwitcher } from '@clerk/nextjs';
import React from 'react';

export default function OrganizationSelector({}) {
  return (
    <div className='flex items-center justify-center h-full px-2'>
      <OrganizationSwitcher
        afterCreateOrganizationUrl='/dashboard'
        afterLeaveOrganizationUrl='/dashboard'
        afterSelectOrganizationUrl='/dashboard'
        afterSelectPersonalUrl='/dashboard'
      />
    </div>
  );
}
