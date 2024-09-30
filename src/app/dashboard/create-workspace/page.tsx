'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { COVER_IMAGE_URLS } from '@/lib/constants';
import { Camera, SmilePlus } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';

export default function CreateWorkspace() {
  const [coverImage, setCoverImage] = useState<string>(COVER_IMAGE_URLS[0]);
  const [workspaceName, setWorkspaceName] = useState<string>('');

  return (
    <div className='my-6 p-6 md:px-28 lg:px-32 xl:px-36 space-y-6'>
      <div className='flex items-center justify-center flex-col w-full h-full border-2 shadow-2xl rounded-xl'>
        <div className='relative w-full'>
          <h2 className='absolute flex w-full h-full items-center justify-center cursor-pointer hover:bg-gray-100/30 bg-transparent transition-all text-gray-600 hover:text-black'>
            <Camera className='mr-2' />
            <span>Change Cover</span>
          </h2>
          <div>
            <Image
              src={coverImage}
              alt='cover image'
              width={400}
              height={400}
              className='w-full h-36 rounded-t-lg'
            />
          </div>
        </div>
        <div className='flex flex-col w-full p-5 sm:p-12'>
          <h2 className='font-semibold text-3xl text-slate-900'>
            Create a New Workspace
          </h2>
          <p className='text-slate-700 mt-1'>
            This is a new workspace where you can collaborate with other members
            of your organization.
          </p>
          <div className='flex w-full space-x-2 mt-5'>
            <Input
              placeholder='Workspace Name'
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setWorkspaceName(e.target.value)
              }
            />
            <Button variant={'outline'}>
              <SmilePlus />
            </Button>
          </div>
          <div className='flex justify-end space-x-2 mt-5'>
            <Button disabled={workspaceName.length === 0}>Create</Button>
            <Button variant='outline'>Cancel</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
