import { useState } from "react";
import { useAuthStore } from "../../features/store/auth";
import CustomInput from "../components/layout/CustomInput";
import { useNavigate } from "react-router-dom";
function UserDataPage() {
  const { name, email, setUserData } = useAuthStore((state) => state);
  const [userName, setUserName] = useState<string>("");
  const [userMail, setUserMail] = useState<string>("");
  const [nameError, setNameError] = useState(false);

  const navigate = useNavigate();

  const editUserData = () => {
    setUserData(userMail, userName);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setNameError(false);
    if (userName.length < 5) {
      setNameError(true);
      return;
    } else {
      setNameError(false);
      editUserData();
      navigate("/settings");
    }
  };

  return (
    <div className="px-3">
      <h1 className="text-2xl font-medium dark:text-lightgrey py-4 pl-3 ">
        Edit Userdata
      </h1>
      <form
        className="px-6 py-5 bg-white dark:bg-darkSecondary dark:text-lightgrey  flex flex-col gap-2  items-center justify-between"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <CustomInput
          label="E-Mail"
          type="email"
          id="emailInput"
          event={setUserMail}
          placeholder={email ? ` ${email}` : ""}
        />
        <CustomInput
          label="Name"
          type="text"
          id="userNameInput"
          event={setUserName}
          placeholder={name ? ` ${name}` : ""}
        />
        {nameError && (
          <span className="text-red text-sm">
            Username must contain at least 5 characters.
          </span>
        )}
        <button
          type="submit"
          className="bg-primary dark:text-primary dark:bg-darkPrimary dark:active:bg-darkAccent dark:active:text-darkSecondary text-white text-xl font-medium w-9/12 h-14 rounded-md mx-auto my-20 block  active:bg-accent active:text-secondary transition-colors  select-none"
        >
          Save
        </button>
      </form>
    </div>
  );
}
export default UserDataPage;
