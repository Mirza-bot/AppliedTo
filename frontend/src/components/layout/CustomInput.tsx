import { useEffect, useState } from "react";

interface Props {
  label: string;
  type: string;
  id: string;
  placeholder?: string;
  value?: string;
  event?: (value: string) => void;
  onEnter?: () => void;
  labelClass?: string;
  inputClass?: string;
  textareaClass?: string;
  textarea?: boolean;
  tabIndex?: number;
}

function CustomInput(props: Props) {
  const [value, setValue] = useState("");

  useEffect(() => {
    if (props.value) {
      setValue(props.value);
    }
  }, [props.value]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue(event.target.value);
    if (props.event) {
      props.event(event.target.value);
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (event.key === "Enter" && props.onEnter) {
      props.onEnter();
    }
  };

  return (
    <div className="flex flex-col w-full gap-1">
      <div className="flex justify-between">
        <label
          htmlFor={props.id}
          className={`text-left dark:text-grey ml-0.5 font-semibold ${props.labelClass}`}
        >
          {props.label}
        </label>
      </div>
      {props.textarea ? (
        <textarea
          onChange={handleChange}
          id={props.id}
          rows={6}
          cols={10}
          value={value}
          onKeyDown={handleKeyDown}
          tabIndex={props.tabIndex}
          className={`bg-white dark:bg-darkSecondary dark:border-darkAccent dark:focus:border-accent dark:focus:border-4  rounded mb-3 border-grey border-4 outline-none focus:border-accent focus:border-4 ${props.textareaClass}`}
        />
      ) : (
        <input
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          id={props.id}
          type={props.type}
          className={`bg-white dark:bg-darkSecondary dark:border-darkAccent dark:focus:border-accent dark:focus:border-4  rounded text-xl mb-3 border-grey border-4 outline-none focus:border-accent focus:border-4 ${props.inputClass}`}
          placeholder={props.placeholder}
          tabIndex={props.tabIndex}
          value={value}
        />
      )}
    </div>
  );
}
export default CustomInput;
