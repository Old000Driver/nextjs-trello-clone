"use server";

import { InputType, ReturnType } from "./types";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { UpdateCardOrder } from "./schema";
const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { items, boardId } = data;
  let updateCards;
  try {
    const transaction = items.map((card) =>
      db.card.update({
        where: {
          id: card.id,
          list: {
            board: {
              orgId,
            },
          },
        },
        data: {
          order: card.order, // 更新卡片的顺序
          listId: card.listId,
        },
      })
    );

    //  db.$transaction 来确保多个数据库更新操作在一个事务中执行。这样可以保证所有更新操作要么全部成功，要么全部失败，从而保持数据的一致性。
    updateCards = await db.$transaction(transaction);
  } catch (error) {
    return {
      error: "Failed to reorder lists",
    };
  }
  revalidatePath(`/board/${boardId}`);
  return { data: updateCards };
};

export const updateCardOrder = createSafeAction(UpdateCardOrder, handler);
