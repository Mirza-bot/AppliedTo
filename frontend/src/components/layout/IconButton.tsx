import { To, useNavigate } from "react-router-dom";

interface Props {
  icon: React.ReactNode;
  passedClass: string;
  route?: string | number;
}

function IconButton(props: Props) {
  const navigate = useNavigate();

  const redirect = () => {
    if (props.route) {
      navigate(props.route as To);
    } else return;
  };

  return (
    <button
      className={` ${props.passedClass} active:bg-accent active:rounded-sm active:ring-2 ring-secondary transition-all duration-100 ease-out h-full`}
      onClick={redirect}
    >
      <span className="drop-shadow-slight">{props.icon}</span>
    </button>
  );
}
export default IconButton;
