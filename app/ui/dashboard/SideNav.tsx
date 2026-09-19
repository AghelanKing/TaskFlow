import Logo from "../Logo";
import NavLinks from "./NavLinks";

import SignOutButton from "./SignOutButton";

import { Suspense } from "react";

async function SideNav({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;
  return (
    <div className="w-[20%] h-[98%] bg-stone-200 rounded-2xl ml-3">
      <div className="w-full flex justify-between">
        <Logo />
      </div>
      <nav className="flex flex-col justify-between py-2 px-1.5 h-[86.5%]">
        <Suspense fallback={<p>Loading Nav...</p>}>
          <NavLinks projectId={projectId} />
        </Suspense>
        <SignOutButton />
      </nav>
    </div>
  );
}

export default SideNav;
