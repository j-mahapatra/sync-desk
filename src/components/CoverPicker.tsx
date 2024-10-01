import React from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { COVER_IMAGE_URLS } from '@/lib/constants';
import Image from 'next/image';

type CoverPicketProps = {
  children: React.ReactNode;
  setCoverImage: (image: string) => void;
};

export default function CoverPicker({
  children,
  setCoverImage,
}: CoverPicketProps) {
  return (
    <div className='flex w-full'>
      <Dialog>
        <DialogTrigger className='flex w-full'>{children}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Choose from one of these cover images:</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className='grid grid-cols-3 gap-2 mt-2'>
            {COVER_IMAGE_URLS.map((url, index) => (
              <div
                key={url}
                className='w-full h-32 cursor-pointer hover:opacity-75'
              >
                <DialogClose asChild onClick={() => setCoverImage(url)}>
                  <Image
                    src={url}
                    alt={`Cover Image ${index}`}
                    width={200}
                    height={140}
                    className='w-full h-full rounded-md shadow-sm'
                  />
                </DialogClose>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
