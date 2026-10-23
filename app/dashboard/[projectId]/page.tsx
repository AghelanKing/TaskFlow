import { auth } from "@/auth";
import {
  fetchLatestTasks,
  fetchStatisticalCards,
  getProjectAndUser,
} from "@/app/lib/data";
import NoProject from "@/app/ui/dashboard/Noproject";
import CardsStats from "@/app/ui/dashboard/CardsStats";
import LatestTasks from "@/app/ui/dashboard/LatestTasks";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
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

  const cardsValue = await fetchStatisticalCards(projectId);
  const tasks = await fetchLatestTasks(projectId);

  const currentProject = project;
  const currentUser = user?.at(0);

  const yourTasks = tasks?.filter((task) => task.userid === currentUser?.id);

  const isOwner = currentProject?.owner_id === currentUser?.id;

  return (
    <div className="w-full min-w-0 py-6 px-4 sm:px-6 lg:px-9">
      <h1 className="flex flex-wrap items-center gap-2 text-2xl sm:text-3xl font-bold text-teal-600 wrap-break-word">
        Dashboard Project {currentProject?.name}
        {currentProject && (
          <span
            className={`text-base py-1 px-2 rounded-full ${
              isOwner
                ? "text-[#ce03f6] bg-purple-200"
                : "bg-emerald-200 text-emerald-600"
            }`}
          >
            {isOwner ? "Owner" : "Member"}
          </span>
        )}
      </h1>

      {currentProject ? (
        <>
          <h2 className="mt-1 text-lg sm:text-xl font-semibold text-stone-600 wrap-break-word">
            {currentUser?.name}, Welcome to project
          </h2>

          <CardsStats cardsValue={cardsValue} />

          <h2 className="text-2xl font-bold text-teal-600 mt-3">
            Latest Tasks:
          </h2>

          <div className="w-full min-w-0 flex flex-col lg:flex-row gap-3 mt-1">
            <LatestTasks tasks={yourTasks} />
            <LatestTasks tasks={tasks} />
          </div>
        </>
      ) : (
        <NoProject />
      )}
    </div>
  );
}
