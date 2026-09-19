import { ClimbingBoxLoader } from "react-spinners";

function Loading() {
  return (
    <div className="w-full h-full flex items-center justify-center gap-x-3">
      <ClimbingBoxLoader color="oklch(51.1% 0.096 186.391)" size={23} />
      <h4 className="text-teal-700 text-xl font-semibold">Loading...</h4>
    </div>
  );
}

export default Loading;
