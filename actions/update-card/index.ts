"use server";

import { InputType, ReturnType } from "./types";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { UpdateCard } from "./schema";
import { createAuditLog } from "@/lib/create-audit-log";
import { ENTITY_TYPE, ACTION } from "@prisma/client";
const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { id, boardId, ...values } = data;
  // console.log("cardUpdate🔔", data);
  let card;
  try {
    card = await db.card.update({
      where: {
        id,
        list: {
          boardId,
        },
      },
      data: {
        ...values,
      },
    });

    await createAuditLog({
      entityId: card.id,
      entityType: ENTITY_TYPE.CARD,
      entityTitle: card.title,
      action: ACTION.UPDATE,
    });
  } catch (error) {
    // console.log("cardUpdate-error⚠️", error);
    return {
      error: "Failed to update card",
    };
  }
  revalidatePath(`/board/${boardId}`);
  return { data: card };
};

export const updateCard = createSafeAction(UpdateCard, handler);
