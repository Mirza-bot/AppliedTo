import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AiOutlineFileSearch, AiOutlineUnorderedList } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import { BiArrowBack } from "react-icons/bi";
import IconButton from "./IconButton";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentRoute = location.pathname;
  const [navButtons, setNavButtons] = useState<string>("none");

  const redirect = (location: string) => {
    navigate(location);
  };

  useEffect(() => {
    if (currentRoute === "/applicationList") {
      setNavButtons("list");
    } else if (
      currentRoute === "/applications/new" ||
      currentRoute === "/applications/edit"
    ) {
      setNavButtons("application");
    } else {
      setNavButtons("none");
    }
  }, [currentRoute]);

  return (
    <div className=" border-b-2 border-secondary sticky top-0 shadow-[0_10px_30px_0px_rgba(0,0,0,0.3)] z-10 select-none">
      <div className="h-16 bg-primary pb-3 pt-14 font-bold transition-all">
        {/** Navbar without buttons. #Routes: "/" & "/login"  */}
        {navButtons === "none" && (
          <h1
            onClick={() => {
              redirect("/");
            }}
            className="drop-shadow-slight text-3xl text-white absolute bottom-3 w-full text-center"
          >
            Applied<strong className="text-black">To</strong>
          </h1>
        )}
        {/** Navbar without 3 buttons: SearchJobBtn / ApplicationListBtn / SettingsBtn.  #Routes: "/applications"   */}
        {navButtons === "list" && (
          <div>
            <h1
              onClick={() => {
                redirect("/");
              }}
              className="text-2xl text-white absolute bottom-4 left-5 drop-shadow-slight"
            >
              Applied<strong className="text-black">To</strong>
            </h1>
            <div className="text-3xl absolute bottom-3.5 right-5 flex justify-between w-40 text-white">
              <IconButton
                icon={<AiOutlineFileSearch />}
                passedClass={`p-1 ${
                  currentRoute === "/joblistings" && "bg-secondary rounded-sm "
                }`}
              />

              <IconButton
                icon={<AiOutlineUnorderedList />}
                passedClass={`p-1 ${
                  currentRoute === "/applicationList" &&
                  "bg-secondary rounded-sm "
                }`}
              />
              <IconButton
                icon={<FiSettings />}
                passedClass={`p-1 ${
                  currentRoute === "/settings" && "bg-secondary rounded-sm "
                }`}
              />
            </div>
          </div>
        )}
        {/** Navbar without 1 buttons. #Routes: "/applications/new" && /applications/edit */}
        {navButtons === "application" && (
          <div>
            <h1
              onClick={() => {
                redirect("/");
              }}
              className="text-2xl text-white absolute bottom-4 left-5 drop-shadow-slight"
            >
              Applied<strong className="text-black">To</strong>
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
