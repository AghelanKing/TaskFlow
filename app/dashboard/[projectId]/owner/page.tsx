import { fetchProjectMembers, getProjectAndUser } from "@/app/lib/data";
import OwnerAction from "@/app/ui/dashboard/owner/OwnerAction";
import OwnershipSelect from "@/app/ui/dashboard/owner/OwnershipSelect";
import { auth } from "@/auth";
import { Metadata } from "next";
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
  const sesstion = await auth();
  const userEmail = sesstion?.user?.email;
  const { project, user } = await getProjectAndUser(userEmail, projectId);
  const users = await fetchProjectMembers(projectId);

  const usersFiltered = users.filter(
    (user) => user.id !== project?.at(0)?.owner_id,
  );

  const projectName = project?.at(0)?.name;
  const projectDescription = project?.at(0)?.description;

  const isOwner = project?.at(0)?.owner_id === user?.at(0)?.id;

  return isOwner ? (
    <div className="w-full h-full py-6 px-9">
      <h1 className="text-3xl font-bold text-teal-600">Owenr Page</h1>

      <div className="bg-white w-full p-5 mt-5 rounded-2xl">
        <h1 className="text-3xl font-extrabold text-teal-700">
          {projectName} Project
        </h1>

        <h5 className="text-stone-500 font-semibold text-sm mt-3">
          You is{" "}
          <span className="text-[#ce03f6] bg-purple-200 py-1 px-3 rounded-full">
            Owner
          </span>{" "}
          this project.
        </h5>

        <div className="mt-6 bg-stone-100 p-2 rounded-2xl flex gap-x-3 items-center">
          <h4 className="text-stone-600 font-semibold">description:</h4>
          <p className="font-semibold">{projectDescription}</p>
        </div>
      </div>

      <div className="bg-white w-full p-5 mt-7 rounded-2xl">
        <h1 className="text-2xl font-extrabold text-teal-700">
          Transfer of ownership
        </h1>

        <OwnershipSelect
          users={usersFiltered}
          projectId={projectId}
          userIdPrevious={project?.at(0)?.owner_id}
          isOwner={isOwner}
        />
      </div>

      <div className="bg-white w-full p-2 mt-7 rounded-2xl">
        <OwnerAction
          projectId={projectId}
          isOwner={isOwner}
          pathnameEdit={`/dashboard/${projectId}/owner/edit`}
        />
      </div>
    </div>
  ) : (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <span className="flex text-xl text-red-700 font-semibold items-center gap-x-1.5">
        <BiMessageSquareError className="text-4xl text-red-700 text-center bg-red-200 rounded-md" />{" "}
        Error:
      </span>
      <p className="text-xl font-bold text-red-700 mb-18 mt-3">
        You do not own this project and cannot access this page.
      </p>
    </div>
  );
}
