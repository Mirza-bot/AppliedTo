import { useLocation, useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";
import { useEffect, useState } from "react";
import {
  AiOutlineUnorderedList,
  AiOutlineFileAdd,
  AiOutlineSearch,
} from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import { BiArrowBack, BiSortDown } from "react-icons/bi";
import IconButton from "./IconButton";
import { useAuthStore } from "../../../features/store/auth";
import { useApplicationStore } from "../../../features/store/applications";
import SortMenuModal from "../SortMenuModal";
import SearchModal from "../SearchModal";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentRoute = location.pathname;
  const [navButtons, setNavButtons] = useState<string>("none");
  const authorized = useAuthStore((state) => state._id);

  const { searchApplication, setSortByValue } = useApplicationStore(
    (state) => state
  );

  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const [searchMenuOpen, setSearchMenuOpen] = useState(false);

  const redirect = (location: string) => {
    navigate(location);
  };

  useEffect(() => {
    if (currentRoute === "/applicationList" || currentRoute === "/settings") {
      setNavButtons("list");
    } else if (
      currentRoute === "/application/new" ||
      currentRoute === "/application/edit" ||
      currentRoute === "/application" ||
      currentRoute === "/settings/archive" ||
      currentRoute === "/settings/userData"
    ) {
      setNavButtons("application");
    } else {
      setNavButtons("none");
    }
  }, [currentRoute]);

  return (
    <div className=" border-b-2 border-secondary dark:bg-darkPrimary sticky top-0  z-10 select-none">
      <div className="h-16 bg-primary dark:bg-darkPrimary pb-3 pt-14 font-bold transition-all">
        {/** Navbar without buttons. #Routes: "/" & "/login"  */}
        {navButtons === "none" && (
          <h1
            onClick={() => {
              if (!authorized) {
                redirect("/");
              }
            }}
            className="drop-shadow-slight text-3xl text-white absolute bottom-3 w-full text-center cursor-pointer "
          >
            Applied<strong className="text-black dark:text-primary">To</strong>
          </h1>
        )}
        {/** Navbar with 2 buttons:  ApplicationListBtn / SettingsBtn.  #Routes: "/applications"   */}
        {navButtons === "list" && (
          <div>
            <h1
              onClick={() => {
                if (!authorized) {
                  redirect("/");
                }
              }}
              className="text-2xl text-white absolute bottom-4 left-5 drop-shadow-slight cursor-pointer"
            >
              Applied
              <strong className="text-black dark:text-primary">To</strong>
            </h1>
            <div className="text-3xl absolute bottom-3.5 right-5  flex justify-between w-24 text-black dark:text-lightgrey lg:hidden">
              <IconButton
                icon={<AiOutlineUnorderedList />}
                route={"/applicationList"}
                passedClass={`p-1 ${
                  currentRoute === "/applicationList" &&
                  "bg-secondary dark:bg-darkSecondary  rounded-sm"
                }`}
              />
              <IconButton
                icon={<FiSettings />}
                route={"/settings"}
                passedClass={`p-1 ${
                  currentRoute === "/settings" &&
                  "bg-secondary dark:bg-darkSecondary rounded-sm "
                }`}
              />
            </div>
            <div className="absolute top-5 right-10 hidden lg:flex justify-end gap-10 w-5/12">
              <button
                className={`flex gap-1 dark:text-lightgrey p-1 ${
                  currentRoute === "/applicationList" && "outline rounded "
                }`}
                onClick={() => navigate("/applicationList")}
              >
                <span className="text-2xl">
                  <AiOutlineUnorderedList />
                </span>
                Applications
              </button>
              <button
                className={` gap-1 dark:text-lightgrey p-1 ${
                  currentRoute === "/applicationList" ? "flex" : "hidden"
                }`}
                onClick={() => navigate("/application/new")}
              >
                <span className="text-2xl">
                  <AiOutlineFileAdd />
                </span>
                Create
              </button>
              <button
                className={` gap-1 dark:text-lightgrey p-1 ${
                  currentRoute === "/applicationList" ? "flex" : "hidden"
                }`}
                onClick={() => setSearchMenuOpen(true)}
              >
                <span className="text-2xl">
                  <AiOutlineSearch />
                </span>
                Search
              </button>
              <button
                className={` gap-1 dark:text-lightgrey p-1 ${
                  currentRoute === "/applicationList" ? "flex" : "hidden"
                }`}
                onClick={() => setSortMenuOpen(true)}
              >
                <span className="text-2xl">
                  <BiSortDown />
                </span>
                Sort
              </button>
              <button
                className={`flex gap-1 dark:text-lightgrey p-1 ${
                  currentRoute === "/settings" && "outline rounded "
                }`}
                onClick={() => navigate("/settings")}
              >
                <span className="text-2xl">
                  <FiSettings />
                </span>
                Settings
              </button>
              {sortMenuOpen &&
                ReactDOM.createPortal(
                  <SortMenuModal
                    onSort={(value: string) => setSortByValue(value)}
                    onCancel={() => setSortMenuOpen(false)}
                  />,
                  document.getElementById("root") as Element
                )}
              {searchMenuOpen &&
                ReactDOM.createPortal(
                  <SearchModal
                    onSearch={(value: string) => searchApplication(value)}
                    onCancel={() => setSearchMenuOpen(false)}
                  />,
                  document.getElementById("root") as Element
                )}
            </div>
          </div>
        )}
        {/** Navbar with 1 buttons. #Routes: "/applications/new" && /applications/edit */}
        {navButtons === "application" && (
          <div>
            <h1
              onClick={() => {
                if (!authorized) {
                  redirect("/");
                }
              }}
              className="text-2xl text-white absolute bottom-4 left-5 drop-shadow-slight"
            >
              Applied
              <strong className="text-black dark:text-primary">To</strong>
            </h1>
            <div className="text-3xl absolute bottom-3.5 right-7 flex justify-end w-40 text-white">
              <IconButton
                icon={<BiArrowBack />}
                passedClass={`p-1 ${
                  currentRoute === "/settings" && "bg-secondary rounded-sm "
                }`}
                route={-1}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default Navbar;
