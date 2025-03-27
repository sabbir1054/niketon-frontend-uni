"use client";
import Footer from "@/components/shared/Footer";
import NavBar from "@/components/shared/NavBar";
import { useAuth } from "@/hooks/useAuth";
import React from "react";
import StoreProvider from "../StoreProvide";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isAuthenticated = useAuth();

  if (!isAuthenticated) return null; // Prevent rendering before checking auth

  return (
    <>
      <StoreProvider>
        {" "}
        <NavBar />
        {children}
        <Footer />
      </StoreProvider>
    </>
  );
}
