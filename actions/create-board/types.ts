import { z } from "zod";
import { Board } from "@prisma/client";
import { ActionState } from "@/lib/create-safe-action";
import { CreateBoard } from "./schema";

// 通过 z.infer 推断出 CreateBoard 类型定义的输入类型
export type InputType = z.infer<typeof CreateBoard>;
export type ReturnType = ActionState<InputType, Board>;
