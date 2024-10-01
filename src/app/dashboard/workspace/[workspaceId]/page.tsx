'use client';

import React from 'react';
import { useParams } from 'next/navigation';

export default function WorkspaceDetails() {
  const { workspaceId } = useParams();

  return <div>{workspaceId}</div>;
}
