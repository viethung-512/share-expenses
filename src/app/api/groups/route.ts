import { groupAdapter } from "@/adapter/group-adapter";
import { parseApiResponse, throwApiError } from "@/utils/helper";
import { RouteHandler } from "@/types/route.type";

export const GET: RouteHandler = async () => {
  const groups = await groupAdapter.getList();
  return parseApiResponse(200, groups);
};

export const POST: RouteHandler = async (request) => {
  try {
    const body = await request.json();
    const created = await groupAdapter.createDoc(body);
    return parseApiResponse(201, created);
  } catch (e: any) {
    return throwApiError(500, e);
  }
};
