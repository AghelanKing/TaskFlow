import Logo from "@/app/ui/Logo";
import Link from "next/link";
import LoginForm from "../ui/loginForm";

export default function Page() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <Logo />
      <div className="w-1/4">
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
