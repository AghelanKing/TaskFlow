import { fetchTaskWithId, getProjectAndUser } from "@/app/lib/data";
import Breadcrumbs from "@/app/ui/dashboard/breadcrumbs";
import Task from "@/app/ui/dashboard/tasks/Task";
import { auth } from "@/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Task",
};

export default async function Page({
  params,
}: {
  params: Promise<{ projectId: string; taskId: string }>;
}) {
  const { projectId, taskId } = await params;

  const sesstion = await auth();
  const userEmail = sesstion?.user?.email;
  const { project, user } = await getProjectAndUser(userEmail, projectId);

  const task = await fetchTaskWithId(projectId, taskId);

  const pathnameEdit = `/dashboard/${projectId}/tasks/${taskId}/edit`;

  const isOwner = project?.at(0)?.owner_id === user?.at(0)?.id;
  const isUser = task?.at(0)?.userid === user?.at(0)?.id;

  return (
    <div className="w-full h-full py-8.5 px-9">
      <Breadcrumbs
        options={[
          { label: "Tasks", href: `/dashboard/${projectId}/tasks` },
          {
            label: "Task",
            href: `/dashboard/${projectId}/tasks/${taskId}`,
            active: true,
          },
        ]}
      />
      <Task
        task={task}
        pathnameEdit={pathnameEdit}
        projectId={projectId}
        isOwner={isOwner}
        isUser={isUser}
      />
    </div>
  );
}
