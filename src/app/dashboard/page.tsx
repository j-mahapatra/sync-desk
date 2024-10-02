'use client';

import { useAuth, useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { CopyPlus, Plus, University } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useRouter } from 'next/navigation';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import WorkspaceList from '@/components/WorkspaceList';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase-config';
import { LayoutType, WorkspaceType } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import LayoutSelector from '@/components/LayoutSelector';

export default function Dashboard() {
  const { user } = useUser();
  const { orgId } = useAuth();
  const router = useRouter();
  const [userWorkspaces, setUserWorkspaces] = useState<WorkspaceType[]>([]);
  const [loadingWorkspaces, setLoadingWorkspaces] = useState<boolean>(true);
  const [selectedLayout, setSelectedLayout] = useState<LayoutType>('grid');

  useEffect(() => {
    const fetchWorkspaceList = async () => {
      if (!(orgId ?? user?.primaryEmailAddress?.emailAddress)) return;

      const workspaces = query(
        collection(db, 'workspaces'),
        where('orgId', '==', orgId ?? user?.primaryEmailAddress?.emailAddress),
      );
      const querySnapshot = await getDocs(workspaces);

      const newWorkspaces: WorkspaceType[] = [];

      querySnapshot.forEach((doc) => {
        newWorkspaces.push({
          id: doc.id,
          ...(doc.data() as Omit<WorkspaceType, 'id'>),
        });
      });
      setUserWorkspaces(newWorkspaces);
      setLoadingWorkspaces(false);
    };

    fetchWorkspaceList();
  }, [orgId, user]);

  return (
    <div className='h-full my-6 p-6 md:px-28 lg:px-32 xl:px-36 space-y-6'>
      <div className='flex justify-between'>
        <h2 className='font-semibold text-3xl'>{`Hello${user?.firstName ? `, ${user.firstName}!` : ''}`}</h2>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => router.push('/dashboard/create-workspace')}
              >
                <CopyPlus />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Create a new workspace</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <Separator />
      <div className='flex justify-between'>
        <h2 className='font-semibold text-3xl text-slate-900'>Workspaces</h2>
        <LayoutSelector
          selectedLayout={selectedLayout}
          onLayoutChange={(layout) => setSelectedLayout(layout)}
        />
      </div>
      {loadingWorkspaces ? (
        <Skeleton className='h-96' />
      ) : userWorkspaces.length === 0 ? (
        <div className='flex flex-col w-full justify-center items-center'>
          <div className='flex flex-col w-fit justify-center items-center border rounded-md p-8 shadow-md space-y-6'>
            <p className='w-full text-center'>
              Looks like you do not have any workspaces!
            </p>
            <University className='w-36 h-36 text-slate-700' />
            <Button
              variant={'outline'}
              className='flex items-center justify-center'
              onClick={() => router.push('/dashboard/create-workspace')}
            >
              <Plus className='w-4 h-4 mr-1' />
              <span>Create a Workspace</span>
            </Button>
          </div>
        </div>
      ) : (
        <WorkspaceList
          selectedLayout={selectedLayout}
          workspaces={userWorkspaces}
        />
      )}
    </div>
  );
}
