import Logo from "@/app/ui/Logo";
import SignupForm from "@/app/ui/SignupForm";
import Link from "next/link";

export default function Page() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <Logo />
      <div className="w-1/4">
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
