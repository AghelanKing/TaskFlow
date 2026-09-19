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
    <div className="flex gap-x-3 items-center">
      <ButttonsTask
        href={pathnameEdit}
        AddClass="flex items-center gap-x-1 font-semibold text-base! rounded-xl!"
      >
        <HiOutlinePencilSquare className="text-xl" />
        Edit Project
      </ButttonsTask>
      <ButttonsTask
        onClick={() => deleteProject(projectId, isOwner)}
        deleteTask={true}
        AddClass="flex items-center gap-x-1 font-semibold text-base! rounded-xl!"
      >
        <HiOutlineTrash className="text-xl" />
        Delete Project
      </ButttonsTask>
    </div>
  );
}

export default OwnerAction;
