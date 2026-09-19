"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { LuSearch } from "react-icons/lu";
import { useDebouncedCallback } from "use-debounce";

function Search({
  placeholder,
  width,
}: {
  placeholder?: string;
  width: string;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");

    if (term) params.set("query", term);
    else params.delete("query");

    replace(`${pathname}?${params.toString()}`);
  }, 500);
  return (
    <div className={`relative ${width}`}>
      <LuSearch className="absolute top-[52%] left-1.5 text-xl font-bold text-teal-800" />
      <input
        type="text"
        placeholder={placeholder}
        defaultValue={searchParams.get("query") || ""}
        onChange={(e) => handleSearch(e.target.value)}
        className="bg-white py-3 px-8 rounded-xl w-full mt-6 text-teal-800 font-semibold"
      />
    </div>
  );
}

export default Search;
