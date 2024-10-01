'use client';

import { useParams } from 'next/navigation';
import React from 'react';

export default function DocumentDetails() {
  const { documentId } = useParams();
  return <div>{documentId}</div>;
}
