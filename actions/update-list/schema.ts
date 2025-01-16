import { z } from "zod";

// schema 描述校验规则

export const UpdateList = z.object({
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title must be a string",
    })
    .min(3, {
      message: "Title must be at least 3 characters long",
    }),
  id: z.string(),
  boardId: z.string(),
});
