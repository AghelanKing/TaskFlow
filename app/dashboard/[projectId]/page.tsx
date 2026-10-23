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
  title: "dashboard",
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
  const cardsValue = await fetchStatisticalCards(projectId);
  const tasks = await fetchLatestTasks(projectId);

  const yourTasks = tasks?.filter((task) => task.userid === user?.at(0)?.id);

  return (
    <div className="w-full min-w-0 py-6 px-4 sm:px-6 lg:px-9">
      <h1 className="flex flex-wrap items-center gap-2 text-2xl sm:text-3xl font-bold text-teal-600 wrap-break-words">
        Dashboard Project {project?.at(0)?.name || null}
        {project?.at(0) && (
          <span
            className={`text-base ${
              project?.at(0)?.owner_id === user?.at(0)?.id
                ? "text-[#ce03f6] bg-purple-200"
                : "bg-emerald-200 text-emerald-600"
            } py-1 px-2 rounded-full`}
          >
            {project?.at(0)?.owner_id === user?.at(0)?.id ? "Owenr" : "Member"}
          </span>
        )}
      </h1>

      {project && (
        <>
          <h2 className="mt-1 text-lg sm:text-xl font-semibold text-stone-600 wrap-break-words">
            {user?.at(0)?.name}, Welcome to project
          </h2>

          <CardsStats cardsValue={cardsValue} />

          <h1 className="text-2xl font-bold text-teal-600 mt-3">
            Latest Tasks:
          </h1>

          <div className="w-full min-w-0 flex flex-col lg:flex-row gap-3 mt-1">
            <LatestTasks tasks={yourTasks} />
            <LatestTasks tasks={tasks} />
          </div>
        </>
      )}

      {!project && <NoProject />}
    </div>
  );
}
