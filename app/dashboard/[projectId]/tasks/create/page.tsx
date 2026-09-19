import { fetchProjectMembers, getProjectAndUser } from "@/app/lib/data";
import Breadcrumbs from "@/app/ui/dashboard/breadcrumbs";
import CreateTask from "@/app/ui/dashboard/tasks/CreateTask";
import { auth } from "@/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Tasks",
};

export default async function Page({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const sesstion = await auth();
  const userEmail = sesstion?.user?.email;
  const { project, user } = await getProjectAndUser(userEmail, projectId);

  const isOwner = user?.at(0)?.id === project?.at(0)?.owner_id;

  const users = await fetchProjectMembers(projectId);
  return (
    <div className="w-full h-full py-8 px-12">
      <Breadcrumbs
        options={[
          { label: "Tasks", href: `/dashboard/${projectId}/tasks` },
          {
            label: "Create Tasks",
            href: `/dashboard/${projectId}/tasks/create`,
            active: true,
          },
        ]}
      />
      <CreateTask users={users} projectId={projectId} isOwner={isOwner} />
      <div></div>
    </div>
  );
}
