"use client";

import { signOut } from "next-auth/react";
import { AiOutlinePoweroff } from "react-icons/ai";

function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="flex items-center gap-x-1 bg-teal-50 rounded-xl p-3 font-semibold text-teal-700 hover:bg-teal-600 hover:text-teal-50"
    >
      <AiOutlinePoweroff className="text-lg" />
      Sign Out
    </button>
  );
}

export default SignOutButton;
