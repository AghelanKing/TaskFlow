"use client";

import { User } from "@/app/lib/definitions";
import Button from "../../Button";
import { PiUserCircleCheckFill } from "react-icons/pi";
import { SiGoogletasks } from "react-icons/si";
import { MdOutlineDescription } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { LuCalendar } from "react-icons/lu";
import { useActionState } from "react";
import { MdErrorOutline } from "react-icons/md";
import {
  editTask,
  StateTask,
} from "@/app/dashboard/[projectId]/tasks/[taskId]/action";

export type TaskWithId = {
  id: string;
  title: string;
  description: string;
  due_date: Date | null;
  priority: "low" | "medium" | "high";
  status: "todo" | "in_progress" | "done";
  userid: string;
  username: string;
  projectname: string;
};

function EditTask({
  users,
  projectId,
  isOwner,
  isUser,
  task,
}: {
  users: User[];
  projectId: string;
  isOwner: boolean;
  isUser: boolean;
  task: TaskWithId[];
}) {
  const { title, description, due_date, priority, status, userid }: TaskWithId =
    task[0];
  const taskId = task[0]?.id;
  const [dueDate, setDueDate] = useState<Date | null>(due_date ?? null);

  const EditTaskWithParams = editTask.bind(
    null,
    projectId,
    taskId,
    isOwner,
    isUser,
  );
  const initialState: StateTask = { message: null, errors: {} };
  const [state, formAction, isPending] = useActionState(
    EditTaskWithParams,
    initialState,
  );

  return (
    <form className="bg-stone-50 p-3 rounded-2xl mt-6" action={formAction}>
      {state.message && (
        <div className="bg-red-100 p-4 rounded-2xl my-3 flex gap-x-3 text-red-700 items-center">
          <MdErrorOutline className="text-xl" />
          <p>{state.message}</p>
        </div>
      )}

      <div className="flex flex-col mt-5 mb-7 relative">
        <label className="text-lg text-stone-500 font-semibold" htmlFor="users">
          Choose a user:
        </label>
        <PiUserCircleCheckFill className="absolute top-[60%] left-1.5 text-xl text-teal-500" />
        <select
          id="users"
          name="userId"
          defaultValue={userid}
          aria-describedby="customer-error"
          className="bg-white border border-teal-600 mt-2 py-2 px-6.5 rounded-xl text-teal-800 focus:outline-teal-400"
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
        {state?.errors?.userId &&
          state?.errors.userId.map((error) => (
            <p key={error} className="mt-2 text-red-700 text-sm">
              {error}
            </p>
          ))}
      </div>

      <div className="flex flex-col mt-5 mb-7 relative">
        <label className="text-lg text-stone-500 font-semibold" htmlFor="title">
          Task Title:
        </label>
        <SiGoogletasks
          className={`absolute top-[60%] left-1.5 text-xl text-teal-500 ${state?.errors?.title ? "top-[45%]!" : ""}`}
        />
        <input
          className="bg-white border border-teal-600 mt-2 py-2 px-8 rounded-xl text-teal-800 focus:outline-teal-400"
          type="text"
          id="title"
          name="title"
          defaultValue={title}
        />
        {state?.errors?.title &&
          state?.errors.title.map((error) => (
            <p key={error} className="mt-2 text-red-700 text-sm">
              {error}
            </p>
          ))}
      </div>

      <div className="flex flex-col mt-5 mb-7 relative">
        <label
          className="text-lg text-stone-500 font-semibold"
          htmlFor="description"
        >
          Task Description:
        </label>
        <MdOutlineDescription className="absolute top-[46%] left-1.5 text-xl text-teal-500" />
        <textarea
          className="bg-white border border-teal-600 mt-2 py-2 px-8 rounded-xl text-teal-800 focus:outline-teal-400"
          id="description"
          name="description"
          aria-describedby=""
          defaultValue={description}
        ></textarea>
      </div>
      <div className="flex flex-col mt-5 mb-7 relative">
        <label
          className="text-lg text-stone-500 font-semibold"
          htmlFor="due_date"
        >
          Choose a Due date:
        </label>
        <LuCalendar className="absolute top-[60%] z-10 left-1.5 text-xl text-teal-500" />
        <DatePicker
          selected={dueDate}
          onChange={(date: Date | null) => setDueDate(date)}
          minDate={new Date()}
          dateFormat="yyyy-MM-dd"
          isClearable
          className="bg-white border border-teal-600 mt-2 py-2 px-8 rounded-xl text-teal-800 focus:outline-teal-400 w-full"
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

      <div className="bg-white p-2 rounded-2xl flex gap-x-4 items-center">
        <h4 className="text-lg text-stone-500 font-semibold">Set priority:</h4>
        <div className="flex items-center gap-x-2 p-1 border border-stone-600 rounded-2xl">
          <input
            id="low"
            name="priority"
            type="radio"
            value="low"
            aria-describedby="priority-error"
            defaultChecked={priority === "low"}
            className="h-4 w-4 cursor-pointer accent-teal-700"
          />
          <label
            className="text-lg text-blue-50 bg-blue-500 py-0.5 px-3 rounded-full font-semibold"
            htmlFor="low"
          >
            low
          </label>
        </div>

        <div className="flex items-center gap-x-2 p-1 border border-stone-600 rounded-2xl">
          <input
            id="medium"
            name="priority"
            type="radio"
            value="medium"
            aria-describedby="priority-error"
            defaultChecked={priority === "medium"}
            className="h-4 w-4 cursor-pointer accent-teal-700"
          />
          <label
            className="text-lg text-green-50 bg-green-600 py-0.5 px-3 rounded-full font-semibold"
            htmlFor="medium"
          >
            medium
          </label>
        </div>

        <div className="flex items-center gap-x-2 p-1 border border-stone-600 rounded-2xl">
          <input
            id="high"
            name="priority"
            type="radio"
            value="high"
            aria-describedby="priority-error"
            defaultChecked={priority === "high"}
            className="h-4 w-4 cursor-pointer accent-teal-700"
          />
          <label
            className="text-lg text-red-50 bg-red-700 py-0.5 px-3 rounded-full font-semibold"
            htmlFor="high"
          >
            high
          </label>
        </div>
      </div>
      <div id="priority-error" aria-live="polite">
        {state?.errors?.priority &&
          state?.errors.priority.map((error) => (
            <p key={error} className="mt-2 text-red-700 text-sm">
              {error}
            </p>
          ))}
      </div>

      <div className="bg-white p-2 rounded-2xl flex gap-x-4 items-center">
        <h4 className="text-lg text-stone-500 font-semibold">Set status:</h4>
        <div className="flex items-center gap-x-2 p-1 border border-stone-600 rounded-2xl">
          <input
            id="todo"
            name="status"
            type="radio"
            value="todo"
            aria-describedby="priority-error"
            defaultChecked={status === "todo"}
            className="h-4 w-4 cursor-pointer accent-teal-700"
          />
          <label
            className="text-lg text-red-700 bg-red-100 py-0.5 px-3 rounded-full font-semibold"
            htmlFor="todo"
          >
            todo
          </label>
        </div>

        <div className="flex items-center gap-x-2 p-1 border border-stone-600 rounded-2xl">
          <input
            id="in_progress"
            name="status"
            type="radio"
            value="in_progress"
            aria-describedby="priority-error"
            defaultChecked={status === "in_progress"}
            className="h-4 w-4 cursor-pointer accent-teal-700"
          />
          <label
            className="text-lg text-orange-700 bg-orange-200 py-0.5 px-3 rounded-full font-semibold"
            htmlFor="in_progress"
          >
            in progress
          </label>
        </div>

        <div className="flex items-center gap-x-2 p-1 border border-stone-600 rounded-2xl">
          <input
            id="done"
            name="status"
            type="radio"
            value="done"
            aria-describedby="priority-error"
            defaultChecked={status === "done"}
            className="h-4 w-4 cursor-pointer accent-teal-700"
          />
          <label
            className="text-lg text-green-700 bg-green-200 py-0.5 px-3 rounded-full font-semibold"
            htmlFor="done"
          >
            done
          </label>
        </div>
      </div>
      <div id="priority-error" aria-live="polite">
        {state?.errors?.status &&
          state?.errors.status.map((error) => (
            <p key={error} className="mt-2 text-red-700 text-sm">
              {error}
            </p>
          ))}
      </div>

      <Button AddClass="mt-5" button={true} disabeld={isPending}>
        {isPending ? "Editing Task..." : "Edit Task"}
      </Button>
    </form>
  );
}

export default EditTask;
