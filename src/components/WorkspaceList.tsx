import { COVER_IMAGE_URLS } from '@/lib/constants';
import { WorkspaceType } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function WorkspaceList({
  workspaces,
}: {
  workspaces: WorkspaceType[];
}) {
  return (
    <div className='flex-1 grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 h-full sm:h-fit sm:max-h-[450px] overflow-y-auto p-2'>
      {workspaces.map((workspace) => (
        <Link key={workspace.id} href={`/dashboard/workspace/${workspace.id}`}>
          <div className='flex flex-col w-full border-2 p-1 items-center h-full shadow-sm hover:scale-105 transition-all cursor-pointer'>
            <Image
              src={workspace.coverImage || COVER_IMAGE_URLS[0]}
              alt={workspace.name}
              width={200}
              height={140}
              className='rounded-sm'
            />
            <span className='text-xl font-semibold text-left w-full px-2 mt-2 break-all'>
              {workspace.name}
            </span>
            <span className='text-sm text-slate-500 text-left w-full px-2'>
              {workspace.createdAt.toDate().toDateString().toString()}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
