import { BaseService } from "@/services/base-service";
import { CreateGroupInput, Group } from "@/types/group.type";

export type FilterGroupInput = {
  name?: string;
};

class GroupService extends BaseService<Group, FilterGroupInput> {
  apiEndpoint = "/api/groups";

  async createGroup(data: CreateGroupInput): Promise<Group> {
    console.log(data.members);
    return super.create({
      createdByUserId: data.createdByUserId,
      name: data.name,
      totalExpenses: data.totalExpenses,
      members:
        data.members?.map((member) => ({ id: member.value, balance: 0 })) || [],
    });
  }

  getOption(group: Group) {
    return {
      label: group.name,
      value: group.id,
    };
  }
}

export const groupService = new GroupService();
