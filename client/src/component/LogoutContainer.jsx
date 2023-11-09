import { FaUserCircle, FaCaretDown } from "react-icons/fa";
import Wrapper from "../assets/wrappers/LogoutContainer";
import { useState } from "react";
import { useDashboardContext } from "../pages/DashboardLayout";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { useNavigate, useNavigation } from "react-router-dom";
const LogoutContainer = () => {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isSubmitted = navigation.state === "submitting";
  const actionLogout = async () => {
    try {
      await customFetch.post("/auth/logout");
      toast.success("Logout");
      return navigate("/");
    } catch (error) {
      return toast.error(error?.response?.data?.msg);
    }
  };

  const { userDemo } = useDashboardContext();
  const [showLogOut, setShowLogOut] = useState(true);
  return (
    <Wrapper>
      <button
        type="button"
        className="btn logout-btn"
        onClick={() => setShowLogOut(!showLogOut)}
      >
        {userDemo.avatar ? (
          <img src={userDemo.avatar} alt="profile" className="img" />
        ) : (
          <FaUserCircle />
        )}
        {userDemo.name}
        <FaCaretDown />
      </button>
      <div className={showLogOut ? "dropdown" : " dropdown show-dropdown"}>
        <button
          type="button"
          className="dropdown-btn"
          onClick={actionLogout}
          disabled={isSubmitted}
        >
          logout
        </button>
      </div>
    </Wrapper>
  );
};
export default LogoutContainer;
