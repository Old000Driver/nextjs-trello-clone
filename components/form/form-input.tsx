"use client";

import { forwardRef } from "react";
import { useFormStatus } from "react-dom";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import FormErrors from "./form-errors";

interface FormInputProps {
  id: string;
  label?: string;
  type?: string;
  placeholder?: string;
  errors?: Record<string, string[] | undefined>;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  defaultValue?: string;
  onBlur?: () => void;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      id,
      label,
      type = "text",
      placeholder,
      errors,
      className,
      disabled,
      required,
      defaultValue = "",
      onBlur,
    },
    ref
  ) => {
    const { pending } = useFormStatus();
    return (
      <div className="space-y-2">
        <div className="space-y-1">
          {label ? (
            <Label
              htmlFor="id"
              className="text-xs font-semibold text-neutral-700"
            >
              {label}
            </Label>
          ) : null}
          <Input
            onBlur={onBlur}
            defaultValue={defaultValue}
            ref={ref}
            name={id}
            id={id}
            type={type}
            placeholder={placeholder}
            disabled={disabled || pending}
            required={required}
            className={cn("text-sm px-2 py-1 h-7", className)}
            aria-describedby={`${id}-error`}
          />
          {/* aria-describedby属性，其值为${id}-error。这通常用于辅助技术（如屏幕阅读器）描述该元素的错误信息 */}
        </div>
        <FormErrors errors={errors} id={id} />
      </div>
    );
  }
);

FormInput.displayName = "FormInput";
