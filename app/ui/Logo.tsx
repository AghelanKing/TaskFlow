import Image from "next/image";
import Link from "next/link";

function Logo() {
  return (
    <Link href="/" className="flex gap-x-1 items-center p-1 sm:p-2 shrink-0">
      <Image
        src="/Logo.png"
        alt="Logo of taskFlow"
        width={80}
        height={60}
        className="w-12 h-auto sm:w-16 lg:w-20"
        priority
      />
      <h3 className="text-xl sm:text-2xl text-teal-700 font-bold">taskFlow</h3>
    </Link>
  );
}

export default Logo;
