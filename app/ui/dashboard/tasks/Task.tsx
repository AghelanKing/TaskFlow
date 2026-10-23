import { TaskWithId } from "./EditTask";
import Priority from "./Priority";
import Status from "./Status";
import TaskAction from "./TaskAction";

function Task({
  task,
  pathnameEdit,
  projectId,
  isOwner,
  isUser,
}: {
  task: TaskWithId[];
  pathnameEdit: string;
  projectId: string;
  isOwner: boolean;
  isUser: boolean;
}) {
  if (!task.length) {
    return (
      <div className="mt-5 w-full rounded-2xl bg-white p-5 text-stone-500">
        Task not found.
      </div>
    );
  }

  const {
    title,
    description,
    due_date,
    priority,
    status,
    username,
    projectname,
  } = task[0];

  const taskId = task[0].id;

  return (
    <div className="mt-5 w-full min-w-0 rounded-2xl bg-white p-3 min-[400px]:p-4 sm:p-5">
      <h1 className="wrap-break-word text-2xl sm:text-3xl font-extrabold text-teal-700">
        {title}
      </h1>

      <h2 className="mt-2.5 wrap-break-word text-sm font-semibold text-stone-400">
        for <span className="text-base text-teal-500">{username}</span> And{" "}
        <span className="text-base text-teal-500">{projectname}</span> project
      </h2>

      {/* Description */}
      <div className="mt-5 flex min-w-0 flex-col items-start gap-2 rounded-2xl bg-stone-100 p-3 sm:flex-row sm:gap-x-3">
        <h4 className="shrink-0 font-semibold text-stone-600">Description:</h4>

        <p className="min-w-0 max-w-full whitespace-pre-wrap wrap-break-word font-semibold text-stone-800">
          {description || "No description provided."}
        </p>
      </div>

      {/* Status and priority */}
      <div className="mt-5 flex min-w-0 flex-col gap-3 rounded-2xl bg-stone-100 p-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6">
        <div className="flex min-w-0 flex-wrap items-center gap-2 sm:gap-x-3">
          <h4 className="shrink-0 font-semibold text-stone-600">Status:</h4>
          <Status status={status} />
        </div>

        <div className="flex min-w-0 flex-wrap items-center gap-2 sm:gap-x-3">
          <h4 className="shrink-0 font-semibold text-stone-600">Priority:</h4>
          <Priority priority={priority} />
        </div>
      </div>

      {/* Due date */}
      <div className="mt-5 flex min-w-0 flex-col items-start gap-2 rounded-2xl bg-stone-100 p-3 min-[400px]:flex-row min-[400px]:items-center min-[400px]:gap-x-3">
        <h4 className="shrink-0 font-semibold text-stone-600">Due date:</h4>

        <p className="wrap-break-word font-semibold text-stone-800">
          {due_date
            ? `${due_date.getFullYear()}/${due_date.getMonth() + 1}/${due_date.getDate()}`
            : "No due date"}
        </p>
      </div>

      <TaskAction
        pathnameEdit={pathnameEdit}
        projectId={projectId}
        taskId={taskId}
        isOwner={isOwner}
        isUser={isUser}
      />
    </div>
  );
}

export default Task;
