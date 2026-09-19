import Link from "next/link";

export type Bread = {
  label: string;
  href: string;
  active?: boolean;
}[];

function Breadcrumbs({ options }: { options: Bread }) {
  return (
    <div>
      {options.map((option, index) => {
        const isDistance = index < options.length - 1;
        return (
          <span key={option.href}>
            <Link
              className={`text-2xl font-semibold text-teal-600 ${option.active ? "text-teal-700!" : ""}`}
              href={option.href}
            >
              {option.label}
            </Link>
            <span className="text-2xl text-teal-500">
              {isDistance ? "  /  " : ""}
            </span>
          </span>
        );
      })}
    </div>
  );
}

export default Breadcrumbs;
