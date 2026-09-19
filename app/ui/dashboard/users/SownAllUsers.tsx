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
  ownerId: string;
  isOwner: boolean;
  projectId: string;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  if (!allUsers) return;
  const totalPages = Math.ceil(allUsers?.length / ITEMS_PER_PAGE);

  const currentPage = Number(searchParams.get("page")) || 1;

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const users = allUsers.slice(startIndex, endIndex);

  const userAth = users?.filter((user) => user?.id === userId);

  return (
    <div className=" mt-1 w-full h-[80%] bg-white p-3 rounded-2xl">
      <div className="text-teal-900 font-bold flex items-center justify-between bg-[#f3f5f8] p-4 border border-teal-800 rounded-2xl text-lg">
        <div className="w-[25%] flex justify-center items-center">name</div>
        <div className="w-[25%] pr-7 flex justify-center items-center">
          email
        </div>
        <div className="w-[20%] flex justify-center items-center">role</div>
        <div className="w-[10%] flex justify-center items-center"></div>
      </div>
      <div className="flex mt-2 bg-[#f3f5f8] rounded-xl border border-teal-800 overflow-hidden">
        <ul
          className={`flex flex-col w-full divide-y divide-teal-800 ${!users.length ? "p-5 items-center" : ""}`}
        >
          {!users.length && (
            <p className="text-stone-500 font-semibold italic">No more item!</p>
          )}
          {users?.map((user) => {
            const isUser = user?.id === userAth[0]?.id;
            const role = user?.id === ownerId;
            return (
              <UsersItem
                key={user.id}
                user={user}
                pathnameEdit={`${pathname}/${user?.id}/edit`}
                role={role}
                isOwner={isOwner}
                isUser={isUser}
                projectId={projectId}
                ownerId={ownerId}
              />
            );
          })}
        </ul>
      </div>
      <div>
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
    <li className="flex items-center hover:bg-teal-100 p-4">
      <div className="w-[26%] ml-12 font-semibold text-teal-800">
        {user.name}
      </div>
      <div className="w-[25%] ml-22 text-sm">{user.email}</div>
      <div className="w-[20%] ml-25">
        <Role role={role ? "owner" : "member"} />
      </div>
      <div className="w-[10%] mr-3 flex items-center gap-x-2 pr-3">
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
    </li>
  );
}

export default SownAllUsers;
