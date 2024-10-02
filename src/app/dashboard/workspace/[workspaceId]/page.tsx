'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { DialogDescription } from '@radix-ui/react-dialog';
import { useAuth, useUser } from '@clerk/nextjs';
import {
  AlignLeft,
  CopyPlus,
  LayoutGrid,
  LoaderCircle,
  ScrollText,
  SmilePlus,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import {
  addDoc,
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { db } from '@/lib/firebase-config';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import EmojiPicker from '@/components/EmojiPicker';
import { DocumentsType } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import DocumentList from '@/components/DocumentList';

export default function WorkspaceDetails() {
  const { user } = useUser();
  const { orgId } = useAuth();
  const router = useRouter();
  const { workspaceId } = useParams();
  const [workspaceDetails, setWorkspaceDetails] = useState<DocumentData>({});
  const [workspaceDocs, setWorkspaceDocs] = useState<DocumentsType[]>([]);
  const [newDocName, setNewDocName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingDocuments, setLoadingDocuments] = useState<boolean>(true);

  useEffect(() => {
    async function fetchWorkspaceDetails(docId: string) {
      try {
        const docRef = doc(db, 'workspaces', docId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setWorkspaceDetails(docSnap.data());
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching document: ', error);
      }
    }
    if (workspaceId) {
      fetchWorkspaceDetails(workspaceId as string);
    }
  }, [workspaceId]);

  useEffect(() => {
    const fetchDocumentList = async () => {
      const documents = query(
        collection(db, 'documents'),
        where('workspaceId', '==', workspaceId),
      );
      const querySnapshot = await getDocs(documents);

      const newWorkspaces: DocumentsType[] = [];

      querySnapshot.forEach((doc) => {
        newWorkspaces.push({
          id: doc.id,
          ...(doc.data() as Omit<DocumentsType, 'id'>),
        });
      });
      setWorkspaceDocs(newWorkspaces);
      setLoadingDocuments(false);
    };

    if (workspaceId) {
      fetchDocumentList();
    }
  }, [workspaceId]);

  const handleCreateDocument = async () => {
    setLoading(true);
    try {
      const doc = await addDoc(collection(db, 'documents'), {
        name: newDocName,
        workspaceId: workspaceId,
        createdAt: new Date(),
        createdBy: user?.primaryEmailAddress?.emailAddress,
        orgId: orgId ?? user?.primaryEmailAddress?.emailAddress,
      });
      setNewDocName('');
      toast.success('Document created successfully');
      router.push(`/dashboard/workspace/${workspaceId}/${doc.id}`);
    } catch (error) {
      console.log(error);
      toast.error('Error creating workspace');
    }
    setLoading(false);
  };

  return (
    <div className='my-6 p-6 md:px-28 lg:px-32 xl:px-36 space-y-6'>
      <div className='flex w-full justify-between'>
        <h2 className='font-semibold text-3xl'>{`${workspaceDetails?.name}`}</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <CopyPlus />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Enter the name of your document:</DialogTitle>
              <DialogDescription>
                <span className='text-sm'>
                  This will be the name of the new collaboration document.
                </span>
              </DialogDescription>
            </DialogHeader>
            <div className='flex w-full space-x-2'>
              <Input
                value={newDocName || ''}
                placeholder='Workspace Name'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNewDocName(e.target.value)
                }
              />
              <EmojiPicker
                handleEmojiClick={(emoji: string) => {
                  setNewDocName((prev) => prev + emoji);
                }}
              >
                <Button variant={'outline'}>
                  <SmilePlus />
                </Button>
              </EmojiPicker>
            </div>
            <div className='flex justify-end space-x-2 mt-5'>
              <Button
                disabled={newDocName.length === 0 || loading}
                onClick={() => handleCreateDocument()}
              >
                {loading && (
                  <LoaderCircle className='mr-2 h-4 w-4 animate-spin' />
                )}
                Create
              </Button>
              <DialogClose asChild>
                <Button variant='outline'>Cancel</Button>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <Separator />
      <div className='flex justify-between'>
        <h2 className='font-semibold text-3xl text-slate-900'>Documents</h2>
        <div className='flex space-x-2'>
          <LayoutGrid />
          <AlignLeft />
        </div>
      </div>
      {loadingDocuments ? (
        <Skeleton className='h-96' />
      ) : workspaceDocs.length === 0 ? (
        <div className='flex flex-col w-full justify-center items-center'>
          <div className='flex flex-col w-fit justify-center items-center border rounded-md p-8 shadow-md space-y-6'>
            <p className='w-full text-center'>
              Looks like there are no documents in this workspace!
            </p>
            <ScrollText className='w-36 h-36 text-slate-700' />
          </div>
        </div>
      ) : (
        <DocumentList
          documents={workspaceDocs}
          workspaceId={workspaceId as string}
        />
      )}
    </div>
  );
}
