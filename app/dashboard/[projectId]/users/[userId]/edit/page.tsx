import { getProjectAndUser } from "@/app/lib/data";
import Breadcrumbs from "@/app/ui/dashboard/breadcrumbs";
import EditUser from "@/app/ui/dashboard/users/EditUser";
import { auth } from "@/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit User",
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

  return (
    <div className="w-full h-full py-6 px-9">
      <Breadcrumbs
        options={[
          {
            label: "Users",
            href: `/dashboard/${projectId}/users`,
          },
          {
            label: "Edit Users",
            href: `/dashboard/${projectId}/users/${user?.at(0)?.id}/edit`,
            active: true,
          },
        ]}
      />
      <EditUser projectId={projectId} user={user} />
    </div>
  );
}
