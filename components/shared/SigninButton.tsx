"use client";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/button";

export default function SigninButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Button
        variant="outline"
        className="h-7 text-sm hover:bg-primary hover:text-white hover:cursor-pointer w-25 "
      >
        Sign in
      </Button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute px-1 left-0 bg-primary text-white rounded-lg  w-25 flex flex-col  shadow-lg">
          <Link
            href={"/auth/signin/job_seeker"}
            className="flex justify-center"
          >
            {" "}
            <button className="hover:cursor-pointer py-2 hover:opacity-80 transition">
              Job seeker
            </button>
          </Link>
          <hr className="border-white" />
          <Link href={"/auth/signin/recruiter"} className="flex justify-center">
            {" "}
            <button className="hover:cursor-pointer py-2 hover:opacity-80 transition">
              Recruiter
            </button>
          </Link>

          <hr className="border-white" />
          <Link href={"/auth/signup"} className="flex justify-center">
            {" "}
            <button className="hover:cursor-pointer py-2 hover:opacity-80 transition">
              Register
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
