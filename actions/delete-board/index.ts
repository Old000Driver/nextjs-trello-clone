"use server";

import { InputType, ReturnType } from "./types";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { DeleteBoard } from "./schema";
import { redirect } from "next/navigation";
import { createAuditLog } from "@/lib/create-audit-log";
import { ENTITY_TYPE, ACTION } from "@prisma/client";
import { decreaseAvailableCount } from "@/lib/org-limit";
import { checkSubscription } from "@/lib/subscription";
const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const isPro = await checkSubscription();
  if (!isPro) {
    await decreaseAvailableCount();
  }

  const { id } = data;
  let board;
  try {
    board = await db.board.delete({
      where: {
        id,
        orgId,
      },
    });

    await decreaseAvailableCount();

    await createAuditLog({
      entityId: board.id,
      entityType: ENTITY_TYPE.BOARD,
      entityTitle: board.title,
      action: ACTION.DELETE,
    });
  } catch (error) {
    return {
      error: "Failed to delete board",
    };
  }
  revalidatePath(`/organization/${orgId}`);
  redirect(`/organization/${orgId}`);
};

export const deleteBoard = createSafeAction(DeleteBoard, handler);
