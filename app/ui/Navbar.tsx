import Logo from "./Logo";
import Button from "./Button";

function Navbar() {
  return (
    <nav className="w-full mt-3 flex items-center justify-between px-13 h-[10%]">
      <Logo />
      <Button href="/login/signup">Start for free</Button>
    </nav>
  );
}

export default Navbar;
