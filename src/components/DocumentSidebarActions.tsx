'use client';

import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';
import {
  Edit,
  EllipsisVertical,
  LoaderCircle,
  SmilePlus,
  Trash2,
} from 'lucide-react';
import { db } from '@/lib/firebase-config';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import EmojiPicker from '@/components/EmojiPicker';
import { DocumentsType } from '@/lib/types';
import { Input } from '@/components/ui/input';

export default function DocumentSidebarActions({
  document,
  setDocumentList,
}: {
  document: DocumentsType;
  setDocumentList: React.Dispatch<React.SetStateAction<DocumentsType[]>>;
}) {
  const [currentDocName, setCurrentDocName] = useState<string>(document.name);
  const [isUpdatingDoc, setIsUpdatingDoc] = useState<boolean>(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  async function handleUpdateDocument(docId: string) {
    setIsUpdatingDoc(true);
    try {
      const docRef = doc(db, 'documents', docId);

      await updateDoc(docRef, {
        name: currentDocName,
      });

      setDocumentList((prev) =>
        prev.map((doc) =>
          doc.id === docId ? { ...doc, name: currentDocName } : doc,
        ),
      );

      toast.success('Document updated successfully');
      setDialogOpen(false);
      setDropdownOpen(false);
    } catch (error) {
      console.error('Error updating document: ', error);
      toast.error('Error updating document name');
    }
    setIsUpdatingDoc(false);
  }
  async function handleDeleteDocument(docId: string) {
    try {
      const docRef = doc(db, 'documents', docId);
      await deleteDoc(docRef);

      toast.success('Document successfully deleted');
    } catch (error) {
      console.log(error);
      toast.error('Error deleting document');
    }
  }
  return (
    <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon'>
          <EllipsisVertical className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <DropdownMenuItem
              className='space-x-2 hover:bg-slate-400 cursor-pointer'
              onSelect={(e) => e.preventDefault()}
            >
              <Edit /> <span>Rename</span>
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Enter the new name of your document:</DialogTitle>
              <DialogDescription>
                <span className='text-sm'>
                  This will be the new name of the selected collaboration
                  document.
                </span>
              </DialogDescription>
            </DialogHeader>
            <div className='flex w-full space-x-2'>
              <Input
                value={currentDocName || ''}
                placeholder='Workspace Name'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setCurrentDocName(e.target.value)
                }
              />
              <EmojiPicker
                handleEmojiClick={(emoji: string) => {
                  setCurrentDocName((prev) => prev + emoji);
                }}
              >
                <Button variant={'outline'}>
                  <SmilePlus />
                </Button>
              </EmojiPicker>
            </div>
            <div className='flex justify-end space-x-2 mt-5'>
              <Button
                disabled={currentDocName.length === 0 || isUpdatingDoc}
                onClick={() => handleUpdateDocument(document.id)}
              >
                {isUpdatingDoc && (
                  <LoaderCircle className='mr-2 h-4 w-4 animate-spin' />
                )}
                Update
              </Button>
              <DialogClose asChild>
                <Button variant='outline'>Cancel</Button>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
        <DropdownMenuItem
          className='space-x-2 hover:bg-red-400 cursor-pointer'
          onClick={() => handleDeleteDocument(document.id)}
        >
          <Trash2 /> <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
