import { Suspense } from "react";
import SideNav from "../../ui/dashboard/SideNav";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ projectId: string }>;
}) {
  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row items-stretch gap-3 p-3 sm:p-4">
      <Suspense>
        <SideNav params={params} />
      </Suspense>

      <div className="w-full min-w-0 lg:w-[80%] lg:flex-1 lg:min-h-0 lg:overflow-auto">
        {children}
      </div>
    </div>
  );
}
