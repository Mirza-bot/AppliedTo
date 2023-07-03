import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const redirect = (location: string) => {
    navigate(location);
  };

  return (
    <div className="-translate-y-20 border-b-2 border-secondary sticky top-0 shadow-[0_10px_30px_0px_rgba(0,0,0,0.3)] z-50 select-none">
      <div className="h-36 bg-primary py-3 font-bold">
        <h1
          onClick={() => {
            redirect("/");
          }}
          className="text-3xl text-white absolute bottom-3 w-full text-center"
        >
          Applied<strong className="text-black">To</strong>
        </h1>
      </div>
    </div>
  );
}
export default Navbar;
