import { COVER_IMAGE_URLS } from '@/lib/constants';
import { DocumentsType } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function DocumentList({
  documents,
  workspaceId,
}: {
  documents: DocumentsType[];
  workspaceId: string;
}) {
  return (
    <div className='flex-1 grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 h-full sm:h-fit sm:max-h-[450px] overflow-y-auto p-2'>
      {documents.map((document) => (
        <Link
          key={document.id}
          href={`/dashboard/workspace/${workspaceId}/${document.id}`}
        >
          <div className='flex flex-col w-full border-2 p-1 items-center h-full shadow-sm hover:scale-105 transition-all cursor-pointer'>
            <Image
              src={document.coverImage || COVER_IMAGE_URLS[0]}
              alt={document.name}
              width={200}
              height={140}
              className='rounded-sm'
            />
            <span className='text-xl font-semibold text-left w-full px-2 mt-2 break-all'>
              {document.name}
            </span>
            <span className='text-sm text-slate-500 text-left w-full px-2'>
              {document.createdAt.toDate().toDateString().toString()}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
