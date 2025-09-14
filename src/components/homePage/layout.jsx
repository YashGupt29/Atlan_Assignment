import React from "react";
import { Navbar } from "./_components/navbar";
import { Footer } from "./_components/footer";
import { Outlet } from "react-router";

const HomeLayout = () => {
  return (
    <div className="h-full bg-slate-100">
      <Navbar />
      <main className="pt-40 pb-20 bg-slate-100"><Outlet/></main>
      <Footer />
    </div>
  );
};

export default HomeLayout;
