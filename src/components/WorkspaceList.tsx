import { COVER_IMAGE_URLS } from '@/lib/constants';
import { LayoutType, WorkspaceType } from '@/lib/types';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function WorkspaceList({
  workspaces,
  selectedLayout,
}: {
  workspaces: WorkspaceType[];
  selectedLayout: LayoutType;
}) {
  return (
    <div
      className={cn(
        'flex-1 h-full sm:h-fit sm:max-h-[450px] overflow-y-auto',
        selectedLayout === 'grid'
          ? 'grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-2'
          : 'flex flex-col gap-2 p-6',
      )}
    >
      {workspaces.map((workspace) => (
        <Link key={workspace.id} href={`/dashboard/workspace/${workspace.id}`}>
          <div
            className={cn(
              'flex w-full border-2 p-1 items-center h-full rounded-sm hover:border-slate-700 transition-all cursor-pointer',
              selectedLayout === 'grid' ? 'flex-col' : '',
            )}
          >
            <Image
              src={workspace.coverImage || COVER_IMAGE_URLS[0]}
              alt={workspace.name}
              width={200}
              height={140}
              className='rounded-sm'
            />
            <div className='flex flex-col w-full px-2'>
              <span className='text-xl font-semibold text-left w-full px-2 mt-2 break-all'>
                {workspace.name}
              </span>
              <span className='text-sm text-slate-500 text-left w-full px-2'>
                {workspace.createdAt.toDate().toDateString().toString()}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
