import { Task } from "./TasksItem";

const priorityStyle: Record<Task["priority"], string> = {
  low: "text-blue-50 bg-blue-500",
  medium: "text-green-50 bg-green-600",
  high: "text-red-50 bg-red-700",
};

function Priority({ priority }: { priority: Task["priority"] }) {
  return (
    <span className={`py-1 px-3.5 rounded-full ${priorityStyle[priority]}`}>
      {priority}
    </span>
  );
}

export default Priority;
