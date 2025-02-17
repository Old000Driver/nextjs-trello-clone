import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface HintProps {
  children: React.ReactNode;
  description: string;
  side?: "top" | "bottom" | "left" | "right";
  sideOffset?: number;
}

const Hint = ({
  children,
  description,
  side = "bottom",
  sideOffset = 0,
}: HintProps) => (
  <TooltipProvider>
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent
        side={side}
        sideOffset={sideOffset}
        className="text-xs max-w-[220px] break-words"
      >
        {description}
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

export default Hint;
