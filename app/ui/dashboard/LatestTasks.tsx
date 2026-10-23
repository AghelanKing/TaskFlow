import Status from "./tasks/Status";

export type LatestTask = {
  id: string;
  title: string;
  status: "todo" | "in_progress" | "done";
  username: string;
  userid: string;
};

function LatestTasks({ tasks }: { tasks: LatestTask[] | undefined }) {
  const columns =
    "grid grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,1fr)] gap-2 items-center";

  return (
    <div className="w-full lg:w-1/2 min-w-0 min-h-100 bg-white p-2 sm:p-3 rounded-2xl">
      {/* Desktop table header */}
      <div
        className={`${columns} hidden sm:grid text-teal-900 font-bold bg-[#f3f5f8] p-3 lg:p-4 border border-teal-800 rounded-2xl text-sm lg:text-lg`}
      >
        <div className="min-w-0">title</div>
        <div className="min-w-0">user</div>
        <div className="min-w-0">status</div>
      </div>

      {/* Tasks list */}
      <div className="mt-2 bg-[#f3f5f8] rounded-xl border border-teal-800 overflow-hidden">
        <ul
          className={`flex flex-col w-full min-w-0 divide-y divide-teal-800 ${
            !tasks?.length ? "p-5 items-center" : ""
          }`}
        >
          {!tasks?.length && (
            <li className="text-stone-500 font-semibold italic text-sm sm:text-base text-center">
              No more item!
            </li>
          )}

          {tasks?.map((task) => (
            <TasksItem key={task.id} task={task} columns={columns} />
          ))}
        </ul>
      </div>
    </div>
  );
}

function TasksItem({ task, columns }: { task: LatestTask; columns: string }) {
  return (
    <li className="min-w-0 hover:bg-teal-100">
      {/* Mobile card */}
      <div className="flex sm:hidden flex-col gap-3 p-3 min-[400px]:p-4">
        <div className="min-w-0">
          <p className="text-xs text-stone-500 mb-1">Title</p>
          <p className="font-semibold text-teal-800 text-sm wrap-break-word">
            {task.title}
          </p>
        </div>

        <div className="min-w-0">
          <p className="text-xs text-stone-500 mb-1">User</p>
          <p className="text-sm font-medium wrap-break-word">{task.username}</p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs text-stone-500">Status</span>
          <Status status={task.status} />
        </div>
      </div>

      {/* Desktop table row */}
      <div className={`${columns} hidden sm:grid p-3 lg:p-4`}>
        <div className="min-w-0 font-semibold text-teal-800 text-sm wrap-break-word">
          {task.title}
        </div>

        <div className="min-w-0 text-sm font-medium wrap-break-word">
          {task.username}
        </div>

        <div className="min-w-0">
          <Status status={task.status} />
        </div>
      </div>
    </li>
  );
}

export default LatestTasks;
