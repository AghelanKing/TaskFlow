"use client";

import { HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";
import ButttonsTask from "./ButttonsTask";
import { deleteTask } from "@/app/dashboard/[projectId]/tasks/[taskId]/action";

function TaskAction({
  pathnameEdit,
  projectId,
  taskId,
  isOwner,
  isUser,
}: {
  pathnameEdit: string;
  projectId: string;
  taskId: string;
  isOwner: boolean;
  isUser: boolean;
}) {
  return (
    <div className="mt-5 flex min-w-0 flex-wrap items-center gap-2 sm:gap-x-3">
      {(isOwner || isUser) && (
        <ButttonsTask
          href={pathnameEdit}
          AddClass="flex items-center justify-center gap-x-1 rounded-lg! text-sm min-[400px]:text-base! font-semibold"
        >
          <HiOutlinePencilSquare className="shrink-0 text-xl" />
          <span>Edit task</span>
        </ButttonsTask>
      )}

      {isOwner && (
        <ButttonsTask
          onClick={() => deleteTask(projectId, taskId)}
          deleteTask={true}
          AddClass="flex items-center justify-center gap-x-1 rounded-lg! text-sm min-[400px]:text-base! font-semibold"
        >
          <HiOutlineTrash className="shrink-0 text-xl" />
          <span>Delete Task</span>
        </ButttonsTask>
      )}
    </div>
  );
}

export default TaskAction;
