import { BaseService } from "@/services/base-service";
import { Group } from "@/types/group.type";

export type FilterGroupInput = {
  name?: string;
};

class GroupService extends BaseService<Group, FilterGroupInput> {
  apiEndpoint = "/api/groups";
}

export const groupService = new GroupService();
