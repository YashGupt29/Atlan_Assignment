// BoardList.jsx
import React from "react";
import {  Link } from "react-router-dom";
import { HelpCircle, User2 } from "lucide-react";
import { FormPopover } from "@/components/form/form-popover";
import { Skeleton } from "@/components/ui/skeleton";
import { Hint } from "@/components/ui/hint";
import { useSelector } from 'react-redux';
import { format } from 'date-fns';


export default function BoardList() {
  const boards = useSelector((state) => state.board.boards);
  return (
    <div className="space-y-4">
      <div className="flex items-center font-semibold text-lg text-neutral-700">
        <User2 className="h-6 w-6 mr-2" />
        Your Weekend Plans
      </div>
      <div className="flex flex-wrap gap-4">
        {boards.map((board) => (
          <Link
            key={board.id}
            to={`/plan/${board.id}`}
            className="group relative aspect-video bg-no-repeat bg-center
            bg-cover bg-sky-700 rounded-sm h-[150px] w-[250px] p-2 overflow-hidden"
            style={{ backgroundImage: `url(${board.imageThumbUrl})` }}
          >
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition" />
            <p className="relative font-semibold text-white">{board.title}</p>
            <p className="relative text-white text-sm  font-semibold top-9 left-5">
              {format(new Date(board.startDate), "MMM dd, yyyy")} - {format(new Date(board.endDate), "MMM dd, yyyy")}
            </p>
            <p className="relative text-white text-sm font-semibold top-9 left-10">
              {format(new Date(board.startDate), "EEEE")} - {format(new Date(board.endDate), "EEEE")}
            </p>
          </Link>
        ))}
        <FormPopover sideOffset={10} side="right">
          <div
            role="button"
            className="aspect-video relative h-[150px] w-[250px] bg-muted rounded-sm flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition"
          >
            <p className="text-sm">Plan a Weekend</p>
            <span className="text-xs">
                Make New Plans
            </span>
            <Hint
              sideOffset={40}
              description={`Click on Plan a weekend card & choose your desired picture and Plan an Escape`}
            >
              <HelpCircle className="absolute bottom-2 right-2 h-[14px] w-[14px]" />
            </Hint>
          </div>
        </FormPopover>
      </div>
    </div>
  );
}

BoardList.Skeleton = function SkeletonBoardList() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, idx) => (
        <Skeleton key={idx} className="aspect-video h-full w-full p-2" />
      ))}
    </div>
  );
};
