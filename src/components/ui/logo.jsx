import { cn } from "@/utils/cn";
import React from "react";
import logo from "@/assets/logo.svg"

export const Logo = () => {
  return (
    <a href="/">
      <div className="hover:opacity-75 transition items-center justify-center gap-x-2 flex">
        <img src={logo} alt="Logo" height={30} width={30} />
        <p
          className={cn("text-lg text-neutral-800 pb-1 font-bold")}
        >
          Weekendly
        </p>
      </div>
    </a>
  );
};
