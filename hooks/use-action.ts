// 使用客户端的React Hooks和自定义类型来创建一个可重用的动作钩子
"use client";

import { ActionState, FieldErrors } from "@/lib/create-safe-action";
import { useCallback, useState } from "react";

// 定义一个泛型Action，它接受输入数据并返回一个包含操作状态的Promise
type Action<TInput, TOutput> = (
  data: TInput
) => Promise<ActionState<TInput, TOutput>>;

// 定义使用动作钩子的选项接口，包括成功、错误和完成时的回调函数
interface UseActionOptions<TOutput> {
  onSuccess?: (data: TOutput | undefined) => void;
  onError?: (error: string | null | undefined) => void;
  onComplete?: () => void;
}

// useAction钩子，用于执行安全操作并处理结果
export const useAction = <TInput, TOutput>(
  action: Action<TInput, TOutput>, // 动作函数，执行实际操作
  options: UseActionOptions<TOutput> = {} // 可选配置，包括回调函数
) => {
  // 状态管理：字段错误、通用错误、操作数据和加载状态
  const [fieldErrors, setFieldErrors] = useState<
    FieldErrors<TInput> | undefined
  >(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [data, setData] = useState<TOutput | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // execute函数，用于执行传入的动作
  const execute = useCallback(
    async (input: TInput) => {
      setIsLoading(true); // 操作开始时设置加载状态为true
      try {
        const result = await action(input); // 执行动作

        if (!result) {
          return;
        }

        // 校验更新状态
        setFieldErrors(result.fieldErrors);

        // 如果有通用错误，更新状态并调用成功回调
        if (result.error) {
          setError(result.error);
          options.onError?.(result.error);
        }
        if (result.data) {
          setData(result.data);
          options.onSuccess?.(result.data);
        }
      } finally {
        setIsLoading(false); // 操作结束时设置加载状态为false
        options.onComplete?.(); // 调用完成回调
      }
    },
    [action, options] // 依赖项：动作函数和选项
  );
  // 返回execute函数和状态，供外部使用
  return {
    execute,
    fieldErrors,
    error,
    data,
    isLoading,
  };
};
