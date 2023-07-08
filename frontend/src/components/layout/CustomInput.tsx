import { useState } from "react";

interface Props {
  label: string;
  type: string;
  id: string;
  placeholder?: string;
  value?: string;
  event?: (value: string) => void;
  labelClass?: string;
  inputClass?: string;
  textareaClass?: string;
  textarea?: boolean;
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
          className={`text-left ml-0.5 font-semibold ${props.labelClass}`}
        >
          {props.label}
        </label>
      </div>
      {props.textarea ? (
        <textarea
          id={props.id}
          rows={4}
          cols={10}
          className={`bg-white rounded mb-3 border-grey border-4 outline-none focus:border-accent focus:border-4 ${props.textareaClass}`}
        />
      ) : (
        <input
          onChange={handleChange}
          id={props.id}
          type={props.type}
          className={`bg-white rounded text-xl mb-3 border-grey border-4 outline-none focus:border-accent focus:border-4 ${props.inputClass}`}
          placeholder={props.placeholder}
          value={value}
        />
      )}
    </div>
  );
}
export default CustomInput;
