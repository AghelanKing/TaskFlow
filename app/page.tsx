import Link from "next/link";
import Navbar from "./ui/Navbar";
import Image from "next/image";

export default async function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <header className="flex flex-col lg:flex-row py-4 px-4 min-[400px]:px-6 lg:px-10 items-center gap-6 lg:gap-x-5 lg:h-[85%]">
        <div className="w-full lg:w-[43%] p-5 min-[400px]:p-8 relative min-h-100 lg:h-full flex flex-col justify-center bg-stone-100 rounded-xl">
          <h1 className="text-4xl min-[400px]:text-[50px] text-teal-800 font-bold capitalize wrap-break-words">
            taskFlow app
          </h1>

          <p className="my-7 pb-12 font-lg text-stone-600 font-semibold">
            A collaborative task management platform built for companies and
            teams. It helps teams organize tasks, assign responsibilities, set
            deadlines, and track progress in one simple workspace.
          </p>

          <Link
            className="p-4 mr-4 bg-teal-700 text-stone-50 translate-0 rounded-xl z-10 absolute top-[60%] left-5 min-[400px]:left-7 hover:top-[60.5%]"
            href="/login"
          >
            Start for free
          </Link>

          <div className="absolute bg-teal-400 rounded-xl top-[62%] left-5 min-[400px]:left-7 w-33.75 h-13"></div>
        </div>

        <div className="w-full lg:w-[50%] min-w-0">
          <Image
            src="/TaskFlow.png"
            alt="opengraph-image"
            width={1000}
            height={800}
            className="w-full h-auto object-contain"
            preload
            sizes="(max-width: 1023px) 100vw, 50vw"
          />
        </div>
      </header>
    </main>
  );
}
