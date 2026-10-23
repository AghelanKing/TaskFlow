import { fetchProjectMembers, getProjectAndUser } from "@/app/lib/data";
import OwnerAction from "@/app/ui/dashboard/owner/OwnerAction";
import OwnershipSelect from "@/app/ui/dashboard/owner/OwnershipSelect";
import { auth } from "@/auth";
import type { Metadata } from "next";
import { BiMessageSquareError } from "react-icons/bi";

export const metadata: Metadata = {
  title: "Owner Page",
};

export default async function Page({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const session = await auth();
  const userEmail = session?.user?.email;
  const { project, user } = await getProjectAndUser(userEmail, projectId);
  const users = await fetchProjectMembers(projectId);

  const usersFiltered = users.filter((user) => user.id !== project?.owner_id);

  const projectName = project?.name;
  const projectDescription = project?.description;

  const isOwner = project?.owner_id === user?.at(0)?.id;

  return isOwner ? (
    <div className="w-full min-w-0 h-full px-3 py-5 min-[400px]:px-4 sm:px-6 sm:py-8 lg:px-9">
      <h1 className="text-2xl sm:text-3xl font-bold text-teal-600">
        Owenr Page
      </h1>

      <div className="bg-white w-full min-w-0 p-3 sm:p-5 mt-5 rounded-2xl">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-teal-700 wrap-break-word">
          {projectName} Project
        </h1>

        <h5 className="text-stone-500 font-semibold text-sm mt-3 wrap-break-word">
          You is{" "}
          <span className="inline-block text-[#ce03f6] bg-purple-200 py-1 px-3 rounded-full">
            Owner
          </span>{" "}
          this project.
        </h5>

        <div className="mt-6 bg-stone-100 p-3 sm:p-2 rounded-2xl flex flex-col sm:flex-row sm:gap-x-3 gap-y-2 sm:gap-y-0 sm:items-center min-w-0">
          <h4 className="text-stone-600 font-semibold shrink-0">
            description:
          </h4>
          <p className="font-semibold min-w-0 wrap-break-word">
            {projectDescription}
          </p>
        </div>
      </div>

      <div className="bg-white w-full min-w-0 p-3 sm:p-5 mt-7 rounded-2xl">
        <h1 className="text-xl sm:text-2xl font-extrabold text-teal-700 wrap-break-word">
          Transfer of ownership
        </h1>

        <OwnershipSelect
          users={usersFiltered}
          projectId={projectId}
          userIdPrevious={project?.owner_id}
          isOwner={isOwner}
        />
      </div>

      <div className="bg-white w-full min-w-0 p-2 mt-7 rounded-2xl">
        <OwnerAction
          projectId={projectId}
          isOwner={isOwner}
          pathnameEdit={`/dashboard/${projectId}/owner/edit`}
        />
      </div>
    </div>
  ) : (
    <div className="w-full min-w-0 min-h-full p-4 flex flex-col items-center justify-center">
      <span className="flex flex-wrap text-lg sm:text-xl text-red-700 font-semibold items-center justify-center gap-x-1.5 gap-y-2 text-center">
        <BiMessageSquareError className="shrink-0 text-4xl text-red-700 bg-red-200 rounded-md" />
        Error:
      </span>
      <p className="text-lg sm:text-xl font-bold text-red-700 mt-3 mb-10 text-center wrap-break-word">
        You do not own this project and cannot access this page.
      </p>
    </div>
  );
}
