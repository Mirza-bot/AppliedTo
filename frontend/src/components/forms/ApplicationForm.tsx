import CustomInput from "../layout/CustomInput";
import { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import Switch from "react-switch";
import { useApplicationStore } from "../../../features/store/applications";

function ApplicationForm() {
  const saveApplication = useApplicationStore().saveApplication;
  const [favorite, setFavorite] = useState<boolean>(false);
  const [jobTitle, setJobTitle] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [appliedOver, setAppliedOver] = useState<string>("");

  // Form Control
  const [companyError, setCompanyError] = useState<boolean>(false);
  const [titleError, setTitleError] = useState<boolean>(false);

  const handleSwitch = (checked: boolean) => {
    setFavorite(checked);
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
    saveApplication(jobTitle, companyName, description, appliedOver, favorite);
  };

  return (
    <div className="pt-3">
      <form
        className=" mx-auto flex flex-col gap-3"
        onSubmit={(event) => {
          handleSubmit(event);
        }}
      >
        <div>
          <CustomInput
            label="Company Name*"
            id="company_name"
            type="text"
            inputClass="p-0.5"
            event={setCompanyName}
            labelClass={companyError ? "text-red" : ""}
          />
          {companyError && (
            <span className="text-red text-sm ml-1">
              Please provide the company name.
            </span>
          )}
        </div>
        <div>
          <CustomInput
            label="Job/Position*"
            id="position"
            type="text"
            inputClass=" p-0.5"
            event={setJobTitle}
            labelClass={titleError ? "text-red" : ""}
          />
          {titleError && (
            <span className="text-red text-sm ml-1">
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
          event={setDescription}
        />
        <CustomInput
          label="Applied over"
          id="description"
          type="textarea"
          textareaClass="border-2 border-grey p-0.5"
          event={setAppliedOver}
        />
        <div className="bg-white p-2 rounded-md  absolute right-5 top-36">
          <label htmlFor="favotite_check" className="flex flex-row">
            <span className="text-3xl text-yellow font-medium drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
              <AiFillStar />
            </span>
            <Switch
              className="ml-1 mt-0.5 align-top"
              name="favotite_check"
              type="checkbox"
              onChange={(value) => {
                handleSwitch(value);
              }}
              checked={favorite}
            />
          </label>
        </div>
        <button
          type="submit"
          className="bg-secondary text-black text-xl font-medium w-9/12 h-12 rounded-md mx-auto my-10 block  active:bg-accent active:text-secondary transition-colors  select-none"
        >
          Save
        </button>
      </form>
    </div>
  );
}
export default ApplicationForm;
