import { useEffect } from "react";
import { useAuthStore } from "../../features/store/auth";
import ApplicationListItem from "../components/layout/ApplicationListItem";
import { useNavigate } from "react-router-dom";
import ListMenu from "../components/layout/ListMenu";

function ApplicationList() {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  });
  return (
    <div>
      <div className="flex flex-col gap-1 overflow-hidden">
        <ApplicationListItem />
        <ApplicationListItem />
        <ApplicationListItem />
        <ApplicationListItem />
        <ApplicationListItem />
        <ApplicationListItem />
        <ApplicationListItem />
        <ApplicationListItem />
      </div>
      <ListMenu />
    </div>
  );
}
export default ApplicationList;
