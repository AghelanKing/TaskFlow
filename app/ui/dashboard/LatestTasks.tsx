import Status from "./tasks/Status";

export type LatestTask = {
  id: string;
  title: string;
  status: "todo" | "in_progress" | "done";
  username: string;
  userid: string;
};

function LatestTasks({ tasks }: { tasks: LatestTask[] | undefined }) {
  return (
    <div className="w-[50%] h-100 bg-white p-3 rounded-2xl">
      <div className="text-teal-900 font-bold flex items-center justify-between bg-[#f3f5f8] p-4 border border-teal-800 rounded-2xl text-lg">
        <div className="w-[25%] flex  items-center">title</div>
        <div className="w-[25%] pr-7 flex  items-center">user</div>
        <div className="w-[20%] flex  items-center">status</div>
      </div>
      <div className="flex mt-2 bg-[#f3f5f8] rounded-xl border border-teal-800 overflow-hidden">
        <ul
          className={`flex flex-col w-full divide-y divide-teal-800 ${!tasks?.length ? "p-5 items-center" : ""}`}
        >
          {!tasks?.length && (
            <p className="text-stone-500 font-semibold italic">No more item!</p>
          )}
          {tasks?.map((task) => (
            <TasksItem key={task.id} task={task} />
          ))}
        </ul>
      </div>
      <div></div>
    </div>
  );
}

function TasksItem({ task }: { task: LatestTask }) {
  return (
    <li className="flex gap-x-4 items-center p-2">
      {/* className="flex gap-x-4 justify-between py-5 px-3 items-center flex-1 cursor-pointer" */}
      <div className="w-[26%] ml-2 font-semibold text-teal-800 text-sm">
        {task.title}
      </div>
      <div
        className={`w-[25%] ml-13 mr-11 text-xs font-medium ${task.status === "in_progress" ? "mr-2!" : ""}`}
      >
        {task.username}
      </div>
      <div className="w-[26%]">
        <Status status={task.status} />
      </div>
    </li>
  );
}

export default LatestTasks;
