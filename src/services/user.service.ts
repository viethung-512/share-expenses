import { BaseService } from "@/services/base-service";
import { User } from "@/types/user.type";

export type FilterUsersInput = {
  username?: string;
  groupId?: string;
};

class UserService extends BaseService<User, FilterUsersInput> {
  apiEndpoint = "/api/users";
}

export const userService = new UserService();
