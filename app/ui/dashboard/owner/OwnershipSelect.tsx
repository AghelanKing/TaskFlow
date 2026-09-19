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
  userIdPrevious: string;
}) {
  const TranferOwnerShipWithId = ownerShip.bind(
    null,
    projectId,
    isOwner,
    userIdPrevious,
  );
  const initialState: StateOwner = { message: null, errors: {} };
  const [state, formAction, isPending] = useActionState(
    TranferOwnerShipWithId,
    initialState,
  );
  return (
    <div className=" mt-5 relative bg-stone-100 p-2 rounded-2xl">
      <form className="flex flex-col w-full" action={formAction}>
        {state.message && (
          <div className="bg-red-100 p-4 rounded-2xl my-3 flex gap-x-3 text-red-700 items-center">
            <MdErrorOutline className="text-xl" />
            <p>{state.message}</p>
          </div>
        )}

        <label className="text-lg text-stone-500 font-semibold" htmlFor="users">
          Choose a user:
        </label>
        <PiUserCircleCheckFill className="absolute top-[31.5%] left-3.25 text-2xl text-teal-500" />
        <select
          id="users"
          name="userId"
          aria-describedby="customer-error"
          className="bg-white border border-teal-600 mt-2 py-2 px-6.5 rounded-xl text-teal-800 focus:outline-teal-400"
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
        <div className="mt-5">
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
