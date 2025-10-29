import { parseApiResponse, throwApiError } from "@/utils/helper";
import { expenseAdapter } from "@/adapter/expense-adapter";
import { RouteHandler } from "@/types/route.type";

export const GET: RouteHandler = async () => {
  const expenses = await expenseAdapter.getList();
  return parseApiResponse(200, expenses);
};

export const POST: RouteHandler = async (request) => {
  try {
    const body = await request.json();
    const created = await expenseAdapter.createDoc(body);
    return parseApiResponse(201, created);
  } catch (e: any) {
    return throwApiError(500, e);
  }
};
