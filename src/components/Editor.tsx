'use client';

import { useRef, useEffect, useState } from 'react';
import EditorJS, {
  API,
  BlockMutationEvent,
  OutputData,
} from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Checklist from '@editorjs/checklist';
import Table from 'editorjs-table';
import LinkTool from '@editorjs/link';
import Delimiter from '@editorjs/delimiter';
import Alert from 'editorjs-alert';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase-config';
import { useParams } from 'next/navigation';
import { useUser } from '@clerk/nextjs';

export default function Editor() {
  const { user } = useUser();
  const editorRef = useRef<HTMLDivElement | null>(null);
  const editorInstanceRef = useRef<EditorJS | null>(null);
  const { documentId } = useParams();
  let isFetched = false;

  const saveEditorChanges = (
    api: API,
    event: BlockMutationEvent | BlockMutationEvent[],
  ) => {
    editorInstanceRef?.current?.save()?.then(async (data) => {
      if (documentId) {
        const docRef = doc(db, 'documents', documentId as string);
        await updateDoc(docRef, {
          editorOutput: JSON.stringify(data),
          lastEditedBy: user?.primaryEmailAddress?.emailAddress ?? '',
        });
      }
    });
  };

  useEffect(() => {
    if (editorRef.current && !editorInstanceRef.current) {
      try {
        editorInstanceRef.current = new EditorJS({
          onChange: (api, event) => {
            saveEditorChanges(api, event);
          },
          onReady: () => {
            const unsubscribe = onSnapshot(
              doc(db, 'documents', documentId as string),
              (doc) => {
                if (doc.exists()) {
                  const data = doc.data();
                  if (!isFetched && data?.editorOutput) {
                    editorInstanceRef.current?.render(
                      JSON.parse(data?.editorOutput),
                    );
                  }
                  isFetched = true;
                }
              },
            );
          },
          holder: editorRef.current,
          tools: {
            header: Header,
            checklist: {
              class: Checklist,
              inlineToolbar: true,
            },
            table: {
              class: Table,
              inlineToolbar: true,
              config: {
                rows: 2,
                cols: 3,
              },
            },
            linkTool: {
              class: LinkTool,
              config: {
                endpoint: '',
              },
            },
            delimiter: Delimiter,
            alert: {
              class: Alert,
              inlineToolbar: true,
              config: {
                alertTypes: [
                  'primary',
                  'secondary',
                  'info',
                  'success',
                  'warning',
                  'danger',
                  'light',
                  'dark',
                ],
                defaultType: 'primary',
              },
            },
          },
        });
      } catch (error) {
        console.error('EditorJS initialization error:', error);
      }
    }

    return () => {
      if (editorInstanceRef.current) {
        editorInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className='flex w-full h-full max-h-[450px] overflow-y-auto bg-slate-300'>
      <div ref={editorRef} className='w-full'></div>
    </div>
  );
}
