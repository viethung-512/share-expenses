import { BaseService } from "@/services/base-service";
import { CreateExpenseInput, Expense } from "@/types/expense.type";

export type FilterExpensesInput = {
  groupId?: string;
};

class ExpenseService extends BaseService<Expense, FilterExpensesInput> {
  apiEndpoint = "/api/expenses";

  createExpense(data: CreateExpenseInput): Promise<Expense> {
    return this.create({
      amount: data.amount,
      title: data.title,
      date: data.date,
      payerId: data.payer ? data.payer.value : "",
      groupId: data.group ? data.group.value : "",
      memberIdsInvolved:
        data.membersInvolved?.map((member) => member.value) || [],
      description: data.description,
    });
  }
}

export const expenseService = new ExpenseService();
