"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { REACT_QUERY_KEYS } from "@/utils/constants";

import { CreateUserPlaceholderInput } from "@/types/user.type";
import { useRouter } from "next/navigation";
import { userService } from "@/services/user.service";

export function useFetchUsers() {
  return useQuery({
    queryKey: [REACT_QUERY_KEYS.USERS],
    queryFn: async () => userService.fetchAll(),
  });
}

export function useFetchUserById(userId?: string) {
  return useQuery({
    queryKey: [REACT_QUERY_KEYS.USERS, userId],
    queryFn: async () => userService.fetchById(userId),
    enabled: !!userId,
  });
}

export function useCreateUser() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation<unknown, Error, CreateUserPlaceholderInput>({
    mutationFn: async (input) => userService.create(input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [REACT_QUERY_KEYS.USERS],
      });
      router.push("/");
    },
  });
}
