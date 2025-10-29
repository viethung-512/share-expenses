import { parseApiResponse, throwApiError } from "@/utils/helper";
import { expenseAdapter } from "@/adapter/expense-adapter";
import { RouteHandler } from "@/types/route.type";

export const GET: RouteHandler<{ id: string }> = async (_, { params }) => {
  try {
    const { id } = await params;
    const expense = await expenseAdapter.getDoc(id);
    if (!expense) {
      return throwApiError(404, { message: "Expense not found" });
    }
    return parseApiResponse(200, expense);
  } catch (e: any) {
    return throwApiError(e.status || 500, e);
  }
};
