import ApplicationForm from "../components/forms/ApplicationForm";

function ApplicationEditor() {
  return (
    <div className="select-none">
      <h1 className="text-2xl mt-7 ml-5 font-medium ">
        Create a new Application
      </h1>
      <div className="mt-16 mx-5">
        <ApplicationForm />
      </div>
    </div>
  );
}
export default ApplicationEditor;
