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

  const currentPage = Number(searchParams.get("page")) || 1;

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const tasks = allTasks.slice(startIndex, endIndex);

  return (
    <div className=" mt-1 w-full h-[80%] bg-white p-3 rounded-2xl">
      <div className="text-teal-900 font-bold flex items-center justify-between bg-[#f3f5f8] p-4 border border-teal-800 rounded-2xl text-lg">
        <div className="w-[25%] flex justify-center items-center">title</div>
        <div className="w-[25%] pr-7 flex justify-center items-center">
          user
        </div>
        <div className="w-[20%] flex justify-center items-center">status</div>
        <div className="w-[20%] flex justify-center items-center">priority</div>
        <div className="w-[10%] flex justify-center items-center"></div>
      </div>
      <div className="flex mt-2 bg-[#f3f5f8] rounded-xl border border-teal-800 overflow-hidden">
        <ul
          className={`flex flex-col w-full divide-y divide-teal-800 ${!tasks.length ? "p-5 items-center" : ""}`}
        >
          {!tasks.length && (
            <p className="text-stone-500 font-semibold italic">No more item!</p>
          )}
          {tasks?.map((task) => (
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
      <div>
        <Pagination totalPage={totalPages} />
      </div>
    </div>
  );
}

export default SownAllTasks;
