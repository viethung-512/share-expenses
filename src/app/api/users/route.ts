import queryString from "query-string";

import { parseApiResponse, throwApiError } from "@/utils/helper";
import { userAdapter } from "@/adapter/user-adapter";
import { RouteHandler } from "@/types/route.type";
import { FilterListInput } from "@/adapter/base-adapter";
import { User } from "@/types/user.type";
import { groupAdapter } from "@/adapter/group-adapter";

export const GET: RouteHandler = async (_request) => {
  const filters: FilterListInput<User> = {};
  const params = queryString.parseUrl(_request.url);
  const memberIdsInGroup: string[] = [];

  if (params.query.groupId) {
    const groupId = params.query.groupId as string;
    const group = await groupAdapter.getDoc(groupId);
    if (group && group.memberIds) {
      memberIdsInGroup.push(...group?.memberIds);
    }
  }

  Object.keys(params.query).forEach((paramKey) => {
    const paramValue = params.query[paramKey];
    if (paramKey === "groupId") {
      filters["id"] = {
        operation: "in",
        value: memberIdsInGroup,
      };
    } else {
      if (paramValue && paramValue.toString().trim() !== "") {
        filters[paramKey as keyof User] = {
          operation: "like",
          value: paramValue as string,
        };
      }
    }
  });

  const users = await userAdapter.getList(filters);
  return parseApiResponse(200, users);
};

export const POST: RouteHandler = async (request) => {
  try {
    const body = await request.json();
    const created = await userAdapter.createDoc(body);
    return parseApiResponse(201, created);
  } catch (e: any) {
    return throwApiError(500, e);
  }
};
