interface ButtonProps {
  click: () => void;
  icon: React.ReactNode;
  active?: boolean;
  addClass?: string;
}

// Buttons left & right in the swipe menu
function ListItemButton(props: ButtonProps) {
  return (
    <button
      onTouchEnd={props.click}
      onClick={props.click}
      className={` w-1/2 overflow-hidden rounded-sm text-4xl text-white flex justify-center ${
        props.addClass
      } items-center ${props.active ? "bg-opacity-70" : ""}`}
    >
      <span className="drop-shadow-slight p-3 lg:hidden">{props.icon}</span>
    </button>
  );
}

export default ListItemButton;
