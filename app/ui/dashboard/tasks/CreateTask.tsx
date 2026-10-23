"use client";

import { User } from "@/app/lib/definitions";
import Button from "../../Button";
import { PiUserCircleCheckFill } from "react-icons/pi";
import { SiGoogletasks } from "react-icons/si";
import { MdOutlineDescription, MdErrorOutline } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useActionState } from "react";
import { LuCalendar } from "react-icons/lu";
import {
  createTask,
  StateTask,
} from "@/app/dashboard/[projectId]/tasks/action";

function CreateTask({
  users,
  projectId,
  isOwner,
}: {
  users: User[];
  projectId: string;
  isOwner: boolean;
}) {
  const [dueDate, setDueDate] = useState<Date | null>(null);

  const createTaskWithProjectId = createTask.bind(null, projectId, isOwner);
  const initialState: StateTask = { message: null, errors: {} };

  const [state, formAction, isPending] = useActionState(
    createTaskWithProjectId,
    initialState,
  );

  return (
    <form
      className="mt-5 sm:mt-6 w-full min-w-0 rounded-2xl bg-stone-50 p-3 min-[400px]:p-4 sm:p-5"
      action={formAction}
    >
      {state.message && (
        <div className="my-3 flex min-w-0 items-start gap-3 rounded-2xl bg-red-100 p-3 sm:p-4 text-red-700">
          <MdErrorOutline className="mt-0.5 shrink-0 text-xl" />
          <p className="min-w-0 wrap-break-word">{state.message}</p>
        </div>
      )}

      {/* Choose user */}
      <div className="relative mt-5 mb-7 flex min-w-0 flex-col">
        <label
          className="text-base sm:text-lg text-stone-500 font-semibold"
          htmlFor="users"
        >
          Choose a user:
        </label>

        <PiUserCircleCheckFill className="pointer-events-none absolute left-1.5 top-[60%] z-10 text-xl text-teal-500" />

        <select
          id="users"
          name="userId"
          aria-describedby="customer-error"
          defaultValue=""
          className="box-border mt-2 w-full min-w-0 rounded-xl border border-teal-600 bg-white py-2 pl-8 pr-3 text-teal-800 focus:outline-teal-400"
        >
          <option value="" disabled>
            Select a customer
          </option>

          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        {state?.errors?.userId?.map((error) => (
          <p key={error} className="mt-2 wrap-break-word text-sm text-red-700">
            {error}
          </p>
        ))}
      </div>

      {/* Task title */}
      <div className="relative mt-5 mb-7 flex min-w-0 flex-col">
        <label
          className="text-base sm:text-lg text-stone-500 font-semibold"
          htmlFor="title"
        >
          Task Title:
        </label>

        <SiGoogletasks
          className={`pointer-events-none absolute left-1.5 z-10 text-xl text-teal-500 ${
            state?.errors?.title ? "top-[47%]" : "top-[60%]"
          }`}
        />

        <input
          className="box-border mt-2 w-full min-w-0 rounded-xl border border-teal-600 bg-white py-2 pl-8 pr-3 text-teal-800 focus:outline-teal-400"
          type="text"
          id="title"
          name="title"
        />

        {state?.errors?.title?.map((error) => (
          <p key={error} className="mt-2 wrap-break-word text-sm text-red-700">
            {error}
          </p>
        ))}
      </div>

      {/* Task description */}
      <div className="relative mt-5 mb-7 flex min-w-0 flex-col">
        <label
          className="text-base sm:text-lg text-stone-500 font-semibold"
          htmlFor="description"
        >
          Task Description:
        </label>

        <MdOutlineDescription className="pointer-events-none absolute left-1.5 top-[46%] z-10 text-xl text-teal-500" />

        <textarea
          className="box-border mt-2 min-h-28 w-full min-w-0 resize-y rounded-xl border border-teal-600 bg-white py-2 pl-8 pr-3 text-teal-800 focus:outline-teal-400"
          id="description"
          name="description"
        />
      </div>

      {/* Due date */}
      <div className="relative mt-5 mb-7 flex min-w-0 flex-col">
        <label
          className="text-base sm:text-lg text-stone-500 font-semibold"
          htmlFor="due_date_picker"
        >
          Choose a Due date:
        </label>

        <LuCalendar className="pointer-events-none absolute left-1.5 top-[60%] z-10 text-xl text-teal-500" />

        <DatePicker
          id="due_date_picker"
          selected={dueDate}
          onChange={(date: Date | null) => setDueDate(date)}
          minDate={new Date()}
          dateFormat="yyyy-MM-dd"
          isClearable
          wrapperClassName="mt-2 w-full min-w-0"
          className="box-border w-full min-w-0 rounded-xl border border-teal-600 bg-white py-2 pl-8 pr-3 text-teal-800 focus:outline-teal-400"
        />

        <input
          type="hidden"
          name="due_date"
          value={
            dueDate && !isNaN(dueDate.getTime())
              ? dueDate.toISOString().split("T")[0]
              : ""
          }
        />
      </div>

      {/* Priority */}
      <fieldset className="flex min-w-0 flex-col gap-3 rounded-2xl bg-white p-3 sm:p-4">
        <legend className="text-base sm:text-lg text-stone-500 font-semibold">
          Set priority:
        </legend>

        <div className="flex min-w-0 flex-wrap items-center gap-2 sm:gap-3">
          <div className="flex min-w-0 items-center gap-2 rounded-2xl border border-stone-600 p-1">
            <input
              id="low"
              name="priority"
              type="radio"
              value="low"
              aria-describedby="priority-error"
              className="h-4 w-4 shrink-0 cursor-pointer accent-teal-700"
            />
            <label
              className="rounded-full bg-blue-500 px-3 py-0.5 text-base sm:text-lg font-semibold text-blue-50"
              htmlFor="low"
            >
              low
            </label>
          </div>

          <div className="flex min-w-0 items-center gap-2 rounded-2xl border border-stone-600 p-1">
            <input
              id="medium"
              name="priority"
              type="radio"
              value="medium"
              aria-describedby="priority-error"
              className="h-4 w-4 shrink-0 cursor-pointer accent-teal-700"
            />
            <label
              className="rounded-full bg-green-600 px-3 py-0.5 text-base sm:text-lg font-semibold text-green-50"
              htmlFor="medium"
            >
              medium
            </label>
          </div>

          <div className="flex min-w-0 items-center gap-2 rounded-2xl border border-stone-600 p-1">
            <input
              id="high"
              name="priority"
              type="radio"
              value="high"
              aria-describedby="priority-error"
              className="h-4 w-4 shrink-0 cursor-pointer accent-teal-700"
            />
            <label
              className="rounded-full bg-red-700 px-3 py-0.5 text-base sm:text-lg font-semibold text-red-50"
              htmlFor="high"
            >
              high
            </label>
          </div>
        </div>
      </fieldset>

      <div id="priority-error" aria-live="polite">
        {state?.errors?.priority?.map((error) => (
          <p key={error} className="mt-2 wrap-break-word text-sm text-red-700">
            {error}
          </p>
        ))}
      </div>

      <div className="mt-5 w-full sm:w-auto">
        <Button AddClass="w-full sm:w-auto" button={true} disabeld={isPending}>
          {isPending ? "Creating Task..." : "Create Task"}
        </Button>
      </div>
    </form>
  );
}

export default CreateTask;
