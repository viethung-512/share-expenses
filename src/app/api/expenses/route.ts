import Decimal from "decimal.js";

import { parseApiResponse, throwApiError } from "@/utils/helper";
import { expenseAdapter } from "@/adapter/expense-adapter";
import { RouteHandler } from "@/types/route.type";
import { groupAdapter } from "@/adapter/group-adapter";
import { Group } from "@/types/group.type";
import { CreateExpenseInput } from "@/types/expense.type";

export const GET: RouteHandler = async () => {
  const expenses = await expenseAdapter.getList();
  return parseApiResponse(200, expenses);
};

export const POST: RouteHandler = async (request) => {
  try {
    const body = await request.json();
    // 1. Create expense
    const created = await expenseAdapter.createDoc(body);

    // 2. Update related data (e.g., update group's total expenses) - omitted for brevity
    const group = await groupAdapter.getDoc(body.groupId);
    if (group) {
      const updatedTotal = new Decimal(group.totalExpenses || 0)
        .plus(body.amount)
        .toNumber();
      const memberBalances = getUpdatedMemberBalances(group, body);
      await groupAdapter.updateDoc(body.groupId, {
        totalExpenses: updatedTotal,
        members: Object.keys(memberBalances).map((memberId) => {
          return {
            id: memberId,
            balance: memberBalances[memberId],
          };
        }),
      });
    }

    // 3. Update group members' balances - omitted for brevity

    return parseApiResponse(201, created);
  } catch (e: any) {
    return throwApiError(500, e);
  }
};

const getUpdatedMemberBalances = (
  group: Group,
  requestBody: CreateExpenseInput,
): Record<string, number> => {
  const memberBalances: Record<string, number> = {};

  const totalMembers = requestBody.membersInvolved
    ? requestBody.membersInvolved.length
    : (group.members || []).length;
  const sharePerMember = new Decimal(requestBody.amount)
    .dividedBy(totalMembers)
    .toNumber();

  (group.members || []).forEach((member) => {
    if (member.id === requestBody.payer?.value) {
      // Payer's balance increases by (amount - share)
      const currentBalance = memberBalances[member.id] || 0;
      memberBalances[member.id] =
        currentBalance + (requestBody.amount - sharePerMember);
    } else if (
      requestBody.membersInvolved &&
      requestBody.membersInvolved.find((m) => m.value === member.id)
    ) {
      // Involved members' balance decreases by share
      const currentBalance = memberBalances[member.id] || 0;
      memberBalances[member.id] = currentBalance - sharePerMember;
    }
  });

  return memberBalances;
};
