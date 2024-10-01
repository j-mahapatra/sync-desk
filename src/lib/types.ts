import { OutputData } from '@editorjs/editorjs';

export type WorkspaceType = {
  id: string;
  coverImage: string;
  createdAt: string;
  createdBy: string;
  name: string;
  orgId: string;
};

export type DocumentsType = {
  id: string;
  name: string;
  coverImage: string;
  workspaceId: string;
  createdAt: string;
  createdBy: string;
  orgId: string;
  editorOutput?: OutputData;
  lastEditedBy?: string;
};
