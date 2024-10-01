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
  workspaceId: string;
  createdAt: string;
  createdBy: string;
  orgId: string;
};
