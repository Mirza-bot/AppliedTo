import CustomInput from "../layout/CustomInput";
import { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import Switch from "react-switch";
import { useApplicationStore } from "../../../features/store/applications";

import { useNavigate } from "react-router-dom";
import useStatusStore from "../../../features/store/status";

function ApplicationEditForm() {
  const application = useApplicationStore((state) => state.activeApplication);
  const editApplication = useApplicationStore((state) => state.editApplication);
  const [favorite, setFavorite] = useState<boolean>(false);
  const [jobTitle, setJobTitle] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [jobDescription, setJobDescription] = useState<string>("");
  const [appliedOver, setAppliedOver] = useState<string>("");
  const [status, setStatus] = useState<string>("Applied");
  const [_id, setId] = useState<string>("");

  const { setSuccess, setMessage } = useStatusStore((state) => state);

  // Form Control
  const [companyError, setCompanyError] = useState<boolean>(false);
  const [titleError, setTitleError] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (application) {
      setFavorite(application.isFavorite as boolean);
      setCompanyName(application.companyName);
      setJobTitle(application.jobTitle);
      setJobDescription(application.jobDescription);
      setAppliedOver(application.appliedOver as string);
      setStatus(application.status as string);
      setId(application._id as string);
    }
  }, [application]);

  const handleSwitch = (checked: boolean) => {
    setFavorite(checked);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (companyName === "" && jobTitle === "") {
      setCompanyError(true);
      setTitleError(true);
      return;
    } else if (companyName === "") {
      setCompanyError(true);
      return;
    } else if (jobTitle === "") {
      setTitleError(true);
      return;
    }
    setCompanyError(false);
    setTitleError(false);
    const updatedApplication = {
      _id,
      jobTitle,
      companyName,
      jobDescription,
      appliedOver,
      favorite,
      status,
    };
    editApplication(updatedApplication);
    setSuccess();
    setMessage("Application edited");
    if (window.innerWidth < 1024) {
      navigate(-1);
    }
  };

  return (
    <div className="pt-3 dark:text-lightgrey">
      <form
        className="mx-auto flex flex-col gap-3"
        onSubmit={(event) => {
          handleSubmit(event);
        }}
      >
        <div className="flex flex-row justify-between w-full">
          <div
            className="bg-white dark:bg-darkSecondary p-2 rounded-md"
            tabIndex={1}
          >
            <label htmlFor="favorite_check" className="flex flex-row">
              <span className="text-3xl text-yellow font-medium drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                <AiFillStar />
              </span>
              <Switch
                className="ml-1 mt-0.5 align-top"
                name="favorite_check"
                id="favorite_check"
                type="checkbox"
                onChange={(value) => {
                  handleSwitch(value);
                }}
                checked={favorite}
                tabIndex={2}
              />
            </label>
          </div>
          <div
            className="bg-white dark:bg-darkSecondary p-2 rounded-md"
            tabIndex={3}
          >
            <label htmlFor="status">Status:</label>
            <select
              onChange={handleStatusChange}
              value={status}
              className="ml-3 dark:bg-darkPrimary"
              name="status"
              id="status"
              tabIndex={4}
            >
              <option value="Applied">Applied</option>
              <option value="Interviewing">Interviewing</option>
              <option value="Ghosted">Ghosted</option>
              <option value="Rejected">Rejected</option>
              <option value="Archived">Archived</option>
              <option value="Accepted">Accepted</option>
            </select>
          </div>
        </div>
        <div className="mt-2">
          <CustomInput
            label="Company Name*"
            id="company_name"
            type="text"
            inputClass="p-0.5"
            value={companyName}
            event={setCompanyName}
            labelClass={companyError ? "text-red" : ""}
            tabIndex={5}
          />
          {companyError && (
            <span className="text-red text-sm ml-1" tabIndex={-1}>
              Please provide the company name.
            </span>
          )}
        </div>
        <div>
          <CustomInput
            label="Job/Position*"
            id="position"
            type="text"
            inputClass="p-0.5"
            value={jobTitle}
            event={setJobTitle}
            labelClass={titleError ? "text-red" : ""}
            tabIndex={6}
          />
          {titleError && (
            <span className="text-red text-sm ml-1" tabIndex={-1}>
              Please provide the job/position title.
            </span>
          )}
        </div>
        <CustomInput
          label="Description*"
          id="description"
          type="textarea"
          textareaClass="border-2 border-grey p-0.5"
          textarea={true}
          value={jobDescription}
          event={setJobDescription}
          tabIndex={7}
        />
        <CustomInput
          label="Applied over"
          id="appliedOver"
          type="textarea"
          textareaClass="border-2 border-grey p-0.5"
          value={appliedOver}
          event={setAppliedOver}
          tabIndex={8}
        />

        <button
          type="submit"
          className="bg-secondary dark:text-primary dark:bg-darkSecondary dark:active:bg-darkAccent dark:active:text-darkSecondary text-black text-xl font-medium w-9/12 h-12 rounded-md mx-auto my-10 block  active:bg-accent active:text-secondary transition-colors  select-none"
          tabIndex={9}
        >
          Save
        </button>
      </form>
    </div>
  );
}
export default ApplicationEditForm;
