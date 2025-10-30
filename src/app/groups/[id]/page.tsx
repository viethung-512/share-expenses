"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

import { useFetchGroupById } from "@/app/react-queries/group";
import { useFetchExpenses } from "@/app/react-queries/expense";
import { useFetchUsers } from "@/app/react-queries/user";
import { DetailsPageWrapper } from "@/components/details-page-wrapper";
import { Button } from "@/components/button";
import { CreateExpenseModal } from "@/app/groups/[id]/CreateExpenseModal";

export default function GroupDetailsPage() {
  const params = useParams();
  const groupId = Array.isArray(params?.id) ? params?.id[0] : params?.id;

  const { data: group, isLoading: groupLoading } = useFetchGroupById(groupId);
  const { data: expenses, isLoading: expensesLoading } = useFetchExpenses({
    groupId,
  });
  const { data: users, isLoading: usersLoading } = useFetchUsers({ groupId });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const groupExpenses = (expenses ?? []).filter((e) => e.groupId === groupId);
  const usersById = (users ?? []).reduce<Record<string, any>>((acc, u) => {
    acc[u.id] = u;
    return acc;
  }, {});

  return (
    <DetailsPageWrapper title={group?.name ?? "Group not found"}>
      <section className="mb-6">
        <h2 className="text-lg font-semibold">Total expenses</h2>
        <p>{group?.totalExpenses}</p>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold">Members</h2>
        <ul className="list-disc pl-5">
          {group?.members && group.members.length > 0 ? (
            group.members.map((memberId) => (
              <li key={memberId}>
                <Link href={`/users/${memberId}`}>
                  {usersById[memberId]?.username ?? memberId}
                </Link>
              </li>
            ))
          ) : (
            <li>No members</li>
          )}
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold">Expenses</h2>
        <Button onClick={() => setIsModalOpen(true)}>Create expense</Button>
        {group && (
          <CreateExpenseModal
            isModalOpen={isModalOpen}
            onDismissAction={() => setIsModalOpen(false)}
            group={group}
          />
        )}
        <ul className="list-disc pl-5">
          {groupExpenses.length > 0 ? (
            groupExpenses.map((exp) => (
              <li key={exp.id} className="mb-2">
                <div>
                  <strong>{exp.title}</strong> — {exp.amount} —{" "}
                  {new Date(exp.date).toLocaleDateString()} — paid by{" "}
                  {usersById[exp.payerId]?.username ?? exp.payerId}
                </div>
                {exp.description ? (
                  <div className="text-sm text-gray-600">{exp.description}</div>
                ) : null}
              </li>
            ))
          ) : (
            <li>No expenses for this group</li>
          )}
        </ul>
      </section>
    </DetailsPageWrapper>
  );
}
