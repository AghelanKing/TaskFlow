import { fetchAllTasks, getProjectAndUser } from "@/app/lib/data";
import Button from "@/app/ui/Button";
import Search from "@/app/ui/dashboard/tasks/Search";
import SownAllTasks from "@/app/ui/dashboard/tasks/SownAllTasks";
import { auth } from "@/auth";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tasks",
};

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ projectId: string }>;
  searchParams: Promise<{ query?: string; page?: string }>;
}) {
  const { projectId } = await params;
  const searchParamsTasks = await searchParams;
  const query = searchParamsTasks?.query || "";

  const session = await auth();
  const userEmail = session?.user?.email;

  const { project, user } = await getProjectAndUser(userEmail, projectId);

  const isOwner = project?.at(0)?.owner_id === user?.at(0)?.id;

  const allTasks = await fetchAllTasks(projectId, query);

  const taskUser = allTasks.filter((task) => task.userid === user?.at(0)?.id);

  const h1ClassName = "text-xl sm:text-2xl text-teal-600 font-semibold italic";

  return (
    <div className="w-full min-w-0 py-4 sm:py-6 px-3 min-[400px]:px-4 sm:px-6 lg:px-9">
      <h1 className="text-2xl sm:text-3xl font-bold text-teal-600">Tasks</h1>

      <div className="flex w-full min-w-0 flex-col sm:flex-row sm:items-end gap-3 sm:gap-x-4">
        <Search width="w-full sm:flex-1" placeholder="Search Task..." />

        {isOwner && (
          <Button
            AddClass="w-full sm:w-auto shrink-0 mt-0 sm:mt-6 text-center py-2!"
            href={`/dashboard/${projectId}/tasks/create`}
          >
            Create Task
          </Button>
        )}
      </div>

      <div className="mt-6 min-w-0">
        <h2 className={h1ClassName}>Your Tasks:</h2>

        <SownAllTasks
          isOwner={isOwner}
          taskUser={taskUser}
          allTasks={taskUser}
          projectId={projectId}
        />
      </div>

      <div className="mt-6 min-w-0">
        <h2 className={h1ClassName}>All Tasks:</h2>

        <SownAllTasks
          isOwner={isOwner}
          taskUser={taskUser}
          allTasks={allTasks}
          projectId={projectId}
        />
      </div>
    </div>
  );
}
