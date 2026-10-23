import { fetchUsers, getProjectAndUser } from "@/app/lib/data";
import Search from "@/app/ui/dashboard/tasks/Search";
import SownAllUsers from "@/app/ui/dashboard/users/SownAllUsers";
import { auth } from "@/auth";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Users",
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

  const users = await fetchUsers(projectId, query);
  const isOwner = project?.owner_id === user?.at(0)?.id;

  return (
    <div className="w-full min-w-0 h-full px-3 py-5 min-[400px]:px-4 sm:px-6 sm:py-8 lg:px-9">
      <h1 className="text-2xl sm:text-3xl font-bold text-teal-600">Users</h1>

      <div className="flex w-full min-w-0 items-center gap-3 sm:gap-x-4 mt-3">
        <Search width="w-full" placeholder="Search User..." />
      </div>

      <div className="mt-5 sm:mt-6 min-w-0">
        <SownAllUsers
          allUsers={users}
          isOwner={isOwner}
          ownerId={project?.owner_id}
          userId={user?.at(0)?.id}
          projectId={projectId}
        />
      </div>
    </div>
  );
}
