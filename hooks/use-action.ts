"use client";

import { ActionState, FieldErrors } from "@/lib/create-safe-action";
import { useCallback, useState } from "react";

type Action<TInput, TOutput> = (
  data: TInput
) => Promise<ActionState<TInput, TOutput>>;

interface UseActionOptions<TOutput> {
  onSuccess?: (data: TOutput | undefined) => void;
  onError?: (error: string | null | undefined) => void;
  onComplete?: () => void;
}

export const useAction = <TInput, TOutput>(
  action: Action<TInput, TOutput>,
  options: UseActionOptions<TOutput> = {}
) => {
  const [fieldErrors, setFieldErrors] = useState<
    FieldErrors<TInput> | undefined
  >(undefined);

  const [error, setError] = useState<string | undefined>(undefined);
  const [data, setData] = useState<TOutput | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const execute = useCallback(
    async (input: TInput) => {
      setIsLoading(true);
      try {
        const result = await action(input);

        if (!result) {
          return;
        }

        if (result.fieldErrors) {
          setFieldErrors(result.fieldErrors);
          options.onError?.(result.error);
        }

        if (result.error) {
          setError(result.error);
          options.onSuccess?.(result.data);
        }
      } finally {
        setIsLoading(false);
        options.onComplete?.();
      }
    },
    [action, options]
  );
  return {
    execute,
    fieldErrors,
    error,
    data,
    isLoading,
  };
};
