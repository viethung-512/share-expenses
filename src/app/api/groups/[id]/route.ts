import { groupAdapter } from "@/adapter/group-adapter";
import { parseApiResponse, throwApiError } from "@/utils/helper";
import { RouteHandler } from "@/types/route.type";

export const GET: RouteHandler<{ id: string }> = async (_, { params }) => {
  try {
    const { id } = await params;
    const group = await groupAdapter.getDoc(id);
    if (!group) {
      return throwApiError(404, { message: "Group not found" });
    }
    return parseApiResponse(200, group);
  } catch (e: any) {
    return throwApiError(e.status || 500, e);
  }
};
