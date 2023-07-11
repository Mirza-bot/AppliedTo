import { useState } from "react";
import ReactDOM from "react-dom";
import { AiOutlineFileAdd, AiOutlineSearch } from "react-icons/ai";
import { BiSortDown } from "react-icons/bi";
import IconButton from "./IconButton";
import { useApplicationStore } from "../../../features/store/applications";
import SortMenuModal from "../SortMenuModal";

function ListMenu() {
  const sortApplicationsBy = useApplicationStore(
    (state) => state.setSortByValue
  );
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  return (
    <div className="sticky h-16 w-full z-10 bg-primary bottom-0 border-t-2 border-secondary">
      <div className="flex flex-row text-white text-4xl w-9/12 mx-auto h-full justify-between">
        {sortMenuOpen &&
          ReactDOM.createPortal(
            <SortMenuModal
              onSort={(value: string) => sortApplicationsBy(value)}
              onCancel={() => setSortMenuOpen(false)}
            />,
            document.getElementById("root") as Element
          )}
        <IconButton
          icon={<AiOutlineFileAdd />}
          passedClass="px-5"
          route="/application/new"
        />
        <IconButton icon={<AiOutlineSearch />} passedClass="px-5" />
        <div
          onClick={() => {
            setSortMenuOpen(true);
          }}
        >
          <IconButton icon={<BiSortDown />} passedClass="px-5" />
        </div>
      </div>
    </div>
  );
}
export default ListMenu;
