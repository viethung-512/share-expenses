import {
  MultiSelectOption,
  SingleSelectOption,
} from "@/types/input-select.type";

export type Expense = {
  id: string;
  amount: number;
  title: string;
  date: string;
  payerId: string;
  groupId: string;
  memberIdsInvolved: string[];
  description?: string;
};

export type CreateExpenseInput = Omit<
  Expense,
  "id" | "payerId" | "groupId" | "memberIdsInvolved"
> & {
  payer: SingleSelectOption | null;
  group: SingleSelectOption | null;
  membersInvolved?: MultiSelectOption;
};
