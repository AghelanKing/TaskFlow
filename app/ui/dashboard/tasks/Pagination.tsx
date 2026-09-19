"use client";
import { generatePagination } from "@/app/lib/utils";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";

function Pagination({ totalPage }: { totalPage: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  function createPageUrl(pageNumber: string | number) {
    const params = new URLSearchParams(searchParams);

    if (pageNumber) params.set("page", pageNumber.toString());
    else params.set("page", "1");
    return `${pathname}?${params.toString()}`;
  }

  const allPages = generatePagination(currentPage, totalPage);
  return (
    <div className="flex items-center justify-center mt-5">
      <div className="border-teal-800 p-1 border flex items-center rounded-xl">
        <ArrowPagination
          direction="left"
          href={createPageUrl(currentPage - 1)}
          isDisabeld={currentPage <= 1}
        />

        {allPages.map((page, index) => {
          let position: "first" | "last" | "single" | "middle" | undefined;

          if (index === 0) position = "first";
          if (index === allPages.length - 1) position = "last";
          if (allPages.length === 1) position = "single";
          if (page === "...") position = "middle";

          return (
            <PaginationNumber
              key={`${page}-${index}`}
              position={position}
              href={createPageUrl(page)}
              page={page}
              isActive={currentPage === page}
            />
          );
        })}

        <ArrowPagination
          direction="right"
          href={createPageUrl(currentPage + 1)}
          isDisabeld={currentPage >= totalPage}
        />
      </div>
    </div>
  );
}
function PaginationNumber({
  position,
  href,
  page,
  isActive,
}: {
  position: string | undefined;
  href: string;
  page: string | number;
  isActive: boolean;
}) {
  const first =
    position === "first" || position === "single" ? "rounded-l-xl" : "";

  const last =
    position === "last" || position === "single" ? "rounded-r-xl" : "";

  const middle = position === "middle" ? "text-stone-400" : "";
  const isActiveClassName = isActive ? "bg-teal-800 text-white" : "";

  const className = `py-2.5 px-4 hover:bg-teal-700 hover:text-teal-50 bg-teal-50 text-teal-800 border border-teal-800 ${first} ${last} ${middle} ${isActiveClassName}`;
  return (
    <>
      {page === "..." ? (
        <span className={className}>{page}</span>
      ) : (
        <Link className={className} href={href}>
          {page}
        </Link>
      )}
    </>
  );
}

function ArrowPagination({
  direction,
  href,
  isDisabeld,
}: {
  direction: string;
  href: string;
  isDisabeld: boolean;
}) {
  const icon =
    direction === "left" ? <FaArrowLeftLong /> : <FaArrowRightLong />;

  const disabeld = isDisabeld
    ? "text-stone-400! border-stone-400! bg-white! cursor-not-allowed"
    : "";

  const className = `bg-teal-50 text-teal-700 hover:bg-teal-700 hover:text-teal-50 border border-teal-800 rounded-xl p-3 text-xl ${disabeld} ${direction === "left" ? "mr-2" : "ml-2"}`;

  return isDisabeld ? (
    <span className={className}>{icon}</span>
  ) : (
    <Link className={className} href={href}>
      {icon}
    </Link>
  );
}

export default Pagination;
