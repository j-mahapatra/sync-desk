'use client';

import { ReactNode } from 'react';
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from '@liveblocks/react/suspense';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase-config';
import { UserType } from '@/lib/types';

export function Room({ children, id }: { children: ReactNode; id: string }) {
  return (
    <LiveblocksProvider
      authEndpoint={'/api/liveblocks-auth'}
      resolveUsers={async ({ userIds }) => {
        const q = query(collection(db, 'users'), where('email', 'in', userIds));
        const querySnapshot = await getDocs(q);

        const users: UserType[] = [];
        querySnapshot.forEach((doc) => {
          users.push(doc.data() as UserType);
        });

        return users;
      }}
      resolveMentionSuggestions={async ({ text }) => {
        const q = query(collection(db, 'users'), where('email', '!=', null));
        const querySnapshot = await getDocs(q);

        let users: UserType[] = [];
        querySnapshot.forEach((doc) => {
          users.push(doc.data() as UserType);
        });

        if (text) {
          users = users.filter((user) => user.name.includes(text));
        }

        return users.map((user) => user.name);
      }}
    >
      <RoomProvider id={id}>
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
