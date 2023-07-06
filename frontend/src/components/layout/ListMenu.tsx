import { AiOutlineFileAdd, AiOutlineSearch } from "react-icons/ai";
import { GiSettingsKnobs } from "react-icons/gi";

function ListMenu() {
  return (
    <div className="sticky h-16 w-full z-50 bg-primary bottom-0 border-t-2 border-secondary">
      <div className="flex flex-row text-white text-4xl w-9/12 mx-auto h-full justify-between">
        <button className="px-5">
          <span className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] ">
            <AiOutlineFileAdd />
          </span>
        </button>
        <button className="px-5">
          <span className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            <AiOutlineSearch />
          </span>
        </button>
        <button className="px-5">
          <span className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            <GiSettingsKnobs />
          </span>
        </button>
      </div>
    </div>
  );
}
export default ListMenu;
