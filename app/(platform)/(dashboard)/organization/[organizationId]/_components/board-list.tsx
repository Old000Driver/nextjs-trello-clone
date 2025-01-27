import { FormPopover } from "@/components/form/form-popover";
import Hint from "@/components/hint";
import { auth } from "@clerk/nextjs";
import { HelpCircle, User2 } from "lucide-react";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { getAvailableCount } from "@/lib/org-limit";
import { MAX_FREE_BOARDS } from "@/constants/boards";
import { checkSubscription } from "@/lib/subscription";

const BoardList = async () => {
  const { orgId } = auth();

  if (!orgId) {
    return redirect("/select-org");
  }

  const boards = await db.board.findMany({
    where: {
      orgId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const availableCount = await getAvailableCount();
  const isPro = await checkSubscription();

  return (
    <div className="space-y-4">
      <div className="flex items-center font-semibold text-lg text-neutral-700">
        <User2 className="h6 w-6 mr-2" />
        您的面板
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {boards.map((board) => (
          <Link
            href={`/board/${board.id}`}
            key={board.id}
            // aspect-video 宽高比设置为16:9
            className="group relative aspect-video bg-no-repeat bg-center bg-cover bg-sky-700 rounded-sm h-full w-full p-2 overflow-hidden"
            style={{ backgroundImage: `url(${board.imageThumbURL})` }}
          >
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition"></div>
            <p className="relative font-semibold text-white">{board.title}</p>
          </Link>
        ))}
        <FormPopover sideOffset={10} side="right">
          <div
            role="button"
            className="aspect-video relative h-full w-full bg-muted rounded-sm flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition"
          >
            <p className="text-sm">创建新面板</p>
            <span className="text-sm">
              {isPro ? "无限制" : `剩余 ${MAX_FREE_BOARDS - availableCount} 个`}
            </span>
            <Hint
              sideOffset={40}
              description={`免费用户最多可以有 5 个面板。要获得无限制的面板，请升级 Pro`}
            >
              <HelpCircle className="absolute bottom-2 right-2 h-[14px] w-[14px]" />
            </Hint>
          </div>
        </FormPopover>
      </div>
    </div>
  );
};

BoardList.Skeleton = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
    </div>
  );
};

BoardList.displayName = "BoardList";

export default BoardList;
