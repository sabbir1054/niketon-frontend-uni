"use client";
import React from "react";
import StoreProvider from "../StoreProvide";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <StoreProvider>{children}</StoreProvider>{" "}
    </>
  );
}
