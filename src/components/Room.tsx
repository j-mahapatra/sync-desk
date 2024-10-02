'use client';

import { ReactNode } from 'react';
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from '@liveblocks/react/suspense';

export function Room({ children, id }: { children: ReactNode; id: string }) {
  return (
    <LiveblocksProvider
      publicApiKey={process.env.NEXT_PUBLIC_LIVEBLOCKS_API_KEY as string}
    >
      <RoomProvider id={id}>
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
