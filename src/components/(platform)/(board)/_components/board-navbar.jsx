"use client";

import React from "react";
import BoardOptions from "./board-options";
import BoardTitleForm from "./board-title-form";

const BoardNavbar = ({ data }) => {
  return (
    <div className="absolute w-full h-14 z-[40] text-white bg-black/50 top-14 flex items-center px-6 gap-x-4">
      <BoardTitleForm data={data} />
      <div className="ml-auto">
        <BoardOptions id={data.id} />
      </div>
    </div>
  );
};

export default BoardNavbar;
