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
export type CreateExpenseInput = Omit<Expense, "id">;
