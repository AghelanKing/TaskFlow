import { getProjectAndUser } from "@/app/lib/data";
import Breadcrumbs from "@/app/ui/dashboard/breadcrumbs";
import EditUser from "@/app/ui/dashboard/users/EditUser";
import { auth } from "@/auth";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit User",
};

export default async function Page({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const session = await auth();
  const userEmail = session?.user?.email;
  const { user } = await getProjectAndUser(userEmail, projectId);

  return (
    <div className="w-full min-w-0 h-full px-3 py-5 min-[400px]:px-4 sm:px-6 sm:py-8 lg:px-9">
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

      <div className="w-full min-w-0">
        <EditUser projectId={projectId} user={user} />
      </div>
    </div>
  );
}
