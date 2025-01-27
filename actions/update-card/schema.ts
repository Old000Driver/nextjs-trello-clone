import { optional, z } from "zod";

export const UpdateCard = z.object({
  boardId: z.string(),
  description: z.optional(
    z.string({ required_error: "Description is required" }).min(3, {
      message: "Description is too short",
    })
  ),
  title: z.optional(
    z
      .string({
        required_error: "标题必须填写",
        invalid_type_error: "标题必须是字符",
      })
      .min(3, {
        message: "标题必须大于 3 个字符",
      })
  ),
  id: z.string(),
});
