"use client";

import StoreProvider from "@/app/StoreProvide";
import Sidebar from "@/components/modules/SideBar";
import Footer from "@/components/shared/Footer";
import NavBar from "@/components/shared/NavBar";
import React from "react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
