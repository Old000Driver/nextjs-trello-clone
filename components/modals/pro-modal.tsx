"use client";

import { useProModal } from "@/hooks/use-pro-modal";
import { Dialog, DialogContent } from "../ui/dialog";
import Image from "next/image";
import { Button } from "../ui/button";
import { useAction } from "@/hooks/use-action";
import { stripeRedirect } from "@/actions/stripe-redirect";
import { toast } from "sonner";

export const ProModal = () => {
  const proModal = useProModal();

  const { execute, isLoading } = useAction(stripeRedirect, {
    onSuccess: (data) => {
      if (!data) return;
      window.location.href = data;
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onClick = () => {
    proModal.onClose();
    execute({});
  };

  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent>
        <div className="aspect-video relative flex items-center justify-center">
          <Image
            src="/hero.svg"
            alt="Pro Modal"
            className="object-cover"
            fill
          />
        </div>
        <div className="text-neutral-700 mx-auto space-y-6 p-6">
          <h2 className="font-semibold text-xl">
            立即升级到 Taskify Pro！
          </h2>
          <p className="text-xs font-semibold text-neutral-600">
            探索 Taskify 的最佳功能
          </p>
          <div className="pl-3">
            <ul className="text-sm list-disc">
              <li>无限制的面板</li>
              <li>高级检查表</li>
              <li>管理员和安全功能</li>
              <li>以及更多！</li>
            </ul>
          </div>
          <Button
            className="w-full"
            variant={"primary"}
            disabled={isLoading}
            onClick={onClick}
          >
            升级为 Pro
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
