import { fetchAllTasks, getProjectAndUser } from "@/app/lib/data";
import Button from "@/app/ui/Button";
import Search from "@/app/ui/dashboard/tasks/Search";
import SownAllTasks from "@/app/ui/dashboard/tasks/SownAllTasks";
import { auth } from "@/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tasks",
};

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ projectId: string }>;
  searchParams: Promise<{ query: string }>;
}) {
  const { projectId } = await params;

  const searchParamsTasks = await searchParams;
  const query = searchParamsTasks?.query || "";

  const sesstion = await auth();
  const userEmail = sesstion?.user?.email;
  const { project, user } = await getProjectAndUser(userEmail, projectId);

  const isOwner = project?.at(0)?.owner_id === user?.at(0)?.id;

  const allTasks = await fetchAllTasks(projectId, query);

  const taskUser = allTasks.filter((task) => task.userid === user?.at(0)?.id);

  const h1ClassName = `text-2xl text-teal-600 font-semibold italic`;

  return (
    <div className="w-full h-full py-6 px-9">
      <h1 className="text-3xl font-bold text-teal-600">Tasks</h1>
      <div className="flex w-full items-center gap-x-4">
        <Search width="w-[85%]" placeholder="search Task..." />
        {isOwner && (
          <Button
            AddClass="w-[12%] mt-6 text-center py-2!"
            href={`/dashboard/${projectId}/tasks/create`}
          >
            Create Task
          </Button>
        )}
      </div>
      <div className="mt-6">
        <h1 className={h1ClassName}>Your Tasks:</h1>
        <SownAllTasks
          isOwner={isOwner}
          taskUser={taskUser}
          allTasks={taskUser}
          projectId={projectId}
        />
      </div>
      <div className="mt-6">
        <h1 className={h1ClassName}>All Tasks:</h1>
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
