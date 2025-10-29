import { BaseAdapter } from "@/adapter/base-adapter";
import { Group } from "@/types/group.type";

class GroupAdapter extends BaseAdapter<Group> {
  collectionName: string = "groups";
}

export const groupAdapter = new GroupAdapter();
