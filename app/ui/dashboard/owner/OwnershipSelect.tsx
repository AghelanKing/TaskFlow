"use client";

import { User } from "@/app/lib/definitions";
import { PiUserCircleCheckFill } from "react-icons/pi";
import Button from "../../Button";
import {
  ownerShip,
  StateOwner,
} from "@/app/dashboard/[projectId]/owner/action";
import { useActionState } from "react";
import { MdErrorOutline } from "react-icons/md";

function OwnershipSelect({
  users,
  projectId,
  isOwner,
  userIdPrevious,
}: {
  users: User[];
  projectId: string;
  isOwner: boolean;
  userIdPrevious?: string;
}) {
  const TranferOwnerShipWithId = ownerShip.bind(
    null,
    projectId,
    isOwner,
    userIdPrevious as string,
  );

  const initialState: StateOwner = { message: null, errors: {} };

  const [state, formAction, isPending] = useActionState(
    TranferOwnerShipWithId,
    initialState,
  );

  return (
    <div className="mt-5 relative bg-stone-100 p-2 sm:p-3 rounded-2xl min-w-0">
      <form className="flex flex-col w-full min-w-0" action={formAction}>
        {state.message && (
          <div className="bg-red-100 p-3 sm:p-4 rounded-2xl my-3 flex gap-x-3 text-red-700 items-center min-w-0">
            <MdErrorOutline className="text-xl shrink-0" />
            <p className="min-w-0 wrap-break-word">{state.message}</p>
          </div>
        )}

        <label
          className="text-base sm:text-lg text-stone-500 font-semibold"
          htmlFor="users"
        >
          Choose a user:
        </label>

        <div className="relative w-full min-w-0">
          <PiUserCircleCheckFill className="absolute top-1/2 -translate-y-1/2 left-3 text-2xl text-teal-500 pointer-events-none" />

          <select
            id="users"
            name="userId"
            aria-describedby="customer-error"
            className="box-border w-full min-w-0 bg-white border border-teal-600 mt-2 py-2 pl-11 pr-3 rounded-xl text-teal-800 focus:outline-teal-400"
            defaultValue=""
          >
            <option value="" disabled>
              Select a user
            </option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-5 w-full sm:w-fit">
          <Button button={true} disabeld={isPending}>
            {isPending
              ? "Transfering of ownership..."
              : "Transfer of ownership"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default OwnershipSelect;
