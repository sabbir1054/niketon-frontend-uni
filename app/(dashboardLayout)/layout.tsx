"use client";

import Sidebar from "@/components/modules/SideBar";
import Footer from "@/components/shared/Footer";
import NavBar from "@/components/shared/NavBar";
import React from "react";
import StoreProvider from "../StoreProvide";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const auth = useAuth();
  // if (!auth) {
  //   return null;
  // }
  return (
    <StoreProvider>
      <NavBar />
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex flex-col flex-1 overflow-y-auto">
          <main className="flex-1 p-4">{children}</main>
        </div>
      </div>
      <Footer />
    </StoreProvider>
  );
}
