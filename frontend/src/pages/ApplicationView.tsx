import { useApplicationStore } from "../../features/store/applications";

function ApplicationView() {
  const application = useApplicationStore((state) => state.activeApplication);

  return (
    <div className="p-5 mt-1">
      <div className="flex justify-between">
        <h1 className="text-2xl  font-medium ">{application?.jobTitle}</h1>
        <div className="flex flex-col text-right">
          <span className="text-sm">24.02.2023</span>
          <span>Star</span>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold">{application?.companyName}</h1>
        <span className="mt-2 font-medium">Description</span>
        <p>{application?.jobDescription}</p>
      </div>
    </div>
  );
}
export default ApplicationView;
