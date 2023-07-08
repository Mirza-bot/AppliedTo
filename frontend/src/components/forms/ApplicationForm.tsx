import CustomInput from "../layout/CustomInput";
import { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import Switch from "react-switch";

function ApplicationForm() {
  const [favorite, setFavorite] = useState<boolean>(false);

  const handleChange = (checked: boolean) => {
    setFavorite(checked);
  };

  return (
    <div className="pt-3">
      <form className=" mx-auto flex flex-col gap-3">
        <CustomInput
          label="Company Name*"
          id="company_name"
          type="text"
          inputClass="p-0.5"
        />
        <CustomInput
          label="Job/Position*"
          id="position"
          type="text"
          inputClass=" p-0.5"
        />
        <CustomInput
          label="Description"
          id="description"
          type="textarea"
          textareaClass="border-2 border-grey p-0.5"
          textarea={true}
        />
        <CustomInput
          label="Applied over"
          id="description"
          type="textarea"
          textareaClass="border-2 border-grey p-0.5"
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
              onChange={(e) => {
                handleChange(e);
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
