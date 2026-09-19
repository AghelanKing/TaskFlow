import { MdRemoveDone } from "react-icons/md";
import { TbProgressCheck } from "react-icons/tb";
import { IoCheckmarkDone } from "react-icons/io5";
import { Task } from "./TasksItem";
import { IconType } from "react-icons";

const statusStyle: Record<Task["status"], string> = {
  todo: "text-red-700 bg-red-100",
  in_progress: "text-orange-700 bg-orange-200",
  done: "text-green-700 bg-green-200",
};

const statusIcon: Record<Task["status"], IconType> = {
  todo: MdRemoveDone,
  in_progress: TbProgressCheck,
  done: IoCheckmarkDone,
};

function Status({ status }: { status: Task["status"] }) {
  const Icon = statusIcon[status];
  return (
    <span
      className={`py-1 px-3.5 rounded-full flex items-center gap-x-1 w-fit ${statusStyle[status]}`}
    >
      <Icon />
      {status === "in_progress" ? "in progress" : status}
    </span>
  );
}

export default Status;
