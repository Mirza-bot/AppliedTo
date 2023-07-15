import { LiaGreaterThanSolid } from "react-icons/lia";

interface Props {
  icon: React.ReactElement;
  name: string;
}

function SettingsTile(props: Props) {
  return (
    <div className="px-6 py-5 bg-white dark:bg-darkSecondary dark:text-lightgrey  flex font-bold items-center justify-between">
      <div className="flex w-full">
        <span className="text-2xl mr-4">{props.icon}</span>
        {props.name}
      </div>
      <LiaGreaterThanSolid />
    </div>
  );
}
export default SettingsTile;
