import { fetchUser } from "@/app/lib/data";
import CreateForm from "@/app/ui/dashboard/CreateForm";
import { auth } from "@/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Project",
};

export default async function Page() {
  const sesstion = await auth();
  const userEmail = sesstion?.user?.email;

  const user = await fetchUser(userEmail);

  return (
    <div className="p-4 min-[400px]:p-6 sm:p-10">
      <h1 className="text-3xl font-bold text-teal-600">Create Project</h1>

      <div className="bg-stone-50 p-3 min-[400px]:p-4 mt-6 rounded-2xl">
        <CreateForm ownerId={user?.at(0)?.id} />
      </div>
    </div>
  );
}
