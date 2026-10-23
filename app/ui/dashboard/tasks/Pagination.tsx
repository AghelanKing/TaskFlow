"use client";

import { generatePagination } from "@/app/lib/utils";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

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
    <div className="mt-5 flex w-full min-w-0 items-center justify-center">
      <div className="flex max-w-full min-w-0 items-center rounded-xl border border-teal-800 p-1">
        <ArrowPagination
          direction="left"
          href={createPageUrl(currentPage - 1)}
          isDisabeld={currentPage <= 1}
        />

        <div className="flex min-w-0 items-center">
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
        </div>

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

  const className = `flex min-w-0 items-center justify-center border border-teal-800 bg-teal-50 px-2.5 py-2 text-sm text-teal-800 hover:bg-teal-700 hover:text-teal-50 min-[400px]:px-3 sm:px-4 sm:py-2.5 sm:text-base ${first} ${last} ${middle} ${isActiveClassName}`;

  return page === "..." ? (
    <span className={className}>{page}</span>
  ) : (
    <Link
      className={className}
      href={href}
      aria-current={isActive ? "page" : undefined}
    >
      {page}
    </Link>
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

  const className = `flex shrink-0 items-center justify-center rounded-xl border border-teal-800 bg-teal-50 p-2.5 text-lg text-teal-700 hover:bg-teal-700 hover:text-teal-50 sm:p-3 sm:text-xl ${disabeld} ${
    direction === "left" ? "mr-1.5 sm:mr-2" : "ml-1.5 sm:ml-2"
  }`;

  return isDisabeld ? (
    <span className={className} aria-disabled="true">
      {icon}
    </span>
  ) : (
    <Link
      className={className}
      href={href}
      aria-label={direction === "left" ? "Previous page" : "Next page"}
    >
      {icon}
    </Link>
  );
}

export default Pagination;
