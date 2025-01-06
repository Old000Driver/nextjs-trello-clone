"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

const deleteBoard = async (id: string) => {
  await db.board.delete({
    where: { id },
  });

  revalidatePath("/organization/org_2r4SYRfoolaYYGvMLDUtkxLX0i5");
};

export default deleteBoard;
