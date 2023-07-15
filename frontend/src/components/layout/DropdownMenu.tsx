import React, { useState } from "react";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import useSettingsStore from "../../../features/store/settings";

interface DropdownMenuProps {
  options: string[];
  icon: React.ReactElement;
  name: string;
  event: (value: string) => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = (
  props: DropdownMenuProps
) => {
  const [isOpen, setIsOpen] = useState(false);

  const getLanguageSet = useSettingsStore((state) => state.language);

  const handleToggle = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  return (
    <div className="dropdown flex flex-col " onClick={handleToggle}>
      <div className="relative px-7 py-5 bg-white dark:bg-darkSecondary dark:text-lightgrey flex font-bold items-center justify-between ">
        <div className="flex w-full ">
          <span className="text-2xl mr-4">{props.icon}</span>
          {props.name}
        </div>
        <span className="text-sm font-light mr-2">{getLanguageSet}</span>
        {isOpen ? <AiFillCaretUp /> : <AiFillCaretDown />}
      </div>

      <div
        className={`${
          isOpen ? "max-h-32 overflow-y-auto " : "max-h-0 overflow-y-hidden"
        } flex flex-col  transition-all ease-in-out duration-300`}
      >
        {props.options.map((option, index) => (
          <button
            key={index}
            onClick={() => props.event(option)}
            className="block border-t-4 border-lightgrey dark:border-darkBg bg-white dark:bg-darkPrimary dark:text-lightgrey w-full  px-4 py-2 "
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DropdownMenu;
