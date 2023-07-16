import { useAuthStore } from "../../features/store/auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import SettingsTile from "../components/layout/SettingsTile";
// import DropdownMenu from "../components/layout/DropdownMenu";
// import { BsGlobeAmericas } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";
import { BiExit, BiArchiveIn } from "react-icons/bi";
import { MdDarkMode } from "react-icons/md";
import Switch from "react-switch";
import useSettingsStore from "../../features/store/settings";

function Settings() {
  const user = useAuthStore((state) => state);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user._id) {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // SETTINGS STORE
  const settings = useSettingsStore((state) => state);

  //   const switchLanguage = (language: string) => {
  //     settings.setLanguage(language);
  //     settings.saveSettings();
  //   };

  const switchDarkMode = (value: boolean) => {
    settings.setDarkMode(value);
    settings.saveSettings();
  };

  return (
    <div>
      <div className="bg-secondary dark:bg-darkSecondary dark:text-secondary p-1 flex gap-3">
        <span className="text-7xl">
          <FaUserCircle />
        </span>
        <div>
          <h1 className="text-lg font-medium">{user.name}</h1>
          <h2>{user.email}</h2>
        </div>
      </div>
      <div className="bg-grey text-darkgrey dark:bg-darkPrimary dark:text-grey font-semibold text-sm pl-3 ">
        PROFILE
      </div>
      <div className="flex gap-1 flex-col">
        <SettingsTile
          icon={<AiOutlineUser />}
          name={"Edit user data"}
          route={"userData"}
        />
        <SettingsTile
          icon={<BiArchiveIn />}
          name={"Archive"}
          route={"archive"}
        />
      </div>
      <div className="bg-grey text-darkgrey dark:bg-darkPrimary dark:text-grey font-semibold text-sm pl-3 ">
        PREFERENCES
      </div>
      <div className="flex flex-col gap-1">
        {/* <div className="flex flex-col">
          <DropdownMenu
            icon={<BsGlobeAmericas />}
            name={"Language"}
            options={["English", "German"]}
            event={switchLanguage}
          />
        </div> */}
        <div>
          <div className="px-6 py-5 bg-white dark:bg-darkSecondary dark:text-lightgrey flex font-bold items-center justify-between cursor-pointer">
            <div className="flex w-full">
              <span className="text-2xl mr-4">
                <MdDarkMode />
              </span>
              Dark mode
            </div>
            <Switch
              className="ml-1 mt-0.5 align-top"
              name="darkMode"
              type="checkbox"
              onChange={(value) => {
                switchDarkMode(value);
              }}
              checked={settings.darkMode}
            />
          </div>
        </div>
      </div>
      <button
        onClick={() => user.logout()}
        className="flex text-red dark:text-darkRed bg-white dark:bg-darkgrey font-bold p-5 text-center justify-center w-full mt-1"
      >
        <span className="text-2xl mr-2">
          <BiExit />
        </span>
        Logout
      </button>
    </div>
  );
}
export default Settings;
