// OrganizationIdPage.jsx
import React from "react";
import { Separator } from "@/components/ui/separator";
import { Info } from "./info";
import BoardList from "./board-list";

export default function OrganizationIdPage() {

  return (
    <div className="w-[70%] mt-[100px] ml-[-200px]">
      <Info/>
      <Separator className="my-4" />
      <div className="px-2 md:px-4">
        <BoardList />
      </div>
    </div>
  );
}
