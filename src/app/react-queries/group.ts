"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { REACT_QUERY_KEYS } from "@/utils/constants";
import { CreateGroupInput } from "@/types/group.type";
import { groupService } from "@/services/group.service";
import { useRouter } from "next/navigation";

export function useFetchGroups() {
  return useQuery({
    queryKey: [REACT_QUERY_KEYS.GROUPS],
    queryFn: async () => groupService.fetchAll(),
  });
}

export function useFetchGroupById(groupId?: string) {
  return useQuery({
    queryKey: [REACT_QUERY_KEYS.GROUPS, groupId],
    queryFn: async () => groupService.fetchById(groupId),
    enabled: !!groupId,
  });
}

export function useCreateGroup() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation<unknown, Error, CreateGroupInput>({
    mutationFn: async (input) => groupService.createGroup(input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [REACT_QUERY_KEYS.GROUPS],
      });
      router.push("/");
    },
  });
}
