"use client";
import Link from "next/link";

function Button({
  href,
  children,
  AddClass,
  disabeld,
  button,
  onClick,
}: {
  href?: string;
  children: React.ReactNode;
  AddClass?: string;
  disabeld?: boolean;
  button?: boolean;
  onClick?: () => void;
}) {
  const className = `py-3 px-4 text-lg mr-4 bg-teal-600 text-stone-50 rounded-xl hover:bg-teal-800 ${AddClass} ${disabeld ? "cursor-not-allowed!" : ""}`;
  return (
    <>
      {!button ? (
        <Link className={className} href={href as string}>
          {children}
        </Link>
      ) : (
        <button
          onClick={onClick}
          className={className}
          disabled={disabeld}
          type="submit"
        >
          {children}
        </button>
      )}
    </>
  );
}

// !button ? <Link
//       className={`py-3 px-4 text-lg mr-4 bg-teal-600 text-stone-50 rounded-xl hover:bg-teal-800 ${AddClass}`}
//       href={href}
//       aria-disabled={disabeld}
//     >
//       {children}
//     </Link> : <button></button>

export default Button;
