import Logo from "@/app/ui/Logo";
import Link from "next/link";
import LoginForm from "../ui/loginForm";

export default function Page() {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center px-4 py-6">
      <Logo />

      <div className="w-full max-w-100 min-[400px]:w-[90%] sm:w-3/4 lg:w-1/2 xl:w-1/3 2xl:w-1/4">
        <LoginForm />

        <p className="mt-5 text-stone-500 font-semibold text-center text-sm">
          Do you no have a account?{" "}
          <Link className="text-teal-600 font-bold" href="/login/signup">
            signup
          </Link>
        </p>
      </div>
    </div>
  );
}
