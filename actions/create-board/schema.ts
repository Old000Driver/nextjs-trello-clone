import { z } from "zod";

export const CreateBoard = z.object({
  title: z
    .string({
      required_error: "标题必须填写",
      invalid_type_error: "标题必须填写",
    })
    .min(3, {
      message: "Title is too short",
    }),

  image: z.string({
    required_error: "Image is required",
    invalid_type_error: "Image is required",
  }),
});
