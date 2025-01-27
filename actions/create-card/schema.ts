import { z } from "zod";

export const CreateCard = z.object({
  title: z
    .string({
      required_error: "标题必须填写",
      invalid_type_error: "标题必须是字符",
    })
    .min(3, {
      message: "标题必须大于 3 个字符",
    }),
  boardId: z.string(),
  listId: z.string(),
});
