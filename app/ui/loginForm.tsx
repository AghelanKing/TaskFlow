"use client";

import { useActionState } from "react";
import Button from "./Button";
import { autenticate } from "../login/action";
import { MdErrorOutline } from "react-icons/md";

function LoginForm() {
  const [errorMessage, formAction, pending] = useActionState(
    autenticate,
    undefined,
  );

  return (
    <form
      className="mt-3 bg-stone-100 px-4 py-6 w-full min-w-0 rounded-xl"
      action={formAction}
    >
      {errorMessage && (
        <div className="bg-red-100 p-3 min-[400px]:p-4 rounded-2xl my-3 flex flex-wrap gap-3 text-red-700 items-center">
          <MdErrorOutline className="text-xl shrink-0" />
          <p className="min-w-0 flex-1 wrap-break-words">{errorMessage}</p>
        </div>
      )}

      <div className="flex flex-col mt-5">
        <label className="text-lg text-stone-500 font-semibold" htmlFor="email">
          Email:
        </label>

        <input
          className="w-full min-w-0 box-border bg-white mt-2 p-2 rounded-xl text-teal-800"
          type="email"
          id="email"
          name="email"
        />
      </div>

      <div className="flex flex-col mt-5 mb-7">
        <label
          className="text-lg text-stone-500 font-semibold"
          htmlFor="password"
        >
          Password:
        </label>

        <input
          className="w-full min-w-0 box-border bg-white mt-2 p-2 rounded-xl text-teal-800"
          type="password"
          id="password"
          name="password"
          aria-describedby=""
        />
      </div>

      <Button button={true} disabeld={pending} href="/" AddClass="">
        {pending ? "Loginning In" : "Log In"}
      </Button>
    </form>
  );
}

export default LoginForm;
