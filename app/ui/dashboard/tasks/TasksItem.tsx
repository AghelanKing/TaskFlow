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
    <li className="flex items-center hover:bg-teal-100">
      <Link
        href={`/dashboard/${projectId}/tasks/${task.id}`}
        className="flex gap-x-4 justify-between py-5 px-3 items-center flex-1 cursor-pointer"
      >
        <div className="w-[26%] pl-12 font-semibold text-teal-800">
          {task.title}
        </div>
        <div className="w-[25%] pl-20 text-sm">{task.username}</div>
        <div className="w-[20%] pl-15">
          <Status status={task.status} />
        </div>
        <div className="w-[20%] pl-15">
          <Priority priority={task.priority} />
        </div>
      </Link>

      {/* حالا این بیرون از <Link> اصلیه، نه داخلش */}
      <div className="w-[10%] pl-2 flex items-center gap-x-2 pr-3">
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
