"use client";

import { create } from "@/actions/create-board";
import { useFormState } from "react-dom";
import { State } from "@/actions/create-board";
import FormInput from "./form-input";
import FormButton from "./form-button";

export const Form = () => {
  const initialState: State = { message: null, errors: {} };
  const [state, dispatch] = useFormState(create, initialState);
  // 用于更新表单状态并触发 create 函数。

  return (
    <form action={dispatch} className="flex flex-col space-y-2">
      <FormInput errors={state?.errors} />
      <FormButton />
    </form>
  );
};
