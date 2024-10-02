'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import {
  Bell,
  FileText,
  LoaderCircle,
  LockOpen,
  Plus,
  SmilePlus,
} from 'lucide-react';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { db } from '@/lib/firebase-config';
import { DocumentsType, WorkspaceType } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useAuth, useUser } from '@clerk/nextjs';
import EmojiPicker from '@/components/EmojiPicker';
import DocumentSidebarActions from './DocumentSidebarActions';
import { Progress } from '@/components/ui/progress';
import { MAX_FREE_DOCUMENT_LIMIT } from '@/lib/constants';
import { DialogClose } from '@radix-ui/react-dialog';

export default function DocumentSidebar() {
  const router = useRouter();
  const { user } = useUser();
  const { orgId } = useAuth();
  const { workspaceId, documentId } = useParams();
  const [documentList, setDocumentList] = useState<DocumentsType[]>([]);
  const [newDocName, setNewDocName] = useState<string>('');
  const [isLoadingDocs, setIsLoadingDocs] = useState<boolean>(true);
  const [isCreatingDoc, setIsCreatingDoc] = useState<boolean>(false);
  const [currentWorkspaceDetails, setCurrentWorkspaceDetails] =
    useState<WorkspaceType | null>(null);

  useEffect(() => {
    async function fetchWorkspaceDetails() {
      setIsLoadingDocs(true);
      try {
        const docRef = doc(db, 'workspaces', workspaceId as string);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setCurrentWorkspaceDetails({
            id: docSnap.id,
            ...(docSnap.data() as Omit<WorkspaceType, 'id'>),
          });
        } else {
          toast.error('No such document!');
        }
      } catch (error) {
        console.log(error);
        toast.error('Error fetching documents');
      }
      setIsLoadingDocs(false);
    }

    if (workspaceId) {
      fetchWorkspaceDetails();
    }
  }, [workspaceId]);

  useEffect(() => {
    async function fetchDocumentsByWorkspaceId() {
      setIsLoadingDocs(true);
      try {
        const collectionRef = collection(db, 'documents');
        const q = query(collectionRef, where('workspaceId', '==', workspaceId));
        const querySnapshot = await getDocs(q);

        const data: DocumentsType[] = [];

        querySnapshot.forEach((doc) => {
          data.push({
            id: doc.id,
            ...(doc.data() as Omit<DocumentsType, 'id'>),
          });
        });

        setDocumentList(data);
      } catch (error) {
        console.log(error);
        toast.error('Error fetching documents');
      }
      setIsLoadingDocs(false);
    }

    if (workspaceId) {
      fetchDocumentsByWorkspaceId();
    }
  }, [workspaceId]);

  const handleCreateDocument = async () => {
    setIsCreatingDoc(true);
    try {
      if (documentList.length >= MAX_FREE_DOCUMENT_LIMIT) {
        toast.error(
          `You have reached the maximum number of documents (${MAX_FREE_DOCUMENT_LIMIT}) in this workspace. Please upgrade your plan to create more documents.`,
        );
        setIsCreatingDoc(false);
        return;
      }

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
    setIsCreatingDoc(false);
  };

  return (
    <aside className='hidden md:flex md:flex-col md:w-72 h-full p-5 shadow-sm'>
      <div className='flex w-full items-center justify-between my-5'>
        {isLoadingDocs || !currentWorkspaceDetails?.name ? (
          <Skeleton className='h-12 w-full' />
        ) : (
          <span className='font-semibold text-lg'>
            {currentWorkspaceDetails.name}
          </span>
        )}
        <Dialog>
          <DialogTrigger asChild>
            <Button className='text-xs py-1 px-2'>
              <Plus />
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
                disabled={newDocName.length === 0 || isCreatingDoc}
                onClick={() => handleCreateDocument()}
              >
                {isCreatingDoc && (
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
      <div className='flex flex-col h-full space-y-2'>
        {isLoadingDocs ? (
          Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className='h-11 w-full' />
          ))
        ) : documentList.length === 0 ? (
          <span className='text-center text-slate-500 text-sm'>
            No documents in this workspace yet!
          </span>
        ) : (
          documentList.map((doc) => (
            <div
              key={doc.id}
              className={cn(
                'flex space-x-2 items-center hover:bg-slate-300 p-2 rounded-sm transition-all cursor-pointer',
                doc.id === documentId && 'bg-slate-300',
              )}
              onClick={() =>
                router.push(`/dashboard/workspace/${workspaceId}/${doc.id}`)
              }
            >
              <FileText className='w-6 h-6' />
              <span className='text-left w-full'>{doc.name}</span>
              <DocumentSidebarActions
                document={doc}
                setDocumentList={setDocumentList}
              />
            </div>
          ))
        )}
      </div>
      {/* <div className='flex flex-col space-y-2 w-full justify-center items-center'>
        <Progress
          value={(documentList.length / MAX_FREE_DOCUMENT_LIMIT) * 100}
        />
        <span className='text-center'>
          <strong>{documentList.length}</strong> out of{' '}
          {MAX_FREE_DOCUMENT_LIMIT} documents used
        </span>
        <span className='flex items-center text-center bg-slate-300 p-1 rounded-sm px-5 cursor-pointer hover:bg-slate-400 transition-all'>
          <LockOpen />
          <span>
            Unlock <strong>Unlimited</strong> Collaborations
          </span>
        </span>
      </div> */}
    </aside>
  );
}
