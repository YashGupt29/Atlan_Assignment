import React from "react";
import Navbar from "./_components/navbar";
import { Outlet } from "react-router";
import { Sidebar } from "./_components/sidebar";

const DashboardLayout = () => {
  return (
    <div className="h-full">
      <Navbar />
      <Outlet/>
    </div>
  );
};

export default DashboardLayout;
