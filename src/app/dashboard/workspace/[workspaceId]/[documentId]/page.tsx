'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import CoverPicker from '@/components/CoverPicker';
import Editor from '@/components/Editor';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { COVER_IMAGE_URLS } from '@/lib/constants';
import { db } from '@/lib/firebase-config';
import { DocumentsType } from '@/lib/types';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { Camera, MessageSquareQuote, Save, SquareX } from 'lucide-react';
import toast from 'react-hot-toast';
import { Room } from '@/components/Room';
import CommentContainer from '@/components/CommentContainer';

export default function DocumentDetails() {
  const { workspaceId, documentId } = useParams();
  const [coverImage, setCoverImage] = useState<string>(COVER_IMAGE_URLS[0]);
  const [isLoadingDoc, setIsLoadingDoc] = useState<boolean>(false);
  const [currentDoc, setCurrentDoc] = useState<DocumentsType>();
  const [documentName, setDocumentName] = useState<string>('');
  const [isCommentContainerOpen, setIsCommentContainerOpen] =
    useState<boolean>(false);

  useEffect(() => {
    if (currentDoc?.name) {
      setDocumentName(currentDoc.name);
    }
    if (currentDoc?.coverImage) {
      setCoverImage(currentDoc.coverImage);
    }
  }, [currentDoc]);

  useEffect(() => {
    async function fetchDocumentById() {
      setIsLoadingDoc(true);
      try {
        const docRef = doc(db, 'documents', documentId as string);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setCurrentDoc({
            id: docSnap.id,
            ...(docSnap.data() as Omit<DocumentsType, 'id'>),
          });
        } else {
          toast.error('No such document!');
        }
      } catch (error) {
        console.log(error);
        toast.error('Error fetching documents');
      }
      setIsLoadingDoc(false);
    }

    if (documentId) {
      fetchDocumentById();
    }
  }, [documentId]);

  async function handleDocumentNameUpdate() {
    if (!currentDoc) return;

    try {
      const docRef = doc(db, 'documents', currentDoc.id);

      await updateDoc(docRef, {
        name: documentName,
      });

      const newDoc: DocumentsType = { ...currentDoc, name: documentName };
      setCurrentDoc(newDoc);

      toast.success('Document name updated successfully');
    } catch (error) {
      console.log(error);
      toast.error('Error updating document name');
    }
  }

  async function handleDocumentCoverUpdate(image: string) {
    if (!currentDoc) return;

    try {
      const docRef = doc(db, 'documents', currentDoc.id);

      await updateDoc(docRef, {
        coverImage: image,
      });

      const newDoc: DocumentsType = { ...currentDoc, coverImage: image };
      setCurrentDoc(newDoc);

      toast.success('Document name updated successfully');
    } catch (error) {
      console.log(error);
      toast.error('Error updating document name');
    }
  }

  return (
    <Room id={documentId as string}>
      <div className='flex flex-col items-center w-full h-fit p-5 overflow-auto'>
        <CoverPicker
          setCoverImage={(image) => handleDocumentCoverUpdate(image)}
        >
          <div className='relative w-full'>
            <h2 className='absolute flex w-full h-full items-center justify-center cursor-pointer hover:bg-gray-100/30 bg-transparent transition-all text-gray-600 hover:text-black'>
              <Camera className='mr-2' />
              <span>Change Cover</span>
            </h2>
            <div>
              <Image
                src={coverImage}
                alt='cover image'
                width={400}
                height={400}
                className='w-full h-36 rounded-t-lg'
              />
            </div>
          </div>
        </CoverPicker>
        <div className='relative flex w-full justify-between my-5 space-x-5'>
          {currentDoc?.name || !isLoadingDoc ? (
            <>
              <input
                value={documentName}
                className='text-left w-full font-bold text-3xl outline-none bg-transparent'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setDocumentName(e.target.value)
                }
              />
              {currentDoc && currentDoc.name !== documentName && (
                <Button onClick={() => handleDocumentNameUpdate()}>
                  <Save />
                </Button>
              )}
            </>
          ) : (
            <Skeleton className='h-8 w-48' />
          )}
          <Button onClick={() => setIsCommentContainerOpen((prev) => !prev)}>
            {isCommentContainerOpen ? <SquareX /> : <MessageSquareQuote />}
          </Button>
        </div>
        <div className='flex w-full h-fit'>
          {isCommentContainerOpen && <CommentContainer />}
        </div>
        <Separator />
        <Editor />
      </div>
    </Room>
  );
}
