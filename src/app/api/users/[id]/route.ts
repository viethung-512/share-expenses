import { parseApiResponse, throwApiError } from "@/utils/helper";
import { userAdapter } from "@/adapter/user-adapter";
import { RouteHandler } from "@/types/route.type";

export const GET: RouteHandler<{ id: string }> = async (_, { params }) => {
  try {
    const { id } = await params;
    const user = await userAdapter.getDoc(id);
    if (!user) {
      return throwApiError(404, { message: "User not found" });
    }
    return parseApiResponse(200, user);
  } catch (e: any) {
    return throwApiError(e.status || 500, e);
  }
};
