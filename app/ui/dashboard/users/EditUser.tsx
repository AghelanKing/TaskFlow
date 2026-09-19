"use client";
import { MdErrorOutline } from "react-icons/md";
import Button from "../../Button";
import { User } from "@/app/lib/definitions";
import {
  Stateupdate,
  updateUser,
} from "@/app/dashboard/[projectId]/users/action";
import { useActionState } from "react";

function EditUser({
  projectId,
  user,
}: {
  projectId: string;
  user: User[] | undefined;
}) {
  const userId = user?.at(0)?.id ?? "";
  const UpdateUserWithId = updateUser.bind(null, projectId, userId);
  const initialState: Stateupdate = { message: null, errors: {} };
  const [state, formAction, isPending] = useActionState(
    UpdateUserWithId,
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
          User Name:
        </label>
        <input
          className="bg-white border border-teal-600 mt-2 p-2 rounded-xl text-teal-800 focus:outline-teal-400"
          type="text"
          id="name"
          name="name"
          defaultValue={user?.at(0)?.name}
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
        <label className="text-lg text-stone-500 font-semibold" htmlFor="email">
          User Email:
        </label>
        <input
          className="bg-white border disabled:text-stone-500 disabled:border-stone-500 border-teal-600 mt-2 p-2 rounded-xl text-teal-800 focus:outline-teal-400"
          type="text"
          id="email"
          name="email"
          defaultValue={user?.at(0)?.email}
          disabled
        />
      </div>

      <div className="flex flex-col mt-5 mb-7">
        <label
          className="text-lg text-stone-500 font-semibold"
          htmlFor="password"
        >
          User New Password:
        </label>
        <input
          className="bg-white border border-teal-600 mt-2 p-2 rounded-xl text-teal-800 focus:outline-teal-400"
          type="password"
          id="password"
          name="password"
          aria-describedby=""
        />
      </div>
      <Button button={true} disabeld={isPending}>
        {isPending ? "Editing User..." : "Edit User"}
      </Button>
    </form>
  );
}

export default EditUser;
