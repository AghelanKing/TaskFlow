import { Suspense } from "react";
import SideNav from "../../ui/dashboard/SideNav";

export default async function layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ projectId: string }>;
}) {
  return (
    <div className="w-full h-full flex items-center py-4">
      <Suspense>
        <SideNav params={params} />
      </Suspense>
      <div className="w-[80%] h-full  overflow-auto">{children}</div>
    </div>
  );
}
