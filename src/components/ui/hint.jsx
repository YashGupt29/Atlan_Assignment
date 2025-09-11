// Hint.jsx
import React from "react";
import { TooltipProvider,Tooltip,TooltipTrigger,TooltipContent } from "./tooltip";


export const Hint = ({
  children,
  description,
  side = "bottom",
  sideOffset = 0,
}) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent
          sideOffset={sideOffset}
          side={side}
          className="text-xs max-w-[220px] break-words"
        >
          {description}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
