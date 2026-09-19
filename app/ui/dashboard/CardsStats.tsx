import { HiOutlineUsers } from "react-icons/hi2";
import { GrTasks } from "react-icons/gr";
import { TbProgressCheck } from "react-icons/tb";
import { TbCalendarDue } from "react-icons/tb";
import { IconType } from "react-icons";

type Value = {
  totalUsers: number;
  totalTasks: number;
  complateRate: number;
  overdueTask: number;
};

export default function CardsStats({
  cardsValue,
}: {
  cardsValue: Value | undefined;
}) {
  return (
    <div className="mt-7 bg-stone-50 w-full flex items-center justify-between h-[30%] rounded-2xl">
      <CardStats
        label="Total users"
        value={cardsValue?.totalUsers}
        color="users"
      />
      <CardStats
        label="Total tasks"
        value={cardsValue?.totalTasks}
        color="tasks"
      />
      <CardStats
        label="Percentage of progress"
        value={`${cardsValue?.complateRate}%`}
        color="complateRate"
      />
      <CardStats
        label="Overdue tasks"
        value={cardsValue?.overdueTask}
        color="overdue"
      />
    </div>
  );
}

const colors = {
  users: "text-teal-700 bg-teal-300",
  tasks: "text-red-700 bg-red-300",
  complateRate: "text-blue-600 bg-blue-300",
  overdue: "text-orange-700 bg-orange-300",
};

const colorsSpan = {
  users: "bg-teal-50",
  tasks: "bg-red-50",
  complateRate: "bg-blue-50",
  overdue: "bg-orange-50",
};

const icons: Record<CardColor, IconType> = {
  users: HiOutlineUsers,
  tasks: GrTasks,
  complateRate: TbProgressCheck,
  overdue: TbCalendarDue,
};

type CardColor = keyof typeof colors; // 👈 اضافه شد

function CardStats({
  label,
  value,
  color,
}: {
  label: string;
  value?: string | number;
  color: CardColor;
}) {
  const Icon = icons[color];

  return (
    <div className={`h-[90%] w-1/4 mx-2 p-2 rounded-lg ${colors[color]}`}>
      <h4 className="font-semibold flex items-center gap-x-2">
        <Icon className={`text-3xl p-1 rounded-lg ${colorsSpan[color]}`} />
        {label}
      </h4>
      <span
        className={`mt-2 w-full h-[76%] flex items-center justify-center rounded-lg font-semibold text-2xl ${colorsSpan[color]}`}
      >
        {value}
      </span>
    </div>
  );
}
