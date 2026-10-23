import ButttonsTask from "./ButttonsTask";
import { HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";
import { deleteTask } from "@/app/dashboard/[projectId]/tasks/[taskId]/action";
import Link from "next/link";
import Status from "./Status";
import Priority from "./Priority";

export type Task = {
  id: string;
  title: string;
  status: "todo" | "in_progress" | "done";
  priority: "low" | "medium" | "high";
  username: string;
  userid: string;
};

function TasksItem({
  task,
  pathnameEdit,
  isOwner,
  taskUser,
  projectId,
}: {
  task: Task;
  pathnameEdit: string;
  isOwner: boolean;
  taskUser: Task[];
  projectId: string;
}) {
  const isUser = taskUser.some((member) => task.userid === member.userid);

  return (
    <li className="flex min-w-0 flex-col hover:bg-teal-100 lg:flex-row lg:items-center">
      <Link
        href={`/dashboard/${projectId}/tasks/${task.id}`}
        className="flex min-w-0 flex-1 flex-col gap-3 p-3 min-[400px]:p-4 lg:flex-row lg:items-center lg:gap-0 lg:py-5 lg:px-3"
      >
        {/* Mobile layout */}
        <div className="flex min-w-0 flex-col gap-2 lg:hidden">
          <span className="wrap-break-words font-semibold text-teal-800">
            {task.title}
          </span>

          <span className="wrap-break-words text-sm text-stone-600">
            {task.username}
          </span>

          <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-2 pt-1">
            <div className="min-w-0">
              <Status status={task.status} />
            </div>

            <div className="min-w-0">
              <Priority priority={task.priority} />
            </div>
          </div>
        </div>

        {/* Desktop layout */}
        <div className="hidden min-w-0 w-[28%] truncate pl-2 font-semibold text-teal-800 lg:block">
          {task.title}
        </div>

        <div className="hidden min-w-0 w-[25%] truncate px-2 text-sm lg:block">
          {task.username}
        </div>

        <div className="hidden min-w-0 w-[19%] px-2 lg:block">
          <Status status={task.status} />
        </div>

        <div className="hidden min-w-0 w-[18%] px-2 lg:block">
          <Priority priority={task.priority} />
        </div>
      </Link>

      {/* Actions stay outside the task link */}
      <div className="flex items-center justify-end gap-2 border-t border-teal-800/20 px-3 py-2 lg:w-[10%] lg:shrink-0 lg:justify-center lg:border-0 lg:py-0 lg:pr-3">
        {(isOwner || isUser) && (
          <ButttonsTask href={pathnameEdit}>
            <HiOutlinePencilSquare />
          </ButttonsTask>
        )}

        {isOwner && (
          <ButttonsTask
            onClick={() => deleteTask(projectId, task.id)}
            deleteTask={true}
          >
            <HiOutlineTrash />
          </ButttonsTask>
        )}
      </div>
    </li>
  );
}

export default TasksItem;
