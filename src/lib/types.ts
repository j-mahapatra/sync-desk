import { OutputData } from '@editorjs/editorjs';
import { Timestamp } from 'firebase/firestore';

export type WorkspaceType = {
  id: string;
  coverImage: string;
  createdAt: Timestamp;
  createdBy: string;
  name: string;
  orgId: string;
};

export type DocumentsType = {
  id: string;
  name: string;
  coverImage: string;
  workspaceId: string;
  createdAt: Timestamp;
  createdBy: string;
  orgId: string;
  editorOutput?: OutputData;
  lastEditedBy?: string;
};
