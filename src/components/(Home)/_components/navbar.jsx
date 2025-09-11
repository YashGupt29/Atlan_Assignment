import React from "react";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export const Navbar = () => {
  return (
    <div className="fixed top-0 w-full h-14 px-4 border-b shadow-sm bg-white flex items-center">
      <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
        <Logo />
        <div className="space-x-4 flex items-center">
          <Button size="sm" variant="outline" asChild>
            <Link to="/sign-in">Login</Link>
          </Button>
          <Button size="sm"  className="bg-black text-white" asChild>
            <Link to="/dashboard">Get Weekendly for free</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
