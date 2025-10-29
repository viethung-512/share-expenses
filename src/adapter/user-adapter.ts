import { BaseAdapter } from "@/adapter/base-adapter";
import { User } from "@/types/user.type";

class UserAdapter extends BaseAdapter<User> {
  collectionName: string = "users";

  async saveToDb(
    id: string,
    data: { username?: string; email?: string; avatarUrl?: string },
  ) {
    const existingUser = await this.getDoc(id);
    if (!existingUser) {
      await this.updateDoc(id, { id, ...data });
    }
  }
}

export const userAdapter = new UserAdapter();
