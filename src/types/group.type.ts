import { MultiSelectOption } from "@/types/input-select.type";

export type Group = {
  id: string;
  createdByUserId: string;
  name: string;
  members?: { id: string; balance: number }[];
  totalExpenses: number;
};

export type CreateGroupInput = Omit<Group, "id" | "members"> & {
  members?: MultiSelectOption;
};
export type UpdateGroupInput = Partial<Omit<Group, "id">>;
