"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Pagination from "./Pagination";
import TasksItem from "./TasksItem";

export type Tasks = {
  id: string;
  title: string;
  status: "todo" | "in_progress" | "done";
  priority: "low" | "medium" | "high";
  username: string;
  userid: string;
}[];

const ITEMS_PER_PAGE = 4;

function SownAllTasks({
  allTasks,
  isOwner,
  taskUser,
  projectId,
}: {
  allTasks: Tasks;
  isOwner: boolean;
  taskUser: Tasks;
  projectId: string;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const totalPages = Math.ceil(allTasks.length / ITEMS_PER_PAGE);
  const currentPage = Math.max(1, Number(searchParams.get("page")) || 1);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const tasks = allTasks.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="mt-2 w-full min-w-0 rounded-2xl bg-white p-2 min-[400px]:p-3 sm:p-4">
      {/* Desktop table header */}
      <div className="hidden lg:flex items-center justify-between rounded-2xl border border-teal-800 bg-[#f3f5f8] p-4 text-base xl:text-lg font-bold text-teal-900">
        <div className="w-[28%] min-w-0 text-center">Title</div>
        <div className="w-[25%] min-w-0 text-center">User</div>
        <div className="w-[19%] min-w-0 text-center">Status</div>
        <div className="w-[18%] min-w-0 text-center">Priority</div>
        <div className="w-[10%]" />
      </div>

      <div className="mt-2 min-w-0 overflow-hidden rounded-xl border border-teal-800 bg-[#f3f5f8]">
        <ul
          className={`flex w-full min-w-0 flex-col divide-y divide-teal-800 ${
            !tasks.length ? "items-center p-5" : ""
          }`}
        >
          {!tasks.length && (
            <li className="py-3 text-center text-sm sm:text-base font-semibold italic text-stone-500">
              No more items!
            </li>
          )}

          {tasks.map((task) => (
            <TasksItem
              key={task.id}
              task={task}
              pathnameEdit={`${pathname}/${task.id}/edit`}
              isOwner={isOwner}
              taskUser={taskUser}
              projectId={projectId}
            />
          ))}
        </ul>
      </div>

      <div className="mt-3 min-w-0 overflow-x-auto">
        <Pagination totalPage={totalPages} />
      </div>
    </div>
  );
}

export default SownAllTasks;
