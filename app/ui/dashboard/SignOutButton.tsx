"use client";

import { signOut } from "next-auth/react";
import { AiOutlinePoweroff } from "react-icons/ai";

function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="flex w-full items-center justify-center gap-x-1 rounded-xl mb-10 bg-teal-50 p-2 sm:p-3 text-sm sm:text-base font-semibold text-teal-700 transition-colors hover:bg-teal-600 hover:text-teal-50"
    >
      <AiOutlinePoweroff className="shrink-0 text-lg" />
      <span>Sign Out</span>
    </button>
  );
}

export default SignOutButton;
