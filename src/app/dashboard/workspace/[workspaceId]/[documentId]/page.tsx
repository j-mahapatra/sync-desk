'use client';

import { useParams } from 'next/navigation';
import React from 'react';

export default function DocumentDetails() {
  const { documentId } = useParams();

  return <div className='flex w-full'>{documentId}</div>;
}
