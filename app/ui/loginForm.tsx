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

  console.log(errorMessage);
  return (
    <form
      className="mt-3 bg-stone-100 px-4 py-6 w-full rounded-xl"
      action={formAction}
    >
      {errorMessage && (
        <div className="bg-red-100 p-4 rounded-2xl my-3 flex gap-x-3 text-red-700 items-center">
          <MdErrorOutline className="text-xl" />
          <p>{errorMessage}</p>
        </div>
      )}

      <div className="flex flex-col mt-5">
        <label className="text-lg text-stone-500 font-semibold" htmlFor="email">
          Email:
        </label>
        <input
          className="bg-white mt-2 p-2 rounded-xl text-teal-800"
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
          className="bg-white mt-2 p-2 rounded-xl text-teal-800"
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
