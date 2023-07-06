import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AiOutlineFileSearch, AiOutlineUnorderedList } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";

function Navbar() {
  const navigate = useNavigate();
  const currentRoute = useLocation().pathname;
  const [navButtons, setNavButtons] = useState<string>("none");

  const redirect = (location: string) => {
    navigate(location);
  };

  useEffect(() => {
    if (currentRoute === "/" || currentRoute === "/login") {
      setNavButtons("none");
    } else if (currentRoute === "/applications") {
      setNavButtons("list");
    } else if (
      currentRoute === "/applications/create" ||
      currentRoute === "/applications/edit"
    ) {
      setNavButtons("application");
    }
  }, [currentRoute]);

  return (
    <div className=" border-b-2 border-secondary sticky top-0 shadow-[0_10px_30px_0px_rgba(0,0,0,0.3)] z-50 select-none">
      <div className="h-16 bg-primary py-3 font-bold transition-all">
        {navButtons === "none" && (
          <h1
            onClick={() => {
              redirect("/");
            }}
            className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] text-3xl text-white absolute bottom-3 w-full text-center"
          >
            Applied<strong className="text-black">To</strong>
          </h1>
        )}{" "}
        {navButtons === "list" && (
          <div>
            <h1
              onClick={() => {
                redirect("/");
              }}
              className="text-2xl text-white absolute bottom-4 left-5 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
            >
              Applied<strong className="text-black">To</strong>
            </h1>
            <div className="text-3xl absolute bottom-4 right-5 flex justify-between w-40 text-white">
              <button
                className={`p-1 ${
                  currentRoute === "/joblistings" && "bg-secondary rounded-sm "
                }`}
              >
                <span className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                  <AiOutlineFileSearch />
                </span>
              </button>
              <button
                className={`p-1 ${
                  currentRoute === "/applications" && "bg-secondary rounded-sm "
                }`}
              >
                <span className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                  <AiOutlineUnorderedList />
                </span>
              </button>
              <button
                className={`p-1 ${
                  currentRoute === "/settings" && "bg-secondary rounded-sm "
                }`}
              >
                <span className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                  <FiSettings />
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default Navbar;
