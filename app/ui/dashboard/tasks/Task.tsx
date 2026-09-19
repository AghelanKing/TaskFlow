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
  const {
    title,
    description,
    due_date,
    priority,
    status,
    username,
    projectname,
  } = task[0];

  const taskId = task[0]?.id;

  return (
    <div className="bg-white w-full p-5 mt-5 rounded-2xl">
      <h1 className="text-3xl font-extrabold text-teal-700">{title}</h1>
      <h2 className="mt-2.5 text-sm text-stone-400 font-semibold">
        for <span className="text-base text-teal-500">{username}</span> And{" "}
        <span className="text-base text-teal-500">{projectname}</span> project
      </h2>

      <div className="mt-5 bg-stone-100 p-2 rounded-2xl flex gap-x-3 items-center">
        <h4 className="text-stone-600 font-semibold">description:</h4>
        <p className="font-semibold">{description}</p>
      </div>

      <div className="mt-5 bg-stone-100 p-2 rounded-2xl flex gap-x-6 items-center">
        <div className="flex gap-x-3 items-center">
          <h4 className="text-stone-600 font-semibold">status:</h4>
          <Status status={status} />
        </div>
        <div className="flex gap-x-3 items-center">
          <h4 className="text-stone-600 font-semibold">priority:</h4>
          <Priority priority={priority} />
        </div>
      </div>

      <div className="mt-5 bg-stone-100 p-2 rounded-2xl flex gap-x-3 items-center">
        <h4 className="text-stone-600 font-semibold">Due date:</h4>
        <p className="font-semibold">
          {due_date?.getFullYear()}/{(due_date?.getMonth() ?? 0) + 1}/
          {due_date?.getDate()}
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
