/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { selectCurrentUser } from "@/redux/slice/authSlice";
import { useSelector } from "react-redux";

const page = () => {
  const user = useSelector(selectCurrentUser);
  console.log("sss", user);

  return <div className="min-h-screen"></div>;
};

export default page;
