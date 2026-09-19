"use client";

import { useActionState } from "react";
import Button from "./Button";
import { createUser, State } from "../login/action";
import { MdErrorOutline } from "react-icons/md";

function SignupForm() {
  const initialState: State = { errors: {}, message: null };
  const [state, formAction, pending] = useActionState(createUser, initialState);
  return (
    <form
      className="mt-3 bg-stone-100 px-4 py-6 w-full rounded-xl"
      action={formAction}
    >
      {state.message && (
        <div className="bg-red-100 p-4 rounded-2xl my-3 flex gap-x-3 text-red-700 items-center">
          <MdErrorOutline className="text-xl" />
          <p>{state.message}</p>
        </div>
      )}
      <div className="flex flex-col">
        <label className="text-lg text-stone-500 font-semibold" htmlFor="name">
          Full Name:
        </label>
        <input
          className="bg-white mt-2 p-2 rounded-xl text-teal-800"
          type="text"
          id="name"
          name="name"
        />
        {state?.errors?.name &&
          state?.errors.name.map((error) => (
            <p key={error} className="mt-2 text-red-700  text-sm">
              {error}
            </p>
          ))}
      </div>

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
        {state?.errors?.email &&
          state?.errors.email.map((error) => (
            <p key={error} className="mt-2 text-red-700  text-sm">
              {error}
            </p>
          ))}
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
        {state?.errors?.password &&
          state?.errors.password.map((error) => (
            <p key={error} className="mt-2 text-red-700  text-sm">
              {error}
            </p>
          ))}
      </div>
      <Button button={true} disabeld={pending} href="/" AddClass="">
        {pending ? "Signing Up..." : "Sign Up"}
      </Button>
    </form>
  );
}

export default SignupForm;
