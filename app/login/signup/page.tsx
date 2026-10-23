import Logo from "@/app/ui/Logo";
import SignupForm from "@/app/ui/SignupForm";
import Link from "next/link";

export default function Page() {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center px-4 py-6">
      <Logo />

      <div className="w-full max-w-100 min-[400px]:w-[90%] sm:w-3/4 lg:w-1/2 xl:w-1/3 2xl:w-1/4">
        <SignupForm />

        <p className="mt-5 text-stone-500 font-semibold text-center text-sm">
          Do you have account?{" "}
          <Link className="text-teal-600 font-bold" href="/login">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
