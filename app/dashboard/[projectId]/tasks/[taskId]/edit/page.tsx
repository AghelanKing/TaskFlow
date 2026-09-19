import {
  fetchProjectMembers,
  fetchTaskWithId,
  getProjectAndUser,
} from "@/app/lib/data";
import Breadcrumbs from "@/app/ui/dashboard/breadcrumbs";
import EditTask from "@/app/ui/dashboard/tasks/EditTask";
import { auth } from "@/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Tasks",
};

export default async function Page({
  params,
}: {
  params: Promise<{
    taskId: string;
    projectId: string;
  }>;
}) {
  const { projectId, taskId } = await params;

  const sesstion = await auth();
  const userEmail = sesstion?.user?.email;
  const { project, user } = await getProjectAndUser(userEmail, projectId);

  const isOwner = project?.at(0)?.owner_id === user?.at(0)?.id;

  const users = await fetchProjectMembers(projectId);

  const task = await fetchTaskWithId(projectId, taskId);
  const isUser = task?.at(0)?.userid === user?.at(0)?.id;

  return (
    <div className="w-full h-full py-8 px-9">
      <Breadcrumbs
        options={[
          {
            label: "Tasks",
            href: `/dashboard/${projectId}/tasks`,
          },
          {
            label: "Edit Task",
            href: `/dashboard/${projectId}/tasks/${taskId}/edit`,
            active: true,
          },
        ]}
      />
      <EditTask
        projectId={projectId}
        isOwner={isOwner}
        users={users}
        task={task}
        isUser={isUser}
      />
    </div>
  );
}
