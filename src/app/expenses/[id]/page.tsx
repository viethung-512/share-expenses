"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useFetchExpenseById } from "@/app/react-queries/expense";
import { useFetchUsers } from "@/app/react-queries/user";
import { useFetchGroups } from "@/app/react-queries/group";
import { DetailsPageWrapper } from "@/components/details-page-wrapper";

export default function ExpenseDetailsPage() {
  const params = useParams();
  const expenseId = Array.isArray(params?.id) ? params?.id[0] : params?.id;

  const { data: expense, isLoading: expenseLoading } =
    useFetchExpenseById(expenseId);
  const { data: users, isLoading: usersLoading } = useFetchUsers();
  const { data: groups, isLoading: groupsLoading } = useFetchGroups();

  const usersById = (users ?? []).reduce<Record<string, any>>((acc, u) => {
    acc[u.id] = u;
    return acc;
  }, {});

  const groupsById = (groups ?? []).reduce<Record<string, any>>((acc, g) => {
    acc[g.id] = g;
    return acc;
  }, {});

  const loading = expenseLoading || usersLoading || groupsLoading;

  if (!expense && !loading) {
    return (
      <DetailsPageWrapper title={"Expense not found"}>
        <div>Expense not found</div>
      </DetailsPageWrapper>
    );
  }

  return (
    <DetailsPageWrapper title={expense?.title ?? "Expense details"}>
      <div className={"flex flex-col gap-2"}>
        <div>
          <strong>Amount:</strong> {expense?.amount}
        </div>
        <div>
          <strong>Date:</strong>{" "}
          {expense?.date ? new Date(expense.date).toLocaleDateString() : "-"}
        </div>
        <div>
          <strong>Group:</strong>{" "}
          {expense?.groupId ? (
            <Link href={`/groups/${expense.groupId}`}>
              {groupsById[expense.groupId]?.name ?? expense.groupId}
            </Link>
          ) : (
            "-"
          )}
        </div>
        <div>
          <strong>Payer:</strong>{" "}
          {expense?.payerId ? (
            <Link href={`/users/${expense.payerId}`}>
              {usersById[expense.payerId]?.username ?? expense.payerId}
            </Link>
          ) : (
            "-"
          )}
        </div>

        <div>
          <strong>Involved:</strong>
          <ul className={"list-disc pl-5"}>
            {expense?.memberIdsInvolved &&
            expense.memberIdsInvolved.length > 0 ? (
              expense.memberIdsInvolved.map((m) => (
                <li key={m}>
                  <Link href={`/users/${m}`}>
                    {usersById[m]?.username ?? m}
                  </Link>
                </li>
              ))
            ) : (
              <li>-</li>
            )}
          </ul>
        </div>

        {expense?.description ? (
          <div className={"text-sm text-gray-600 mt-2"}>
            {expense.description}
          </div>
        ) : null}
      </div>
    </DetailsPageWrapper>
  );
}
