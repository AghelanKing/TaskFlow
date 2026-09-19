import Image from "next/image";
import Link from "next/link";

function Logo() {
  return (
    <Link href="/" className="flex gap-x-1 items-center p-2">
      <Image src="/Logo.png" alt="Logo of taskFlow" width={80} height={60} />
      <h3 className="text-2xl text-teal-700 font-bold">taskFlow</h3>
    </Link>
  );
}

export default Logo;
