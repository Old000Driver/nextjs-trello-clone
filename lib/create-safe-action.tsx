import { z } from "zod";

/**
 * 定义一个类型，用于表示字段错误信息
 * @template T - 表单数据的类型
 */
export type FieldErrors<T> = {
  [K in keyof T]?: string[];
};

/**
 * 定义一个类型，用于表示操作的状态
 * @template TInput - 输入数据的类型
 * @template TOutput - 输出数据的类型
 */
export type ActionState<TInput, TOutput> = {
  fieldErrors?: FieldErrors<TInput>;
  error?: string | null;
  data?: TOutput;
};

/**
 * 创建一个安全操作的工厂函数
 * 该函数接受一个解析模式和一个处理函数，返回一个经过数据验证的安全操作函数
 * @template TInput - 输入数据的类型
 * @template TOutput - 输出数据的类型
 * @param {z.Schema<TInput>} schema - 数据验证的解析模式
 * @param {Function} handler - 数据验证通过后的处理函数，返回一个Promise包含操作状态
 * @returns {Function} - 一个接受输入数据并返回一个Promise包含操作状态的安全操作函数
 */
export const createSafeAction = <TInput, TOutput>(
  schema: z.Schema<TInput>,
  handler: (validateData: TInput) => Promise<ActionState<TInput, TOutput>>
) => {
  return async (data: TInput): Promise<ActionState<TInput, TOutput>> => {
    // 使用提供的解析模式验证输入数据
    const validationResult = schema.safeParse(data);
    // 如果数据验证失败，返回字段错误信息
    if (!validationResult.success)
      return {
        fieldErrors: validationResult.error.flatten()
          .fieldErrors as FieldErrors<TInput>,
      };
    // 如果数据验证成功，调用处理函数并返回其结果
    return handler(validationResult.data);
  };
};
