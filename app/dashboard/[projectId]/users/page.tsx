import { fetchUsers, getProjectAndUser } from "@/app/lib/data";
import Search from "@/app/ui/dashboard/tasks/Search";
import SownAllUsers from "@/app/ui/dashboard/users/SownAllUsers";
import { auth } from "@/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Users",
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

  const users = await fetchUsers(projectId, query);

  const isOwner = project?.at(0)?.owner_id === user?.at(0)?.id;

  // const isOwner = users?.some((user) => user.id === );

  return (
    <div className="w-full h-full py-6 px-9">
      <h1 className="text-3xl font-bold text-teal-600">Users</h1>
      <div className="flex w-full items-center gap-x-4">
        <Search width="w-full" placeholder="Search User..." />
      </div>

      <div className="mt-6">
        <SownAllUsers
          allUsers={users}
          isOwner={isOwner}
          ownerId={project?.at(0)?.owner_id}
          userId={user?.at(0)?.id}
          projectId={projectId}
        />
      </div>
    </div>
  );
}
