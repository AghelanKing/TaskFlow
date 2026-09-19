import { fetchUser } from "@/app/lib/data";
import GoToProjectForm from "@/app/ui/dashboard/GoToProjectForm";
import { auth } from "@/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Go To Project Page",
};

export default async function Page() {
  const sesstion = await auth();
  const userEmail = sesstion?.user?.email;

  const user = await fetchUser(userEmail);
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-teal-600">Go to Project</h1>
      <div className="bg-stone-50 p-4 mt-6 rounded-2xl">
        <GoToProjectForm userId={user?.at(0)?.id} />
      </div>
    </div>
  );
}
