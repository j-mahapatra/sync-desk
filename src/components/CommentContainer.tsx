'use client';

import React from 'react';
import { useThreads } from '@liveblocks/react/suspense';
import { Composer, Thread } from '@liveblocks/react-ui';
export default function CommentContainer() {
  const { threads } = useThreads();

  return (
    <div className='h-fit w-[500px] shadow-md overflow-y-auto z-10 rounded-md'>
      {threads.map((thread) => (
        <Thread key={thread.id} thread={thread} />
      ))}
      <Composer />
    </div>
  );
}
