"use client";

import Link from "next/link";
import { HiOutlineHome } from "react-icons/hi";
import { FaTasks } from "react-icons/fa";
import { LuUserRoundCog } from "react-icons/lu";
import { HiOutlineUsers } from "react-icons/hi2";
import { usePathname } from "next/navigation";
function NavLinks({ projectId }: { projectId?: string | null }) {
  const pathname = usePathname();
  const urls = [
    {
      label: "Home",
      href: `/dashboard/${projectId || "no_project"}`,
      icon: HiOutlineHome,
    },
    {
      label: "Tasks",
      href: `/dashboard/${projectId || "no_project"}/tasks`,
      icon: FaTasks,
    },
    {
      label: "Owner",
      href: `/dashboard/${projectId || "no_project"}/owner`,
      icon: LuUserRoundCog,
    },
    {
      label: "Users",
      href: `/dashboard/${projectId || "no_project"}/users`,
      icon: HiOutlineUsers,
    },
  ];
  return (
    <div>
      <div className="flex flex-col gap-y-3">
        {urls.map((url) => {
          const LinkIcon = url.icon;
          return (
            <Link
              className={`flex items-center gap-x-1 bg-teal-50 rounded-xl p-3 font-semibold text-teal-700 hover:bg-teal-600 hover:text-teal-50 ${pathname === url.href ? "bg-teal-600 text-white" : ""}`}
              key={url.href}
              href={url.href}
            >
              <LinkIcon className="text-lg font-semibold" />
              {url.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default NavLinks;
