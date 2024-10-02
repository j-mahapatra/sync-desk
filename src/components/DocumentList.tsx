import { COVER_IMAGE_URLS } from '@/lib/constants';
import { LayoutType, DocumentsType } from '@/lib/types';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function DocumentList({
  documents,
  workspaceId,
  selectedLayout,
}: {
  documents: DocumentsType[];
  workspaceId: string;
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
      {documents.map((document) => (
        <Link
          key={document.id}
          href={`/dashboard/workspace/${workspaceId}/${document.id}`}
        >
          <div
            className={cn(
              'flex w-full border-2 p-1 items-center h-full rounded-sm hover:border-slate-700 transition-all cursor-pointer',
              selectedLayout === 'grid' ? 'flex-col' : '',
            )}
          >
            <Image
              src={document.coverImage || COVER_IMAGE_URLS[0]}
              alt={document.name}
              width={200}
              height={140}
              className='rounded-sm'
            />
            <div className='flex flex-col w-full px-2'>
              <span className='text-xl font-semibold text-left w-full px-2 mt-2 break-all'>
                {document.name}
              </span>
              <span className='text-sm text-slate-500 text-left w-full px-2'>
                {document.createdAt.toDate().toDateString().toString()}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
