import { useState } from "react";
import ReactDOM from "react-dom";
import { AiOutlineFileAdd, AiOutlineSearch } from "react-icons/ai";
import { BiSortDown } from "react-icons/bi";
import IconButton from "./IconButton";
import { useApplicationStore } from "../../../features/store/applications";
import SortMenuModal from "../SortMenuModal";
import SearchModal from "../SearchModal";

function ListMenu() {
  const sortApplicationsBy = useApplicationStore(
    (state) => state.setSortByValue
  );
  const searchApplication = useApplicationStore(
    (state) => state.searchApplication
  );

  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const [searchMenuOpen, setSearchMenuOpen] = useState(false);
  return (
    <div className=" h-16 w-full sticky bg-primary dark:bg-darkPrimary bottom-0 border-t-2 border-secondary lg:hidden">
      <div className="flex flex-row text-black dark:text-lightgrey text-4xl w-9/12 mx-auto h-full justify-between">
        {sortMenuOpen &&
          ReactDOM.createPortal(
            <SortMenuModal
              onSort={(value: string) => sortApplicationsBy(value)}
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
        <IconButton
          icon={<AiOutlineFileAdd />}
          passedClass="px-5"
          route="/application/new"
        />
        <div onClick={() => setSearchMenuOpen(true)}>
          <IconButton icon={<AiOutlineSearch />} passedClass="px-5" />
        </div>
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
