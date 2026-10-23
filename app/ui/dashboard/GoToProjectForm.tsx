"use client";

import { goToProject, StateGo } from "@/app/dashboard/action";
import Button from "../Button";
import { useActionState } from "react";
import { MdErrorOutline } from "react-icons/md";

function GoToProjectForm({ userId }: { userId?: string }) {
  const goToProjectWithId = goToProject.bind(null, userId as string);
  const initialState: StateGo = { message: null, errors: {} };
  const [state, formAction, isPending] = useActionState(
    goToProjectWithId,
    initialState,
  );
  return (
    <form action={formAction}>
      {state.message && (
        <div className="bg-red-100 p-4 rounded-2xl my-3 flex gap-x-3 text-red-700 items-center">
          <MdErrorOutline className="text-xl" />
          <p>{state.message}</p>
        </div>
      )}

      <div className="flex flex-col mt-5 mb-7">
        <label className="text-lg text-stone-500 font-semibold" htmlFor="name">
          Project Name:
        </label>
        <input
          className="bg-white border border-teal-600 mt-2 p-2 rounded-xl text-teal-800 focus:outline-teal-400"
          type="text"
          id="name"
          name="name"
          aria-describedby=""
        />
        {state?.errors?.name &&
          state?.errors.name.map((error) => (
            <p key={error} className="mt-2 text-red-700 text-sm">
              {error}
            </p>
          ))}
      </div>
      <Button button={true} disabeld={isPending}>
        {isPending ? "Going to Project..." : "Go to Project"}
      </Button>
    </form>
  );
}

export default GoToProjectForm;
