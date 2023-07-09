import { AiOutlineFileAdd, AiOutlineSearch } from "react-icons/ai";
import { GiSettingsKnobs } from "react-icons/gi";
import IconButton from "./IconButton";

function ListMenu() {
  return (
    <div className="sticky h-16 w-full z-10 bg-primary bottom-0 border-t-2 border-secondary">
      <div className="flex flex-row text-white text-4xl w-9/12 mx-auto h-full justify-between">
        <IconButton
          icon={<AiOutlineFileAdd />}
          passedClass="px-5"
          route="/application/new"
        />
        <IconButton icon={<AiOutlineSearch />} passedClass="px-5" />
        <IconButton icon={<GiSettingsKnobs />} passedClass="px-5" />
      </div>
    </div>
  );
}
export default ListMenu;
