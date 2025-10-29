import { BaseService } from "@/services/base-service";
import { Expense } from "@/types/expense.type";

export type FilterExpensesInput = {};

class ExpenseService extends BaseService<Expense, FilterExpensesInput> {
  apiEndpoint = "/api/expenses";
}

export const expenseService = new ExpenseService();
