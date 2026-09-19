import Link from "next/link";
import Navbar from "./ui/Navbar";
import Image from "next/image";

export default async function Home() {
  return (
    <main className="h-full">
      <Navbar />
      <header className="flex py-4 px-10 items-center h-[85%] gap-x-5">
        <div className="w-[43%] p-8 relative h-full flex flex-col justify-center bg-stone-100 rounded-xl">
          <h1 className="text-[50px] text-teal-800 font-bold capitalize">
            taskFlow app
          </h1>
          <p className="my-7 pb-12 font-lg text-stone-600 font-semibold">
            A collaborative task management platform built for companies and
            teams. It helps teams organize tasks, assign responsibilities, set
            deadlines, and track progress in one simple workspace.
          </p>
          <Link
            className="p-4 mr-4 bg-teal-700 text-stone-50 translate-0 rounded-xl z-10 absolute top-[60%] left-7 hover:top-[60.5%]"
            href="/login"
          >
            Start for free
          </Link>
          <div className="absolute bg-teal-400 rounded-xl top-[62%] left-7 w-33.75 h-13"></div>
        </div>
        <div className="w-[50%]">
          <Image
            src="/TaskFlow.png"
            alt="opengraph-image"
            width={1000}
            height={800}
            className="w-300! h-100"
            preload
          />
        </div>
      </header>
    </main>
  );
}
