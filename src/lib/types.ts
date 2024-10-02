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
  editorOutput?: string;
  lastEditedBy?: string;
};

export type UserType = {
  email: string;
  name: string;
  username: string;
};
