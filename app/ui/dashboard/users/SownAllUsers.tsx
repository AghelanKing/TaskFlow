"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Pagination from "../tasks/Pagination";
import Role from "./Role";
import ButttonsTask from "../tasks/ButttonsTask";
import { HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";
import { User } from "@/app/lib/definitions";
import { deleteUser } from "@/app/dashboard/[projectId]/users/action";

const ITEMS_PER_PAGE = 4;

function SownAllUsers({
  allUsers,
  userId,
  ownerId,
  isOwner,
  projectId,
}: {
  allUsers: User[];
  userId: string | undefined;
  ownerId?: string;
  isOwner: boolean;
  projectId: string;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const totalPages = Math.ceil((allUsers?.length ?? 0) / ITEMS_PER_PAGE);
  const currentPage = Number(searchParams.get("page")) || 1;

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const users = allUsers?.slice(startIndex, endIndex) ?? [];

  return (
    <div className="mt-1 w-full min-w-0 bg-white p-2 sm:p-3 rounded-2xl">
      {/* Desktop table header */}
      <div className="hidden lg:flex items-center justify-between bg-[#f3f5f8] p-4 border border-teal-800 rounded-2xl text-lg text-teal-900 font-bold">
        <div className="w-[25%] ml-3">name</div>

        <div className="w-[25%] ml-3">email</div>

        <div className="w-[20%] ml-3">role</div>

        <div className="w-[10%] ml-3" />
      </div>

      <div className="mt-2 bg-[#f3f5f8] rounded-xl border border-teal-800 overflow-hidden">
        {!users.length ? (
          <div className="p-5 text-center text-stone-500 font-semibold italic">
            No more item!
          </div>
        ) : (
          <ul className="flex flex-col divide-y divide-teal-800">
            {users.map((user) => {
              const isUser = user.id === userId;
              const role = user.id === ownerId;

              return (
                <UsersItem
                  key={user.id}
                  user={user}
                  pathnameEdit={`${pathname}/${user.id}/edit`}
                  role={role}
                  isOwner={isOwner}
                  isUser={isUser}
                  projectId={projectId}
                  ownerId={ownerId as string}
                />
              );
            })}
          </ul>
        )}
      </div>

      <div className="overflow-x-auto">
        <Pagination totalPage={totalPages} />
      </div>
    </div>
  );
}

function UsersItem({
  user,
  pathnameEdit,
  isOwner,
  role,
  isUser,
  projectId,
  ownerId,
}: {
  user: User;
  pathnameEdit?: string;
  isOwner: boolean;
  role: boolean;
  isUser: boolean;
  projectId: string;
  ownerId: string;
}) {
  return (
    <li className="min-w-0 hover:bg-teal-100">
      {/* Mobile / tablet card */}
      <div className="flex lg:hidden flex-col gap-3 p-3 min-[400px]:p-4">
        <div className="min-w-0">
          <p className="text-xs text-stone-500 mb-1">Name</p>
          <p className="font-semibold text-teal-800 wrap-break-word">
            {user.name}
          </p>
        </div>

        <div className="min-w-0">
          <p className="text-xs text-stone-500 mb-1">Email</p>
          <p className="text-sm wrap-break-word">{user.email}</p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs text-stone-500 mb-1">Role</p>
            <Role role={role ? "owner" : "member"} />
          </div>

          <div className="flex shrink-0 items-center gap-2">
            {isUser && (
              <ButttonsTask href={pathnameEdit}>
                <HiOutlinePencilSquare />
              </ButttonsTask>
            )}

            {isOwner && (
              <ButttonsTask
                onClick={() => deleteUser(projectId, user.id, isOwner, ownerId)}
                deleteTask={true}
              >
                <HiOutlineTrash />
              </ButttonsTask>
            )}
          </div>
        </div>
      </div>

      {/* Desktop table row */}
      <div className="hidden lg:flex items-center p-4">
        <div className="w-[25%] min-w-0 px-2 font-semibold text-teal-800 wrap-break-word ml-3">
          {user.name}
        </div>

        <div className="w-[25%] min-w-0 px-2 text-sm wrap-break-word ml-3">
          {user.email}
        </div>

        <div className="w-[20%] min-w-0 flex justify-center ml-8">
          <Role role={role ? "owner" : "member"} />
        </div>

        <div className="w-[10%] ml-auto flex items-center justify-center gap-2">
          {isUser && (
            <ButttonsTask href={pathnameEdit}>
              <HiOutlinePencilSquare />
            </ButttonsTask>
          )}

          {isOwner && (
            <ButttonsTask
              onClick={() => deleteUser(projectId, user.id, isOwner, ownerId)}
              deleteTask={true}
            >
              <HiOutlineTrash />
            </ButttonsTask>
          )}
        </div>
      </div>
    </li>
  );
}

export default SownAllUsers;
