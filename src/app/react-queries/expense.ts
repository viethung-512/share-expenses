"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { REACT_QUERY_KEYS } from "@/utils/constants";

import { CreateExpenseInput } from "@/types/expense.type";
import {
  expenseService,
  FilterExpensesInput,
} from "@/services/expense.service";
import { useRouter } from "next/navigation";

export function useFetchExpenses(filters?: FilterExpensesInput) {
  return useQuery({
    queryKey: [REACT_QUERY_KEYS.EXPENSES, filters],
    queryFn: async () => expenseService.fetchAll(filters),
  });
}

export function useFetchExpenseById(expenseId?: string) {
  return useQuery({
    queryKey: [REACT_QUERY_KEYS.EXPENSES, expenseId],
    queryFn: async () => expenseService.fetchById(expenseId),
    enabled: !!expenseId,
  });
}

export function useCreateExpense() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation<unknown, Error, CreateExpenseInput>({
    mutationFn: async (input) => expenseService.createExpense(input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [REACT_QUERY_KEYS.EXPENSES],
      });
      router.push("/");
    },
  });
}
