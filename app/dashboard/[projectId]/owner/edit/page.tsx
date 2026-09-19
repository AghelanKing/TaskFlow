import { fetchProject, getProjectAndUser } from "@/app/lib/data";
import Breadcrumbs from "@/app/ui/dashboard/breadcrumbs";
import EditProject from "@/app/ui/dashboard/owner/EditProject";
import { auth } from "@/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Project",
};

export default async function Page({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const sesstion = await auth();
  const userEmail = sesstion?.user?.email;
  const { user } = await getProjectAndUser(userEmail, projectId);
  const project = await fetchProject(projectId);
  const isOwner = project?.at(0)?.owner_id === user?.at(0)?.id;

  return (
    <div className="w-full h-full py-6 px-9">
      <Breadcrumbs
        options={[
          {
            label: "Owner Page",
            href: `/dashboard/${projectId}/owner`,
          },
          {
            label: "Edit Project",
            href: `/dashboard/${projectId}/owner/edit`,
            active: true,
          },
        ]}
      />
      <EditProject
        projectId={projectId}
        isOwner={isOwner}
        projectObj={project?.at(0)}
      />
    </div>
  );
}
