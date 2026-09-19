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
    <div className="mt-5 flex gap-x-3 items-center">
      {(isOwner || isUser) && (
        <ButttonsTask
          href={pathnameEdit}
          AddClass="flex items-center gap-x-1 font-semibold text-base! rounded-lg!"
        >
          <HiOutlinePencilSquare className="text-xl" />
          Edit task
        </ButttonsTask>
      )}

      {isOwner && (
        <ButttonsTask
          onClick={() => deleteTask(projectId, taskId)}
          deleteTask={true}
          AddClass="flex items-center gap-x-1 font-semibold text-base! rounded-lg!"
        >
          <HiOutlineTrash className="text-xl" />
          Delete Task
        </ButttonsTask>
      )}
    </div>
  );
}

export default TaskAction;
