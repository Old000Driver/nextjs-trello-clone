"use client";

import { forwardRef, useRef, ElementRef, KeyboardEventHandler } from "react";
import { useAction } from "@/hooks/use-action";
import { createCard } from "@/actions/create-card";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { FormTextArea } from "@/components/form/form-textarea";
import FormSubmit from "@/components/form/form-submit";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { toast } from "sonner";

interface CardFormProps {
  listId: string;
  enableEditing: () => void;
  disabledEditing: () => void;
  isEditing: boolean;
}

export const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(
  (
    { listId, enableEditing, disabledEditing, isEditing }: CardFormProps,
    ref
  ) => {
    const params = useParams();
    const formRef = useRef<ElementRef<"form">>(null);
    const { execute, fieldErrors } = useAction(createCard, {
      onSuccess: (data) => {
        toast.success(`卡片 "${data?.title}" 已创建`);
        formRef.current?.reset();
      },
      onError: (error) => {
        toast.error(error);
      },
    });

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        disabledEditing();
      }
    };

    useOnClickOutside(formRef, () => {
      disabledEditing();
    });

    useEventListener("keydown", onKeyDown);

    const onTextareaKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (
      e
    ) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        formRef.current?.requestSubmit();
      }
    };

    const onSubmit = (formData: FormData) => {
      const title = formData.get("title") as string;
      console.log('title!!',title, typeof title);
      const listId = formData.get("listId") as string;
      const boardId = params.boardId as string;

      execute({ title, listId, boardId });
    };

    if (isEditing) {
      return (
        <form
          ref={formRef}
          action={onSubmit}
          className="m-1 py-0.5 px-1 space-y-4"
        >
          <FormTextArea
            id="title"
            onKeyDown={onTextareaKeyDown}
            ref={ref}
            placeholder="输入卡片标题..."
            errors={fieldErrors}
            
          />
          <input hidden id="listId" name="listId" value={listId}  />
          <div className="flex items-center gap-x-1">
            <FormSubmit>添加卡片</FormSubmit>
            <Button onClick={disabledEditing} size={"sm"} variant={"ghost"}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </form>
      );
    }

    return (
      <div className="pt-2 px-2">
        <Button
          onClick={enableEditing}
          className="h-auto px-2 py-1.5 w-full justify-start text-muted-foreground text-sm"
          size={"sm"}
          variant={"ghost"}
        >
          <Plus className="h-4 w-4 mr-2" />
          添加一个卡片
        </Button>
      </div>
    );
  }
);

CardForm.displayName = "CardForm";
