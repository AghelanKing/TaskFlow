"use client";

import { createProject, State } from "@/app/dashboard/action";
import Button from "../Button";
import { useActionState } from "react";
import { MdErrorOutline } from "react-icons/md";

function CreateForm({ ownerId }: { ownerId?: string }) {
  const createProjectWithId = createProject.bind(null, ownerId as string);
  const initialState: State = { message: null, errors: {} };

  const [state, formAction, isPending] = useActionState(
    createProjectWithId,
    initialState,
  );

  return (
    <form action={formAction} className="w-full min-w-0">
      {state.message && (
        <div className="bg-red-100 p-3 min-[400px]:p-4 rounded-2xl my-3 flex flex-wrap gap-3 text-red-700 items-center">
          <MdErrorOutline className="text-xl shrink-0" />
          <p className="min-w-0 flex-1  wrap-break-words">{state.message}</p>
        </div>
      )}

      <div className="flex flex-col mt-5 mb-7">
        <label className="text-lg text-stone-500 font-semibold" htmlFor="name">
          Project Name:
        </label>

        <input
          className="w-full min-w-0 box-border bg-white border border-teal-600 mt-2 p-2 rounded-xl text-teal-800 focus:outline-teal-400"
          type="text"
          id="name"
          name="name"
          aria-describedby=""
        />

        {state?.errors?.name &&
          state.errors.name.map((error) => (
            <p
              key={error}
              className="mt-2 text-red-700 text-sm  wrap-break-words"
            >
              {error}
            </p>
          ))}
      </div>

      <div className="flex flex-col mt-5 mb-7">
        <label
          className="text-lg text-stone-500 font-semibold"
          htmlFor="description"
        >
          Project Description:
        </label>

        <textarea
          className="w-full min-w-0 box-border bg-white border border-teal-600 mt-2 p-2 rounded-xl text-teal-800 focus:outline-teal-400"
          id="description"
          name="description"
          aria-describedby=""
        />

        {state?.errors?.description &&
          state.errors.description.map((error) => (
            <p
              key={error}
              className="mt-2 text-red-700 text-sm wrap-break-words"
            >
              {error}
            </p>
          ))}
      </div>

      <Button button={true} disabeld={isPending}>
        {isPending ? "Creating Project" : "Create Project"}
      </Button>
    </form>
  );
}

export default CreateForm;
