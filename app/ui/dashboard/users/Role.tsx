type Role = "owner" | "member";

const roleStyle: Record<Role, string> = {
  owner: "text-[#ce03f6] bg-purple-200",
  member: "bg-emerald-200 text-emerald-600",
};

function Role({ role }: { role: Role }) {
  return (
    <span
      className={`py-1 px-2 font-semibold rounded-full ${roleStyle[role]} capitalize`}
    >
      {role}
    </span>
  );
}

export default Role;
