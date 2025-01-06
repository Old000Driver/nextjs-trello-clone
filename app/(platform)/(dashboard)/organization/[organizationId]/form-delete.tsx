"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

const FormDelete = () => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      variant={"destructive"}
      size={"sm"}
      disabled={pending}
    >
      Delete
    </Button>
  );
};

export default FormDelete;
