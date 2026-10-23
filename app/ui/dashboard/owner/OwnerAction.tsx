"use client";

import { HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";
import ButttonsTask from "../tasks/ButttonsTask";
import { deleteProject } from "@/app/dashboard/[projectId]/owner/action";

function OwnerAction({
  pathnameEdit,
  projectId,
  isOwner,
}: {
  pathnameEdit?: string;
  projectId: string;
  isOwner: boolean;
}) {
  return (
    <div className="flex flex-col sm:flex-row flex-wrap gap-3 items-stretch sm:items-center min-w-0">
      <ButttonsTask
        href={pathnameEdit}
        AddClass="flex w-full sm:w-auto items-center justify-center gap-x-1 font-semibold text-base! rounded-xl!"
      >
        <HiOutlinePencilSquare className="text-xl shrink-0" />
        Edit Project
      </ButttonsTask>

      <ButttonsTask
        onClick={() => deleteProject(projectId, isOwner)}
        deleteTask={true}
        AddClass="flex w-full sm:w-auto items-center justify-center gap-x-1 font-semibold text-base! rounded-xl!"
      >
        <HiOutlineTrash className="text-xl shrink-0" />
        Delete Project
      </ButttonsTask>
    </div>
  );
}

export default OwnerAction;
