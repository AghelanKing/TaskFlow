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
    <div className="w-full min-w-0">
      <div className="grid grid-cols-4 gap-1.5 lg:flex lg:flex-col lg:gap-y-3">
        {urls.map((url) => {
          const LinkIcon = url.icon;
          const isActive = pathname === url.href;

          return (
            <Link
              className={`min-w-0 flex flex-col sm:flex-row lg:flex-row items-center justify-center sm:justify-start gap-1 sm:gap-x-2 bg-teal-50 rounded-xl p-2 sm:p-3 font-semibold text-teal-700 hover:bg-teal-600 hover:text-teal-50 ${
                isActive ? "bg-teal-600 text-white" : ""
              }`}
              key={url.href}
              href={url.href}
            >
              <LinkIcon className="text-lg shrink-0" />
              <span className="text-xs sm:text-sm lg:text-base truncate">
                {url.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default NavLinks;
