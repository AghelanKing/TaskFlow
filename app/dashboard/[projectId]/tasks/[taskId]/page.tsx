import { fetchTaskWithId, getProjectAndUser } from "@/app/lib/data";
import Breadcrumbs from "@/app/ui/dashboard/breadcrumbs";
import Task from "@/app/ui/dashboard/tasks/Task";
import { auth } from "@/auth";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Task",
};

export default async function Page({
  params,
}: {
  params: Promise<{ projectId: string; taskId: string }>;
}) {
  const { projectId, taskId } = await params;

  const session = await auth();
  const userEmail = session?.user?.email;

  const { project, user } = await getProjectAndUser(userEmail, projectId);

  const task = await fetchTaskWithId(projectId, taskId);

  const pathnameEdit = `/dashboard/${projectId}/tasks/${taskId}/edit`;

  const isOwner = project?.owner_id === user?.at(0)?.id;
  const isUser = task?.at(0)?.userid === user?.at(0)?.id;

  return (
    <div className="w-full min-w-0 px-3 py-5 min-[400px]:px-4 sm:px-6 sm:py-8 lg:px-9">
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
