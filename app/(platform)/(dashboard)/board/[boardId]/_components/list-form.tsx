"use client";

import { Plus, X } from "lucide-react";
import { ListWrapper } from "./list-wrapper";
import { useState, useRef, ElementRef } from "react";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

import { FormInput } from "@/components/form/form-input";
import { useParams, useRouter } from "next/navigation";
import FormSubmit from "@/components/form/form-submit";
import { Button } from "@/components/ui/button";

import { useAction } from "@/hooks/use-action";
import { createList } from "@/actions/create-list";
import { toast } from "sonner";

export const ListForm = () => {
  const router = useRouter();
  const params = useParams();
  const [isEditing, setIsEditing] = useState(false);

  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    });
  };

  const disabledEditing = () => {
    setIsEditing(false);
  };

  const { execute, fieldErrors } = useAction(createList, {
    onSuccess: (data) => {
      toast.success(`列表 "${data?.title}" 已创建`);
      disabledEditing();
      router.refresh();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onSubmit = async (formData: FormData) => {
    const title = formData.get("title") as string;
    const boardId = formData.get("boardId") as string;

    execute({ title, boardId });
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      disabledEditing();
    }
  };

  useEventListener("keydown", onKeyDown);

  // 监听点击事件，检测点击是否发生在 formRef 引用的元素外部。
  // 如果点击发生在外部，则调用 disabledEditing 函数，关闭编辑模式。
  useOnClickOutside(formRef, disabledEditing);

  if (isEditing) {
    return (
      <ListWrapper>
        <form
          ref={formRef}
          action={onSubmit}
          className="w-full p-3 rounded-md bg-white space-y-4 shadow-md"
        >
          <FormInput
            ref={inputRef}
            id="title"
            errors={fieldErrors}
            className="text-sm px-2 py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition"
            placeholder="输入列表标题..."
          />
          <input hidden value={params.boardId} name="boardId" />
          <div className="flex items-center gap-x-1">
            <FormSubmit>添加列表</FormSubmit>
            <Button onClick={disabledEditing} size={"sm"} variant={"ghost"}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </form>
      </ListWrapper>
    );
  }

  return (
    <ListWrapper>
      <button
        onClick={enableEditing}
        className="w-full p-3 rounded-md bg-white/80 hover:bg-white/50 transition flex items-center font-medium text-sm"
      >
        <Plus className="h-4 w-4 mr-2" />
        添加一个列表
      </button>
    </ListWrapper>
  );
};
