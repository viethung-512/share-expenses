import { BaseAdapter } from "@/adapter/base-adapter";
import { Expense } from "@/types/expense.type";

class ExpenseAdapter extends BaseAdapter<Expense> {
  collectionName = "expenses";
}

export const expenseAdapter = new ExpenseAdapter();
