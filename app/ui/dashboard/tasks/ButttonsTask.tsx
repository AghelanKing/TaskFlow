import Link from "next/link";

type Button = {
  children: React.ReactNode;
  disabeld?: boolean;
  AddClass?: string;
  deleteTask?: boolean;
  onClick?: () => void;
  href?: string;
};

function ButttonsTask({
  children,
  disabeld,
  AddClass,
  deleteTask,
  onClick,
  href,
}: Button) {
  const deleteStyle = deleteTask
    ? "text-red-700! border-red-700! hover:bg-red-700! hover:text-red-50!"
    : "";

  const className = `bg-teal-50 p-2 text-xl border border-teal-900 rounded-xl text-teal-900 hover:bg-teal-600 hover:text-teal-50 ${deleteStyle} ${AddClass}`;
  return href ? (
    <Link className={className} href={href}>
      {children}
    </Link>
  ) : (
    <button className={className} disabled={disabeld} onClick={onClick}>
      {children}
    </button>
  );
}

export default ButttonsTask;
