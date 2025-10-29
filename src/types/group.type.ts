export type Group = {
  id: string;
  createdByUserId: string;
  name: string;
  memberIds?: string[];
};
export type CreateGroupInput = Omit<Group, "id">;
export type UpdateGroupInput = Partial<Omit<Group, "id">>;
