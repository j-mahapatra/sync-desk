'use client';

import React, { useEffect } from 'react';
import Logo from './Logo';
import { UserButton, useUser } from '@clerk/nextjs';
import OrganizationSelector from './OrganizationSelector';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase-config';

export default function Header() {
  const { user } = useUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress;

  useEffect(() => {
    const saveUser = async () => {
      try {
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('email', '==', userEmail));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          await addDoc(collection(db, 'users'), {
            name: user?.fullName,
            username: user?.username,
            email: userEmail,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    saveUser();
  }, [user, userEmail]);

  return (
    <header className='flex w-full justify-between border-b shadow-sm items-center p-2'>
      <Logo />
      <div className='flex w-fit items-center justify-center h-full mx-3'>
        <OrganizationSelector />
        <UserButton />
      </div>
    </header>
  );
}
