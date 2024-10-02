'use client';

import React, { useState } from 'react';
import { Button } from './ui/button';
import { MagicWandIcon } from '@radix-ui/react-icons';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { LoaderCircle } from 'lucide-react';
import { Input } from './ui/input';
import toast from 'react-hot-toast';
import { OutputData } from '@editorjs/editorjs';

export default function AITemplate({
  setAiGeneratedTemplate,
}: {
  setAiGeneratedTemplate: React.Dispatch<
    React.SetStateAction<OutputData | null>
  >;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>('');

  const generateTemplate = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/generate-template', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userPrompt: inputText }),
      });

      if (!response.ok) {
        toast.error('Error generating template');
      }

      const result = await response.json();
      const data = result.data;
      setAiGeneratedTemplate(data);
      setOpen(false);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error generating template');
    }
    setLoading(false);
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <Button variant='outline' onClick={() => setOpen(true)}>
          <MagicWandIcon className='w-6 h-6 mr-2' /> Generate using AI
        </Button>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Generate a Template using AI</DialogTitle>
            <DialogDescription>
              <span className='text-sm text-slate-500'>
                Describe the document that you want to create using AI
              </span>
            </DialogDescription>
          </DialogHeader>
          <Input
            value={inputText || ''}
            placeholder='Enter the template description here'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInputText(e.target.value)
            }
          />
          <div className='flex justify-end space-x-2 mt-5'>
            <Button
              disabled={inputText.length === 0 || loading}
              onClick={() => generateTemplate()}
            >
              {loading && (
                <LoaderCircle className='mr-2 h-4 w-4 animate-spin' />
              )}
              Generate
            </Button>
            <DialogClose asChild>
              <Button variant='outline'>Cancel</Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
