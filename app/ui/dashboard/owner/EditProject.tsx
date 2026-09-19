"use client";

import {
  Stateupdate,
  updateProject,
} from "@/app/dashboard/[projectId]/owner/action";
import { useActionState } from "react";
import { MdErrorOutline } from "react-icons/md";
import Button from "../../Button";

export type Project = {
  id: string;
  name: string;
  description: string;
  owner_id: string;
};

function EditProject({
  projectId,
  isOwner,
  projectObj,
}: {
  projectId: string;
  isOwner: boolean;
  projectObj: Project;
}) {
  const UpdateProjectWithId = updateProject.bind(null, projectId, isOwner);
  const initialState: Stateupdate = { message: null, errors: {} };
  const [state, formAction, isPending] = useActionState(
    UpdateProjectWithId,
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
          defaultValue={projectObj.name}
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
          defaultValue={projectObj.description}
        ></textarea>
        {state?.errors?.description &&
          state?.errors.description.map((error) => (
            <p key={error} className="mt-2 text-red-700 text-sm">
              {error}
            </p>
          ))}
      </div>
      <Button button={true}>
        {isPending ? "Editing Project..." : "Edit Project"}
      </Button>
    </form>
  );
}

export default EditProject;
