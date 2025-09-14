import React from "react";
import { Button } from "../../ui/button";
import { Logo } from "@/components/ui/logo";

export const Footer = () => {
  return (
    <div className="fixed bottom-0 w-full p-4 border-t border bg-slate-100">
      <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
        <Logo />
        <div className="space-x-4 flex items-center">
          <Button size="sm" variant="ghost">
            Privacy Policy
          </Button>
          <Button size="sm" variant="ghost">
            Terns of Service
          </Button>
        </div>
      </div>
    </div>
  );
};
