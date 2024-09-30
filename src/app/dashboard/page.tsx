'use client';

import { useUser } from '@clerk/nextjs';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  AlignLeft,
  CopyPlus,
  LayoutGrid,
  Plus,
  University,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useRouter } from 'next/navigation';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export default function Dashboard() {
  const { user } = useUser();
  const router = useRouter();
  const [userOrganizations, setUserOrganizations] = useState<string[]>([]);

  return (
    <div className='my-6 p-6 md:px-28 lg:px-32 xl:px-36 space-y-6'>
      <div className='flex justify-between'>
        <h2 className='font-semibold text-3xl'>{`Hello${user?.firstName ? `, ${user.firstName}!` : ''}`}</h2>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => router.push('/dashboard/create-workspace')}
              >
                <CopyPlus />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Create a new workspace</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <Separator />
      <div className='flex justify-between'>
        <h2 className='font-semibold text-3xl text-slate-900'>Workspaces</h2>
        <div className='flex space-x-2'>
          <LayoutGrid />
          <AlignLeft />
        </div>
      </div>
      {userOrganizations.length === 0 && (
        <div className='flex flex-col w-full justify-center items-center'>
          <div className='flex flex-col w-fit justify-center items-center border rounded-md p-8 shadow-md space-y-6'>
            <p className='w-full text-center'>
              Looks like you do not have any workspaces!
            </p>
            <University className='w-36 h-36 text-slate-700' />
            <Button
              variant={'outline'}
              className='flex items-center justify-center'
              onClick={() => router.push('/dashboard/create-workspace')}
            >
              <Plus className='w-4 h-4 mr-1' />
              <span>Create a Workspace</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
