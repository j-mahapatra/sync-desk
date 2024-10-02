'use client';

import React from 'react';
import { useThreads } from '@liveblocks/react/suspense';
import { Composer, Thread } from '@liveblocks/react-ui';
export default function CommentContainer() {
  const { threads } = useThreads();

  return (
    <div className='h-fit w-full shadow-md overflow-y-auto rounded-md mb-1'>
      {threads.map((thread) => (
        <Thread key={thread.id} thread={thread} />
      ))}
      <Composer />
    </div>
  );
}
