"use client";

import { createProject, State } from "@/app/dashboard/action";
import Button from "../Button";
import { useActionState } from "react";
import { MdErrorOutline } from "react-icons/md";

function CreateForm({ ownerId }: { ownerId: string }) {
  const createProjectWithId = createProject.bind(null, ownerId);
  const initialState: State = { message: null, errors: {} };
  const [state, formAction, isPending] = useActionState(
    createProjectWithId,
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

      <div className="flex flex-col mt-5 mb-7">
        <label
          className="text-lg text-stone-500 font-semibold"
          htmlFor="description"
        >
          Project Description:
        </label>
        <textarea
          className="bg-white border border-teal-600 mt-2 p-2 rounded-xl text-teal-800 focus:outline-teal-400"
          id="description"
          name="description"
          aria-describedby=""
        ></textarea>
        {state?.errors?.description &&
          state?.errors.description.map((error) => (
            <p key={error} className="mt-2 text-red-700 text-sm">
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
