import Logo from "../Logo";
import NavLinks from "./NavLinks";
import SignOutButton from "./SignOutButton";
import { Suspense } from "react";

async function SideNav({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;

  return (
    <aside className="w-full lg:w-[20%] lg:min-w-48 lg:max-w-72 lg:shrink-0 lg:min-h-[calc(100vh-2rem)] bg-stone-200 rounded-2xl p-2 sm:p-3 lg:ml-0">
      <div className="hidden lg:flex w-full justify-between">
        <Logo />
      </div>

      <nav className="flex flex-col lg:justify-between gap-3 lg:gap-0 lg:min-h-[calc(100vh-7rem)]">
        <Suspense fallback={<p>Loading Nav...</p>}>
          <NavLinks projectId={projectId} />
        </Suspense>

        <div className="flex justify-end lg:justify-start">
          <SignOutButton />
        </div>
      </nav>
    </aside>
  );
}

export default SideNav;
