import { useState } from "react";

interface Props {
  label: string;
  type: string;
  id: string;
  placeholder?: string;
  value?: string;
  event?: (value: string) => void;
  labelColor?: string;
  textColor?: string;
}

function CustomInput(props: Props) {
  const [value, setValue] = useState(props.value || "");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    if (props.event) {
      props.event(event.target.value);
    }
  };

  return (
    <div className="flex flex-col w-full gap-1">
      <div className="flex justify-between">
        <label
          htmlFor={props.id}
          className={`text-left font-semibold ${props.labelColor}`}
        >
          {props.label}
        </label>
      </div>
      <input
        onChange={handleChange}
        id={props.id}
        type={props.type}
        className="bg-white rounded text-xl mb-3"
        placeholder={props.placeholder}
        value={value}
      />
    </div>
  );
}
export default CustomInput;
