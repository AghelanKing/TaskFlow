import Button from "../Button";

function NoProject() {
  return (
    <div className="w-full h-[75%] flex flex-col justify-center items-center">
      <h1>
        Do you want to{" "}
        <span className="text-lg font-semibold mx-2">create a project?</span>
      </h1>
      <Button AddClass="mt-5 px-5" href="/dashboard/create">
        Crate project
      </Button>
      <span className="mt-2">or</span>
      <h1>
        Do you want to join{" "}
        <span className="text-lg font-semibold mx-2">
          someone {`else's`} project
        </span>{" "}
        or a{" "}
        <span className="text-lg font-semibold mx-2">
          project you created yourself?
        </span>
      </h1>
      <Button AddClass="mt-5 px-5" href="/dashboard/go-to-project">
        Go to project
      </Button>
    </div>
  );
}

export default NoProject;
